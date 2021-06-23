import React, { useState, useEffect } from "react";
import Quote from "./components/Quote";
import "./App.css";

function App() {
  const [jsonResponse, setJsonResponse] = useState({
    content: "Loading...",
    author: "......",
  });

  const handleNewQuoteButton = async () => {
    setJsonResponse(await fetchQuote());
  }

  const handleDisLikeButton = async () => {
    setJsonResponse(await otherQuote(jsonResponse.author));
  }

  const handleLikeButton = async () => {
    setJsonResponse(await likeQuote(jsonResponse.author));
  }

  useEffect(() => {
    handleNewQuoteButton();
  }, []);

  return (
    <main>
      <div id="quote-box">
        <Quote content={jsonResponse.content} author={jsonResponse.author} />
        <div className="bottom-row">
          <button id="like" onClick={() => {handleLikeButton(jsonResponse.author);} } className="btn">
            <i onclick="myFunction(this)" class="fa fa-thumbs-up"></i>
          </button>
          <button id="dislike" onClick={() => {handleDisLikeButton(jsonResponse.author);} } className="btn">
            <i onclick="myFunction(this)" class="fa fa-thumbs-down"></i>
          </button>
        </div>
        <div className="bottom-row">
          <button id="new-quote" onClick={handleNewQuoteButton} className="btn">
            Quote Me!
          </button>
        </div>
      </div>
    </main>
  );
}

//API call to fetch random call
const fetchQuote = async (callBack) => {
  let response = await (await fetch("https://api.quotable.io/random")).json();
  response.content = response.content.replace(/[;]/g, "");
  if (response.content.length > 240) {
    console.log('Content exceeds character limit');
    fetchQuote();
  }
  else {
    return response;
  }
};

//API call to find quotes from other authors when user dislikes the quote
async function otherQuote(author) {
  const response = await fetch('https://api.quotable.io/random?author!="'+author+'"');
  const data = await response.json()
  return data;
}

//API call to find quotes which are from similar author
async function likeQuote(author) {
  const response = await fetch('https://api.quotable.io/random?author="'+author+'"');
  const data = await response.json()
  return data;
}

export default App;
