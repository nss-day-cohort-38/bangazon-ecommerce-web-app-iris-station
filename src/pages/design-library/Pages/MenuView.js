import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, VerticalMenu, Drawer } from "../../../components";
const MenuView = () => {
  const [showProps, setShowProps] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };
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
          <hr />
          <h1>Drawer Menu</h1>
          <Link onClick={() => toggleMenu()}>Click me to See Example</Link>
          <pre>{`
                <Link onClick={() => toggleMenu()}>Click me to See Example</Link>
              `}</pre>
          <Drawer
            position="left"
            isOpen={drawerOpen}
            close={() => toggleMenu()}
            drawerInfo={[
              <div>
                <Link to="#">Category Name</Link>
                <p>Item</p>
                <p>Item</p>
                <p>Item</p>
              </div>,
              <div>
                Category Name
                <p>Item</p>
                <p>Item</p>
                <p>Item</p>
              </div>,
            ]}
          />
          <p>
            This component taakes in:
            <br />
            - position (top, bottom, left, right)
            <br />
            - isOpen which controls whether or not the drawer is open [true,
            false].
            <br />- a close method to handle when drawer is closed
            <pre>
              {`
                const toggleMenu = () => {
                  setDrawerOpen(!drawerOpen);
                };
              `}
            </pre>
            <br />- an array that will be mapped over to create the items in
            drawer.
          </p>
          <pre>
            {`
              <Drawer
                position="left"
                isOpen={drawerOpen}
                close={() => toggleMenu()}
                drawerInfo={[
                  <div>
                    <Link to="#">Category Name</Link>
                    <p>Item</p>
                    <p>Item</p>
                    <p>Item</p>
                  </div>,
                  <div>
                    Category Name
                    <p>Item</p>
                    <p>Item</p>
                    <p>Item</p>
                  </div>,
                ]}
              />
          `}
          </pre>
        </>
      )}
    </>
  );
};

export default MenuView;
