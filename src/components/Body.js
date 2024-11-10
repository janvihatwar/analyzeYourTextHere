import React, { useState } from "react";

const Body = (props) => {
  const [text, setText] = useState("");
  const [readability, setReadability] = useState({ readingEase: null, gradeLevel: null });
  const [bookmarkedTexts, setBookmarkedTexts] = useState([]);

  const upCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Converted to UpperCase!!", "success");
  };

  const lwCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Converted to LowerCase!!", "success");
  };

  const clearText = () => {
    setText("");
    setReadability({ readingEase: null, gradeLevel: null });
    props.showAlert("Text Cleared!!", "success");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied!!", "success");
  };

  const extraSpace = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Extra Space removed!!", "success");
  };

  const change = (event) => {
    const newText = event.target.value;
    handleTextChange(newText);
  };

  const handleTextChange = (newText) => {
    setText(newText);
    const scores = calculateReadability(newText);
    setReadability(scores);
  };

  // Calculate Readability Scores
  const calculateReadability = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean).length; // Count sentences
    const words = text.split(/\s+/).filter(Boolean).length; // Count words
    const syllables = text.split(/\s+/).reduce((count, word) => {
      return count + countSyllables(word);
    }, 0); // Count syllables in each word

    const averageSentenceLength = words / sentences || 0;
    const averageSyllablesPerWord = syllables / words || 0;

    const readingEase = 206.835 - (1.015 * averageSentenceLength) - (84.6 * averageSyllablesPerWord);
    const gradeLevel = (0.39 * averageSentenceLength) + (11.8 * averageSyllablesPerWord) - 15.59;

    return {
      readingEase: readingEase.toFixed(2),
      gradeLevel: gradeLevel.toFixed(2)
    };
  };

  // Helper function to count syllables in a word
  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1; // Short words have at least one syllable
    const syllableCount = word.match(/[aeiouy]{1,2}/g);
    return syllableCount ? syllableCount.length : 0;
  };

  // Encode both text and emojis to Base64
  const encodeBase64 = () => {
    const base64Encoded = btoa(unescape(encodeURIComponent(text)));
    setText(base64Encoded);
    handleTextChange(base64Encoded);
    props.showAlert("Text Encoded to Base64!", "success");
  };

  // Decode both text and emojis from Base64
  const decodeBase64 = () => {
    try {
      const base64Decoded = atob(text);
      const emojiDecodedText = decodeURIComponent(escape(base64Decoded));
      setText(emojiDecodedText);
      handleTextChange(emojiDecodedText);
      props.showAlert("Text Decoded from Base64!", "success");
    } catch (e) {
      props.showAlert("Invalid Base64 string!", "danger");
    }
  };

  // Bookmark text
  const addBookmark = () => {
    if (text.trim()) {
      setBookmarkedTexts((prev) => [...prev, text]);
      props.showAlert("Text Bookmarked!", "success");
    }
  };

  // Use Bookmark
  const handleBookmarkClick = (bookmark) => {
    setText(bookmark);
    handleTextChange(bookmark);
  };

  // Delete Bookmark
  const deleteBookmark = (index) => {
    const newBookmarks = bookmarkedTexts.filter((_, i) => i !== index);
    setBookmarkedTexts(newBookmarks);
    props.showAlert("Bookmark Deleted!", "success");
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
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes Read
        </p>

        <h4>Readability Scores</h4>
        <p>Reading Ease: {readability.readingEase}</p>
        <p>Grade Level: {readability.gradeLevel}</p>
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
            maxHeight: "300px"
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

      {/* Preview Text Section */}
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
