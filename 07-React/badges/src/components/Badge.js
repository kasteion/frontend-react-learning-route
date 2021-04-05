import React from "react";
import Gravatar from "./Gravatar";
import confLogo from "../images/badge-header.svg";
import "./styles/Badge.css";

class Badge extends React.Component {
  render() {
    console.log(this.props);
    const { firstName, lastName, jobTitle, twitter } = this.props.attendee;
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>
        <div className="Badge__section-name">
          <Gravatar
            className="Badge__avatar"
            email={this.props.attendee.email}
            alt="Avatar"
          />
          <h1>
            {firstName || "NAME"} <br /> {lastName || "LASTNAME"}
          </h1>
        </div>
        <div className="Badge__section-info">
          <p>{jobTitle || "JOB_TITLE"}</p>
          <p>@{twitter || "TWITTER"}</p>
        </div>
        <div className="Badge__footer">#Platziconf</div>
      </div>
    );
  }
}

export default Badge;
