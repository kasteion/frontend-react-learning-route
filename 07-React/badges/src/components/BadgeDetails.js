import React, { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import DeleteBadgeModal from "../components/DeleteBadgeModal";
import confLogo from "../images/platziconf-logo.svg";
import "../pages/styles/BadgeDetails.css";

const useIncreaseCount = (max) => {
  const [count, setCount] = useState(0);
  if (count > max) {
    setCount(0);
  }
  return [count, setCount];
};
const BadgeDetails = (props) => {
  //const [count, setCount] = useState(0);
  const [count, setCount] = useIncreaseCount(4);
  const data = props.badge;
  return (
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={confLogo} alt="Logo de la conferencia" />
            </div>
            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>{`${data.firstName} ${data.lastName} `}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <Badge attendee={data}></Badge>
          </div>
          <div className="col">
            <h2>Actions</h2>
            <div>
              <div>
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  className="btn btn-primary mr-4"
                >
                  Increase Count {count}
                </button>
                <Link
                  className="btn btn-primary mb-4"
                  to={`/badges/${data.id}/edit`}
                >
                  Edit
                </Link>
              </div>
              <div>
                <button onClick={props.onOpenModal} className="btn btn-danger">
                  Delete
                </button>
                <DeleteBadgeModal
                  isOpen={props.modalIsOpen}
                  onClose={props.onCloseModal}
                  onDeleteBadge={props.onDeleteBadge}
                >
                  Lorem Ipsum
                </DeleteBadgeModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetails;
