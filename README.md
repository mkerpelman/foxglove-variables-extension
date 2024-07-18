# Variable Lock Extension

This extension allows Foxglove layout maintainers to "lock" the state of one or more Foxglove [variables](https://docs.foxglove.dev/docs/visualization/variables/). While variables may still be edited in the Foxglove visualization UI, this extension makes it impossible to permanently overwrite a locked variable's values. In practice, the extension will ensure that the desired value for each locked variable is loaded into the layout, even if a user has changed its value in the UI and saved layout changes.

## How to Use This Extension
The entry point to this extension is the `ExamplePanel.tsx` file, starting on line 13 (`START OF LOCKED VARIABLES DEFINITION`). The layout maintainer should set as many variables as needed in this file, using [setVariable](https://docs.foxglove.dev/docs/visualization/extensions/api/panel#setvariable).

NOTE: This extension produces a non-interactive panel that *must* be added to a layout in order to take effect. To save space, we recommend displaying it in a tab such that it doesn't take up space in the main visualization.

Locked variables will show up in the Variables tab of the left sidebar, and will appear as regular variables. As mentioned above, these locked variables are editable during the visualization session, but Save action on the layout will not overwrite their values. The saved layout will simply load with the values defined in the extension code.

## Extension Basics

[Foxglove](https://foxglove.dev) allows developers to create [extensions](https://docs.foxglove.dev/docs/visualization/extensions/introduction), or custom code that is loaded and executed inside the Foxglove application. This can be used to add custom panels. Extensions are authored in TypeScript using the `@foxglove/extension` SDK.

## Develop

Extension development uses the `npm` package manager to install development dependencies and run build scripts.

To install extension dependencies, run `npm` from the root of the extension package.

```sh
npm install
```

To build and install the extension into your local Foxglove desktop app, run:

```sh
npm run local-install
```

Open the Foxglove desktop (or `ctrl-R` to refresh if it is already open). Your extension is installed and available within the app.

## Package

Extensions are packaged into `.foxe` files. These files contain the metadata (package.json) and the build code for the extension.

Before packaging, make sure to set `name`, `publisher`, `version`, and `description` fields in _package.json_. When ready to distribute the extension, run:

```sh
npm run package
```

This command will package the extension into a `.foxe` file in the local directory.

## Publish

You can publish the extension to the public registry or privately for your organization.

See documentation here: https://docs.foxglove.dev/docs/visualization/extensions/publish/#packaging-your-extension
