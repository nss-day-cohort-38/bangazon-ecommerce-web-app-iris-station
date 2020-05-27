import React, { useState } from "react";
import { Button, Table, Paper } from "../../../components";
const ButtonsView = () => {
  const [showProps, setShowProps] = useState(false);

  return (
    <>
      <Button handleClick={() => setShowProps(!showProps)}>
        {showProps ? "See Component" : "See Props"}
      </Button>
      {showProps ? (
        <Table
          tableData={[
            ["Name", "Default", "Type", "Description"],
            ["color", "", "string", "A button can have different colors"],
            [
              "handleClick",
              "",
              "function",
              "Function to run on click of the button",
            ],
            [
              "content",
              "Button Text",
              "string",
              "Shorthand for primary content.",
            ],
            ["circular", "false", "boolean", "A button can be circular."],
            [
              "loading",
              "false",
              "boolean",
              "A button can show a loading indicator.",
            ],
            [
              "disabled",
              "false",
              "boolean",
              "A button can show it is currently unable to be interacted with.",
            ],
            ["icon", "", "string", "Add an Icon by name"],
            ["children", "", "", "Primary content."],
          ]}
        />
      ) : (
        <>
          <h1>Normal</h1>
          <h3>This is a normal button with nothing passed down to it</h3>
          <Paper>This is some text</Paper>
        </>
      )}
    </>
  );
};

export default ButtonsView;
