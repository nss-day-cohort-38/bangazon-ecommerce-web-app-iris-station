import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function VerticalMenu({ menuData = defaultData, firstActive }) {
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(firstActive);
  }, [firstActive]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary vertical>
      {menuData.map((item) => {
        let routesplit = item.route.split("/");
        let lowercase = routesplit[2].toLowerCase();

        return (
          <Link key={item.route} to={item.route}>
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
