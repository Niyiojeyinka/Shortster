import * as React from "react";

function Button(props) {
  const shortenBtn = (
    <button
      onClick={props.handleShorten}
      className="btn p-2 mx-3 bg-color-main"
      style={{ height: "50px", color: "white" }}
    >
      Shorten
    </button>
  );
  const copyBtn = (
    <button
      onClick={props.handleCopy}
      className="btn p-2 mx-3 bg-color-main"
      style={{ height: "50px" }}
    >
      Copy
    </button>
  );
  const btn = props.type ? copyBtn : shortenBtn;

  return <>{btn}</>;
}
export default Button;
