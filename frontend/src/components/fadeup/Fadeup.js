import React from "react";
import { CSSTransition } from "react-transition-group";
import "./fadeup.css";

function Fadeup({ children }) {
  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={2000}
        classNames="fade-up"
      >
        {children}
      </CSSTransition>
    </>
  );
}

export default Fadeup;
