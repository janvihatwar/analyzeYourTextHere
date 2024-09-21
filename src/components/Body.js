import React, { useState } from "react";

const Body = (props) => {
  const [text, setText] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [encryptionKey, setEncryptionKey] = useState(null);

  const upCase = () => {
    let newText1 = text.toUpperCase();
    setText(newText1);
    props.showAlert("Converted to UpperCase!!", "success");
  };

  const lwCase = () => {
    let newText2 = text.toLowerCase();
    setText(newText2);
    props.showAlert("Converted to LowerCase!!", "success");
  };

  const clearText = () => {
    let newText3 = "";
    setText(newText3);
    props.showAlert("Text Cleared!!", "success");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied!!", "success");
  };

  const extraSpace = () => {
    let newText4 = text.split(/[ ]+/).join(" ");
    setText(newText4);
    props.showAlert("Extra Space removed!!", "success");
  };

  const change = (event) => {
    setText(event.target.value);
  };

  // Encryption functions
  const encrypt = async () => {
    if (!text) {
      alert("Please enter a message.");
      return;
    }

    // Auto-generate encryption key if it hasn't been created yet
    const key = encryptionKey || (await generateKey());
    setEncryptionKey(key);

    const encrypted = await encryptMessage(text, key);
    setEncryptedData(JSON.stringify(encrypted));
    setDecryptedMessage(""); // Clear decrypted message field

    props.showAlert("Text Encrypted!!", "success");
  };

  const decrypt = async () => {
    if (!encryptedData) {
      alert("Please encrypt a message first.");
      return;
    }

    if (!encryptionKey) {
      alert("No encryption key found. Please encrypt a message first.");
      return;
    }

    try {
      const encrypted = JSON.parse(encryptedData);
      const decrypted = await decryptMessage(encrypted, encryptionKey);
      setDecryptedMessage(decrypted);
    } catch (error) {
      alert("Decryption failed. Ensure that the data is correctly formatted.");
      console.error("Decryption error:", error);
    }

    props.showAlert("Text Decrypted!!", "success");

  };

  // Function to auto-generate an encryption key
  const generateKey = async () => {
    return window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  };

  // Encrypt the message
  const encryptMessage = async (message, key) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data
    );

    // Convert encrypted data and IV to Base64
    return {
      iv: btoa(String.fromCharCode(...iv)),
      encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    };
  };

  // Decrypt the message
  const decryptMessage = async (encryptedData, key) => {
    const iv = new Uint8Array(
      atob(encryptedData.iv)
        .split("")
        .map((c) => c.charCodeAt(0))
    );
    const encrypted = new Uint8Array(
      atob(encryptedData.encrypted)
        .split("")
        .map((c) => c.charCodeAt(0))
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  };

  return (
    <>
      <div
        className="container my-4"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h3>
          Text Analyzer - Word counter, Character counter, Remove extra spaces, Encrypt & Decrypt the message
        </h3>
        <textarea
          value={text}
          onChange={change}
          style={{
            backgroundColor: props.mode === "dark" ? "rgb(211,211,211)" : "white",
            color: props.mode === "dark" ? "black" : "black",
            border: "1px solid black",
            width:"80%",
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
          onClick={encrypt}
        >
          Encrypt
        </button>
        <button
          disabled={encryptedData.length === 0}
          className="btn btn-primary mx-3 my-2"
          onClick={decrypt}> 
          Decrypt
        </button>
      </div>

      <div
        className="container my-4"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h5>Encrypted Data (Base64):</h5>
        <textarea
          value={encryptedData}
          readOnly
          rows="4"
          style={{
            backgroundColor: props.mode === "dark" ? "rgb(211,211,211)" : "white",
            color: props.mode === "dark" ? "black" : "black",
            border: "1px solid black",
            width:"80%"
          }}
          
        ></textarea>
         {/* <button
          disabled={text.length === 0}
          className="btn btn-primary my-2 tect-sm"
          onClick={copyText}
        >
          Copy Encrpyted msg
        </button> */}

        <h5>Decrypted Message:
        <p
          id="decryptedMessage"
          style={{ wordWrap: "break-word", maxWidth: "100%" }}
        >
          {decryptedMessage}
      </p></h5>
        
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
