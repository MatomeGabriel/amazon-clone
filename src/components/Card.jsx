import React from "react";

import "./Card.css";
import { Link } from "react-router";

const Card = ({ data }) => {
  const { category, thumbnail } = data;
  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-title">{category}</h2>
      </header>
      <Link to={`/products/${category}`} className="card-link">
        <div className="card-img-container">
          <img className="card-img" src={thumbnail} alt="" />
        </div>
      </Link>
      <div className="card-more">
        <Link to={`/products/${category}`} className="card-more-link">
          Discover now
        </Link>
      </div>
    </div>
  );
};

export default Card;
