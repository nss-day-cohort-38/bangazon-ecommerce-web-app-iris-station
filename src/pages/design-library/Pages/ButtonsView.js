import React, { useState } from "react";
import { Button, Table } from "../../../components";
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
            ["handleClick", "", "function", "Function to run on click of the button"],
            ["content", "Button Text", "string", "Shorthand for primary content."],
            ["circular", "false", "boolean", "A button can be circular."],
            ["loading", "false", "boolean", "A button can show a loading indicator."],
            ["disabled", "false", "boolean", "A button can show it is currently unable to be interacted with."],
            ["icon", "", "string", "Add an Icon by name"],
            ["children", "", "", "Primary content."],
          ]}
        />
      ) : (
        <>
          <h1>Normal</h1>
          <h3>This is a normal button with nothing passed down to it</h3>
          <Button />
          <pre>
            {`
            <Button />
            `}
          </pre>
          <hr />

          <h1>Chidren</h1>
          <h3>
            This is a button with the primary content pased down as children
            prop
          </h3>
          <Button>Button with Children</Button>
          <pre>
            {`
            <Button>Button with Children</Button>
            `}
          </pre>
          <hr />
          <h1>Content</h1>
          <h3>Passing down primary content as a prop</h3>
          <Button content="This is text" />
          <pre>
            {`
            <Button content="This is text" />
            `}
          </pre>
          <hr />
          <h1>Colors</h1>
          <h3>Buttons can have different colors</h3>
          <Button color="blue" />
          <Button color="red" />
          <Button color="orange" />
          <Button color="yellow" />
          <Button color="olive" />
          <Button color="green" />
          <Button color="teal" />
          <Button color="blue" />
          <Button color="violet" />
          <Button color="purple" />
          <Button color="pink" />
          <Button color="brown" />
          <Button color="grey" />
          <Button color="black" />
          <Button color="facebook" />
          <Button color=" google plus" />
          <Button color="instagram" />
          <Button color="linkedin" />
          <Button color="twitter" />
          <Button color="vk" />
          <Button color="youtube" />

          <pre>
            {`
             <Button color="blue" />
             <Button color="red" />
             <Button color="orange" />
             <Button color="yellow" />
             <Button color="olive" />
             <Button color="green" />
             <Button color="teal" />
             <Button color="blue" />
             <Button color="violet" />
             <Button color="purple" />
             <Button color="pink" />
             <Button color="brown" />
             <Button color="grey" />
             <Button color="black" />
             <Button color="facebook" />
             <Button color=" google plus" />
             <Button color="instagram" />
             <Button color="linkedin" />
             <Button color="twitter" />
             <Button color="vk" />
             <Button color="youtube" />
            `}
          </pre>
          <hr />
          <h1>Circular</h1>
          <h3>A button can be circular</h3>
          <Button circular={true} />
          <pre>
            {`
            <Button circular={true} />
            `}
          </pre>
          <hr />
          <h1>Loading</h1>
          <h3>A button have a loading state</h3>
          <Button loading={true} />
          <pre>
            {`
            <Button loading={true} />
            `}
          </pre>
          <hr />
          <h1>Disabled</h1>
          <h3>A button can be disabled</h3>
          <Button disabled={true} />
          <pre>
            {`
            <Button disabled={true} />
            `}
          </pre>
          <hr />
          <h1>Icon</h1>
          <h3>
            This takes in a string that corrosponds with a{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://react.semantic-ui.com/elements/icon/"
            >
              Semantic UI Icon
            </a>{" "}
            name
          </h3>
          <Button icon="sign language" />
          <pre>
            {`
            <Button icon="sign language" />
            `}
          </pre>
        </>
      )}
    </>
  );
};

export default ButtonsView;
