import React from "react";
import { CSSTransition } from "react-transition-group";
import "./fadedown.css";

function Fadedown({ children }) {
  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fadeDown"
      >
        {children}
      </CSSTransition>
    </>
  );
}

export default Fadedown;
