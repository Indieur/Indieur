import React from 'react';

const BlockQuote = ({text, author})=> (
  <blockquote className="vs-quote">
    <p>{text}</p>
    <cite>{author}</cite>
  </blockquote>
);

export default BlockQuote;