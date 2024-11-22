import React, { useState } from "react";

const Body = (props) => {
  const [text, setText] = useState("");
  const [bookmarkedTexts, setBookmarkedTexts] = useState([]);

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

  const encodeBase64 = () => {
    const base64Encoded = btoa(unescape(encodeURIComponent(text)));
    setText(base64Encoded);
    props.showAlert("Text Encoded to Base64!", "success");
  };

  const decodeBase64 = () => {
    try {
      const base64Decoded = atob(text);
      const emojiDecodedText = decodeURIComponent(escape(base64Decoded));
      setText(emojiDecodedText);
      props.showAlert("Text Decoded from Base64!", "success");
    } catch (e) {
      props.showAlert("Invalid Base64 string!", "danger");
    }
  };

  const addBookmark = () => {
    if (text.trim()) {
      setBookmarkedTexts((prev) => [...prev, text]);
      props.showAlert("Text Bookmarked!", "success");
    }
  };

  const handleBookmarkClick = (bookmark) => {
    setText(bookmark);
  };

  const deleteBookmark = (index) => {
    const newBookmarks = bookmarkedTexts.filter((_, i) => i !== index);
    setBookmarkedTexts(newBookmarks);
    props.showAlert("Bookmark Deleted!", "success");
  };

  // Find the longest words in the text
  const findLongestWords = (text) => {
    const words = text.split(/\s+/).filter(Boolean); // Split text into words and filter out empty strings
    const maxLength = Math.max(...words.map((word) => word.length)); // Find the maximum length
    return words.filter((word) => word.length === maxLength); // Return all words with the max length
  };

  // Calculate the number of sentences in the text
  const countSentences = (text) => {
    const sentences = text
      .split(/[.!?]/) // Split the text at '.', '!', or '?'
      .filter((sentence) => sentence.trim().length > 0); // Filter out empty sentences
    return sentences.length;
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
        <button
          disabled={text.length === 0}
          className="btn btn-primary my-2"
          onClick={addBookmark}
        >
          Bookmark Text
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
          Longest Word(s):{" "}
          {text.length > 0 ? findLongestWords(text).join(", ") : "N/A"} (
          {text.length > 0 ? findLongestWords(text)[0].length : 0} characters)
        </p>
        <p>
          Number of Sentences: {text.length > 0 ? countSentences(text) : 0}
        </p>
      </div>

      {bookmarkedTexts.length > 0 && (
        <div
          className="container my-1"
          style={{
            backgroundColor: props.mode === "dark" ? "grey" : "white",
            color: props.mode === "dark" ? "white" : "black",
            width: "200px",
            position: "fixed",
            right: "10px",
            top: "10px",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "10px",
            overflowY: "scroll",
            maxHeight: "300px",
          }}
        >
          <h4>Bookmarked Texts</h4>
          <ul>
            {bookmarkedTexts.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <span
                  onClick={() => handleBookmarkClick(item)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {item.length > 20 ? `${item.slice(0, 20)}...` : item}
                </span>
                <button
                  onClick={() => deleteBookmark(index)}
                  style={{ marginLeft: "5px", cursor: "pointer", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="container my-1"
        style={{
          backgroundColor: props.mode === "dark" ? "grey" : "white",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <h4>Preview Text</h4>
        <p>{text}</p>
      </div>
    </>
  );
};

export default Body;
