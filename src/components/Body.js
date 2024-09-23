import React, { useState } from "react";

const Body = (props) => {
  const [text, setText] = useState("");

  const upCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase!!", "success");
  };

  const lwCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase!!", "success");
  };

  const clearText = () => {
    setText("");
    props.showAlert("Text Cleared!!", "success");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied!!", "success");
  };

  const extraSpace = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Extra Space removed!!", "success");
  };

  const change = (event) => {
    setText(event.target.value);
  };

  // Base64 Encoding
  const encodeBase64 = () => {
    const encoded = btoa(text);
    setText(encoded);
    props.showAlert("Text Encoded to Base64!", "success");
  };

  // Base64 Decoding
  const decodeBase64 = () => {
    try {
      const decoded = atob(text);
      setText(decoded);
      props.showAlert("Text Decoded from Base64!", "success");
    } catch (e) {
      props.showAlert("Invalid Base64 string!", "danger");
    }
  };

  return (
    <>
      <div
        className="container my-4"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h3>
          Text Analyzer - Word counter, Character counter, Remove extra spaces, Encode & Decode Base64
        </h3>
        <textarea
          value={text}
          onChange={change}
          style={{
            backgroundColor: props.mode === "dark" ? "rgb(211,211,211)" : "white",
            color: props.mode === "dark" ? "black" : "black",
            border: "1px solid black",
            width: "80%",
          }}
          rows="5"
          cols="100"
          id="myBox"
        ></textarea>
        <br />
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-3 my-2"
          onClick={upCase}
        >
          Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary my-2"
          onClick={lwCase}
        >
          Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-3 my-2"
          onClick={clearText}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary my-2"
          onClick={copyText}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-3 my-2"
          onClick={extraSpace}
        >
          Remove Extra Space
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary my-2"
          onClick={encodeBase64}
        >
          Encode to Base64
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-3 my-2"
          onClick={decodeBase64}
        >
          Decode from Base64
        </button>
      </div>

      <div
        className="container my-1"
        style={{
          backgroundColor: props.mode === "dark" ? "grey" : "white",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h4>Your text summary</h4>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          Words And {text.length} Characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes to Read
        </p>
        <p>{text.split(".").length - 1} Number of Sentences</p>
        <h4>Preview Text</h4>
        <p>{text.length > 0 ? text : "Nothing to preview here"}</p>
      </div>
    </>
  );
};

export default Body;
