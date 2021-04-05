import React from "react";
import "./styles/BadgeItem.css";

const BadgeItem = (props) => {
  const { badge } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-2.5">
          <img
            className="BadgesListItem__avatar"
            src={badge.avatarUrl}
            alt="Avatar"
          ></img>
        </div>
        <div className="col">
          <p>
            {badge.firstName} {badge.lastName}
          </p>
          <p className="text-primary">@{badge.twitter}</p>
          <p>{badge.jobTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeItem;
