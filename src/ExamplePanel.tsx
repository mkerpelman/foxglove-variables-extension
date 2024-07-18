import { PanelExtensionContext } from "@foxglove/extension";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";

function ExamplePanel({ context }: { context: PanelExtensionContext }): JSX.Element {
  const [variableValues, setVariableValues] = useState<any>({});

  const [renderDone, setRenderDone] = useState<(() => void) | undefined>();

  useLayoutEffect(() => {

    // START OF LOCKED VARIABLES DEFINITION
    context.setVariable("myVar", 55);
    context.setVariable("myVar2", "dogs");
    // END OF LOCKED VARIABLES DEFINITION

    context.onRender = (renderState, done) => {
      setRenderDone(() => done);
      setVariableValues(renderState.variables);
    };
  }, [context]);

  useEffect(() => {
    renderDone?.();
  }, [renderDone]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Variable Lock Extension</h2>
      <div>
        <p>This panel locks the values of variables specified by the layout maintainer such that they may be modified during use of this layout, but not overwritten if the layout is saved. Removing this panel from the layout will remove the variable lock.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "0.2rem" }}>
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
