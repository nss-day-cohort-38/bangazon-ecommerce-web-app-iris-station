import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

export default function VerticalMenu({ menuData = defaultData, firstActive }) {
  let history = useHistory();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(firstActive);
  }, [firstActive]);

  const handleItemClick = (name, route) => {
    history.push(route);
    
    setActiveItem(name);
  };

  return (
    <Menu pointing secondary vertical>
      {menuData.map((item) => {
        let routesplit = item.route.split("/");
        let lowercase = routesplit[2].toLowerCase();

        return (
          <Menu.Item
            key={item.route}
            name={lowercase}
            active={activeItem === lowercase}
            onClick={(e) => handleItemClick(lowercase, item.route)}
          >
            {item.title}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

const defaultData = [{ title: "name", route: "item" }];
