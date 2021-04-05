import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/BadgesList.css";
import BadgeItem from "./BadgeItem";

const useSearchBadges = (badges) => {
  const [query, setQuery] = useState("");
  const [filteredBadges, setFilteredBadges] = useState(badges);

  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredBadges(result);
  }, [badges, query]);

  return { query, setQuery, filteredBadges };
};

const BadgesList = (props) => {
  const badges = props.badges;
  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h1>No badges where found...</h1>
      </div>
    );
  }
  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredBadges.map((badge) => {
          return (
            <li className="BadgesListItem" key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgeItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BadgesList;
