import React, { useState } from "react";

export default function Bio() {
  const [enteredText, setEnteredText] = useState("");
  const [submittedText, setSubmittedText] = useState(null);
  const textChangeHandler = (i) => {
    setEnteredText(i.target.value);
    //console.log(i.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmittedText(enteredText);
    setEnteredText("");
  };

  return (
    <div className="App">
      <h1>Get user input</h1>
      <form onSubmit={submitHandler}>
      <input
        placeholder="type something"
        type="text"
        value={enteredText}
        onChange={textChangeHandler}
      />
      <button type="submit" >
        Submit
      </button>
      </form>

      {submittedText && (<p>You just typed: {submittedText}</p>)}
    </div>
  );
}