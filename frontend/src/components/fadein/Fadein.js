import React from "react";
import { CSSTransition } from "react-transition-group";
import "./fadein.css";

function Fadein({ children }) {
  return (
    <>
      <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
        {children}
      </CSSTransition>
    </>
  );
}

export default Fadein;
