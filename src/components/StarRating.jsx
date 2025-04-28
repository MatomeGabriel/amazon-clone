import React from "react";
import "./StarRating.css";
import { Link } from "react-router";

const StarRating = ({ rating = 3.6, ratingCount = 16, allInfo = false }) => {
  const inNum = parseInt(rating);
  const flNum = (parseFloat(rating) - inNum) * 10;

  return (
    <div className="star-ratings">
      {allInfo && <div className="average-rating">{rating}</div>}
      <Link className="stars-container">
        <div className="stars">
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <React.Fragment key={index}>
                  {inNum >= index + 1 && (
                    <span className="material-symbols-outlined star star-filled">
                      star
                    </span>
                  )}

                  {inNum < index + 1 && flNum >= 5 && (
                    <span
                      className={`material-symbols-outlined star ${
                        inNum === index ? "star-filled" : ""
                      }`}>
                      {inNum === index ? "star_half" : "star"}
                    </span>
                  )}

                  {inNum < index + 1 && flNum < 5 && (
                    <span className={`material-symbols-outlined star`}>
                      star
                    </span>
                  )}
                </React.Fragment>
              );
            })}
        </div>
        <span className="material-symbols-outlined icon-small">
          keyboard_arrow_down
        </span>
      </Link>

      <Link className="link">
        {ratingCount} {allInfo ? "ratings" : ""}
      </Link>
    </div>
  );
};

export default StarRating;
