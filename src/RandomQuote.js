import './RandomQuote.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuote() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchRandomQoute() {
    try {
      const response = await axios.get('https://type.fit/api/quotes');

      const quotes = response.data;
      const length = quotes.length;

      const randomNumber = Math.floor(Math.random() * length);
      const randomQuote = quotes[randomNumber];

      setQuote(randomQuote);
      setError(null);
    } catch (err) {
      setError(err.message);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRandomQoute();
  }, []);

  return (
    <section>
      <div>
        {loading && <div className="loading align-center"> Please wait a moment ...</div>}
        {error && (
          <div className="error align-center">{`There is a problem fetching the data - ${error}`}</div>
        )}
        {quote && (
          <div id="quote-box">
            <div id="text">"{quote.text}"</div>
            <div id="author">({quote.author})</div>
            <div className="btn-container">
              <div className="btn">
                <button id="new-quote" onClick={fetchRandomQoute}>
                  show other Quote
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
        )}
      </div>

      <div class="description">
        <p>
          freeCodeCamp - Front End Development Libraries Projects - Build a Random Quote
          Machine
        </p>
      </div>
    </section>
  );
}

export default RandomQuote;
