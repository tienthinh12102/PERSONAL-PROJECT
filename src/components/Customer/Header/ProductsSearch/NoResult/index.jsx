import React from "react";
import "./style.scss";

function NoResult(props) {
  return (
    <div className="no-result">
      <div className="search-message-empty-container">
        <span className="search-message-empty-decal">
          <span className="search-message-empty-decal-eyes">:</span>
          <span>(</span>
        </span>
        <h2 className="search-message-empty-message">
          Nope, nothing.
        </h2>
      </div>
    </div>
  )
}

export default NoResult
