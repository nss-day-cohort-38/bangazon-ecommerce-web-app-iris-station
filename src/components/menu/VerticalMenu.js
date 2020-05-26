import React, { useState } from "react";
import {  Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function VerticalMenu({ menuData = defaultData }) {
  const [activeItem, setActiveItem] = useState("inbox");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary vertical>
      {menuData.map((item) => {
        let lowercase = item.title.split(" ").join("").toLowerCase();
        return (
          <Link to={item.route}>
            <Menu.Item
              name={lowercase}
              active={activeItem === lowercase}
              onClick={handleItemClick}
            >
              {item.title}
            </Menu.Item>
          </Link>
        );
      })}
    </Menu>
  );
}

const defaultData = [{ title: "name", route: "item" }];
