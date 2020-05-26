import React, { useState, useEffect } from "react";
import { NavbarView, ButtonsView, FormsView } from "./Pages";
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
        ]}
      />
      {pageView == "navbar" && <NavbarView />}
      {pageView == "buttons" && <ButtonsView />}
      {pageView == "forms" && <FormsView />}
    </>
  );
};

export default DLHOME;
