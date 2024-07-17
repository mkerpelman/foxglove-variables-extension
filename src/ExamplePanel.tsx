import { PanelExtensionContext } from "@foxglove/extension";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";


function ExamplePanel({ context }: { context: PanelExtensionContext }): JSX.Element {
  const [variableValues, setVariableValues] = useState<any>({});

  const [renderDone, setRenderDone] = useState<(() => void) | undefined>();

  useLayoutEffect(() => {

    context.setVariable("myVar", 55);

    context.onRender = (renderState, done) => {
      setRenderDone(() => done);

      setVariableValues(renderState.variables);

    };

  }, [context]);

  // invoke the done callback once the render is complete
  useEffect(() => {
    renderDone?.();
  }, [renderDone]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Fixed Variables</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "0.2rem" }}>
        <b style={{ borderBottom: "1px solid" }}>Variable</b>
        <b style={{ borderBottom: "1px solid" }}>Value</b>
        {Object.entries(variableValues).map(([key, value]) => (
          <React.Fragment key={key}>
            <div>{key}</div>
            <div>{JSON.stringify(value)}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function initExamplePanel(context: PanelExtensionContext): () => void {
  ReactDOM.render(<ExamplePanel context={context} />, context.panelElement);

  // Return a function to run when the panel is removed
  return () => {
    ReactDOM.unmountComponentAtNode(context.panelElement);
  };
}
