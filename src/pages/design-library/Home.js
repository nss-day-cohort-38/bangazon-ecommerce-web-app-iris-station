import React, { useState, useEffect } from "react";
import { NavbarView, ButtonsView, FormsView, PaperView, MenuView } from "./Pages";
import { Navbar } from "../../components";

const DLHOME = ({ match }) => {
  const [pageView, setPageView] = useState("");

  useEffect(() => {
    setPageView(match.params.component_name);
  }, [match]);
  return (
    <>
      <Navbar
        navArray={[
          {
            title: "Navbar",
          },
          { title: "Buttons" },
          { title: "Forms" },
          { title: "Papers" },
          { title: "Menues" },
        ]}
      />
      {pageView == "navbar" && <NavbarView />}
      {pageView == "menues" && <MenuView />}
      {pageView == "buttons" && <ButtonsView />}
      {pageView == "forms" && <FormsView />}
      {pageView == "papers" && <PaperView />}
    </>
  );
};

export default DLHOME;
