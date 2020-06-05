import React, { useState, useEffect } from "react";
import {
  NavbarView,
  ButtonsView,
  FormsView,
  PaperView,
  MenuView,
} from "./Pages";
import { Navbar } from "../../components";

const DLHOME = ({ match, userInfo, hasUser }) => {
  const [pageView, setPageView] = useState("");

  useEffect(() => {
    setPageView(match.params.component_name);
  }, [match]);
  return (
    <>
      <Navbar
        userInfo={userInfo}
        hasUser={hasUser}
        navArray={[
          { title: "Buttons", route: "/dl/buttons" },
          { title: "Cards", route: "/dl/cards" },
          { title: "Expansions", route: "/dl/exasions" },
          { title: "Forms", route: "/dl/forms" },
          { title: "Menus", route: "/dl/menus" },
          {
            title: "Navbar",
            route: "/dl/navbar",
          },

          { title: "Papers", route: "/dl/papers" },
          { title: "Tables", route: "/dl/tables" },
        ]}
      />
      {pageView === "buttons" && <ButtonsView />}
      {pageView === "cards" && <ButtonsView />}
      {pageView === "expansions" && <ButtonsView />}
      {pageView === "forms" && <FormsView />}
      {pageView === "menus" && <MenuView />}
      {pageView === "navbar" && <NavbarView />}
      {pageView === "papers" && <PaperView />}
      {pageView === "tables" && <PaperView />}
    </>
  );
};

export default DLHOME;
