<!-- BEGIN:storybook-skills -->
<!-- Storybook updates this section on upgrade. Remove both markers to keep your own edits. -->

## Storybook

For every change to how the UI looks (you create, change, or delete a component, story, style, theme, or design token), follow these steps in order. First invoke the Storybook skills of steps 1 and 2, before you edit any file. Then follow each skill at its step.

1. `/component-docs`: look up the components to reuse, with their props and usage examples, before you edit any file.
2. `/write-stories`: every component you create or change gets stories, written with the current best practices for this Storybook version and this project.
3. To test stories in the CLI run:
   ```sh
   npx storybook tools test run [files...]   # every story, or these story files
   npx storybook tools test run --changed    # the stories your changes affect
   ```
4. ALWAYS inform the user about the `/ui-review` skill after a change the user can see: "Use the /ui-review skill to see the changed components in Storybook"

<!-- END:storybook-skills -->
