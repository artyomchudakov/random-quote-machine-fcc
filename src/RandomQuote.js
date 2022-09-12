import './RandomQuote.css';
import { useState, useEffect } from 'react';

function RandomQuote() {
  const [quote, setQuote] = useState({
    text: 'Do more than dream: work.',
    author: 'William Arthur Ward',
  });
  async function fetchRandomQoute() {
    try {
      const quotes = await getAllQuotes('https://type.fit/api/quotes');
      const length = quotes.length;
      const randomNumber = Math.floor(Math.random() * length);
      const randomQuote = quotes[randomNumber];
      setQuote({
        text: randomQuote.text,
        author: randomQuote.author || 'Author is unknown',
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRandomQoute();
  }, []);

  return (
    <div id="quote-box">
      <div id="text">"{quote.text}"</div>
      <div id="author">{quote.author}</div>
      <div className="btn-container">
        <div className="btn">
          <button id="new-quote" onClick={fetchRandomQoute}>
            New Quote
          </button>
        </div>
        <div className="btn">
          <a
            href="https://twitter.com/intent/tweet"
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
          >
            tweet
          </a>
        </div>
      </div>
    </div>
  );
}

async function getAllQuotes(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
}

export default RandomQuote;
