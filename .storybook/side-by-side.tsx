import React from 'react'
import styled from 'styled-components'

/**
 * Side-by-side theme mode: renders the story twice, in two same-origin
 * iframes — one per theme. Each pane is a full, isolated preview with its own
 * document, so portals (`#modal`), fixed-position overlays, and body scroll
 * all stay inside their half instead of escaping to the shared page. The
 * panes are kept in sync by mirroring scroll and interaction events between
 * the two documents.
 *
 * Known limits: hover states don't replicate (CSS :hover cannot be
 * synthesized); replayed keystrokes don't run browser default actions
 * (Enter-to-submit only syncs when triggered via a button click); an
 * interaction only mirrors when both panes render the same tree — a pane
 * whose structure has drifted skips the event rather than guessing. Play
 * functions run inside each pane (driving both to the same state), but the
 * outer shell no longer contains the story DOM, so on stories with a play
 * function the interactions panel reports a failed run while in this mode.
 */

const paneSrc = (storyId: string, theme: 'light' | 'dark') =>
  `iframe.html?${new URLSearchParams({ id: storyId, viewMode: 'story', globals: `theme:${theme}` })}`

const Pane = styled.iframe<{ $left?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => ($left ? 0 : '50vw')};
  width: 50vw;
  height: 100vh;
  border: 0;
  box-sizing: border-box;
  border-right: ${({ $left }) => ($left ? '1px solid #202020' : 'none')};
`

// Elements are matched across panes by their child-index path from the
// document root: both panes render the same story with the same data, so
// their trees line up — including portals, which append to the body in the
// same order on both sides.
const indexPath = (element: Element): number[] => {
  const path: number[] = []
  let current = element
  while (current.parentElement) {
    path.unshift(Array.prototype.indexOf.call(current.parentElement.children, current))
    current = current.parentElement
  }
  return path
}

const elementAt = (doc: Document, path: number[]): Element | undefined => {
  let current: Element | undefined = doc.documentElement
  for (const index of path) {
    current = current?.children[index]
  }
  return current
}

// React controlled inputs ignore direct `.value =` writes (the framework's
// own setter tracks the last rendered value), so the copy goes through the
// native prototype setter before the mirrored event is dispatched.
const copyFieldState = (source: Element, twin: Element) => {
  const prototype = Object.getPrototypeOf(twin)
  for (const property of ['value', 'checked'] as const) {
    if (property in source) {
      const setter = Object.getOwnPropertyDescriptor(prototype, property)?.set
      setter?.call(twin, (source as HTMLInputElement)[property])
    }
  }
}

// Instanceof checks don't work on the panes' nodes: each iframe has its own
// realm, so its elements are not instances of this window's Element.
const isElement = (node: unknown): node is Element =>
  !!node && (node as Node).nodeType === Node.ELEMENT_NODE

// Pointer events are mirrored alongside click because some components (e.g.
// Base UI's number field behind QuantityStepper) act on the pointer sequence
// and ignore a bare synthetic click.
const MIRRORED_EVENTS = [
  'pointerdown',
  'pointerup',
  'click',
  'input',
  'change',
  'keydown',
  'scroll',
] as const

export const connectPanes = (a: Document, b: Document): (() => void) => {
  const forward = (from: Document, to: Document) => {
    const handle = (event: Event) => {
      // Replayed events are synthetic (untrusted); only real user input
      // mirrors, so a replay can never echo back and forth.
      if (!event.isTrusted) {
        return
      }

      if (event.type === 'scroll') {
        // Programmatic scrolling fires its own trusted scroll events, so the
        // mirror only writes when the twin is out of sync — the echo arrives
        // already in position and the loop dies on its own.
        if (event.target === from || event.target === from.documentElement) {
          const { scrollX = 0, scrollY = 0 } = from.defaultView ?? {}
          const toWindow = to.defaultView
          if (toWindow && (toWindow.scrollX !== scrollX || toWindow.scrollY !== scrollY)) {
            toWindow.scrollTo(scrollX, scrollY)
          }
        } else if (isElement(event.target)) {
          const twin = elementAt(to, indexPath(event.target))
          const { scrollTop, scrollLeft } = event.target
          if (twin && (twin.scrollTop !== scrollTop || twin.scrollLeft !== scrollLeft)) {
            twin.scrollTop = scrollTop
            twin.scrollLeft = scrollLeft
          }
        }
        return
      }

      if (!isElement(event.target)) {
        return
      }
      const twin = elementAt(to, indexPath(event.target))
      const toWindow = to.defaultView
      if (!twin || !toWindow) {
        return
      }

      switch (event.type) {
        case 'click': {
          if (typeof (twin as HTMLElement).click === 'function') {
            // Runs default actions too (form submit, link navigation).
            ;(twin as HTMLElement).click()
          } else {
            // SVG elements (icon shapes catching the click) have no click();
            // a bubbling synthetic click still reaches the handlers above.
            const { clientX, clientY, button } = event as MouseEvent
            twin.dispatchEvent(
              new toWindow.MouseEvent('click', {
                clientX,
                clientY,
                button,
                bubbles: true,
                cancelable: true,
              })
            )
          }
          break
        }
        case 'pointerdown':
        case 'pointerup': {
          const { clientX, clientY, button, buttons, pointerType } = event as PointerEvent
          twin.dispatchEvent(
            new toWindow.PointerEvent(event.type, {
              clientX,
              clientY,
              button,
              buttons,
              pointerType,
              pointerId: 1,
              isPrimary: true,
              bubbles: true,
              cancelable: true,
            })
          )
          break
        }
        case 'keydown': {
          const { key, code, shiftKey, ctrlKey, altKey, metaKey } = event as KeyboardEvent
          twin.dispatchEvent(
            new toWindow.KeyboardEvent('keydown', {
              key,
              code,
              shiftKey,
              ctrlKey,
              altKey,
              metaKey,
              bubbles: true,
              cancelable: true,
            })
          )
          break
        }
        default: {
          copyFieldState(event.target, twin)
          twin.dispatchEvent(new toWindow.Event(event.type, { bubbles: true }))
        }
      }
    }

    for (const type of MIRRORED_EVENTS) {
      from.addEventListener(type, handle, { capture: true, passive: true })
    }
    return () => {
      for (const type of MIRRORED_EVENTS) {
        from.removeEventListener(type, handle, { capture: true })
      }
    }
  }

  const disconnects = [forward(a, b), forward(b, a)]
  return () => {
    for (const disconnect of disconnects) {
      disconnect()
    }
  }
}

export const SideBySide = ({ storyId }: { storyId: string }) => {
  const leftRef = React.useRef<HTMLIFrameElement>(null)
  const rightRef = React.useRef<HTMLIFrameElement>(null)
  // Counts every pane load, including reloads after a story switch, so the
  // effect below always reconnects to the panes' current documents.
  const [loadCount, setLoadCount] = React.useState(0)
  const onPaneLoad = () => setLoadCount((count) => count + 1)

  React.useEffect(() => {
    const left = leftRef.current?.contentDocument
    const right = rightRef.current?.contentDocument
    if (loadCount < 2 || !left || !right) {
      return
    }
    return connectPanes(left, right)
  }, [loadCount])

  return (
    <>
      <Pane
        ref={leftRef}
        $left
        title="story in light theme"
        src={paneSrc(storyId, 'light')}
        onLoad={onPaneLoad}
      />
      <Pane
        ref={rightRef}
        title="story in dark theme"
        src={paneSrc(storyId, 'dark')}
        onLoad={onPaneLoad}
      />
    </>
  )
}
