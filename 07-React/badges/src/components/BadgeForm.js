import React from "react";

class BadgeForm extends React.Component {
  // handleClick(e) {
  //   console.log("Button was pressed!");
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("Form was submitted");
  // }

  render() {
    let { firstName, lastName, email, jobTitle, twitter } = this.props.attendee;
    const { handleChange, handleSubmit } = this.props;
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              onChange={handleChange}
              value={firstName}
            ></input>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              onChange={handleChange}
              value={lastName}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
            ></input>
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input
              className="form-control"
              type="text"
              name="jobTitle"
              onChange={handleChange}
              value={jobTitle}
            ></input>
          </div>
          <div className="form-group">
            <label>Twitter</label>
            <input
              className="form-control"
              type="text"
              name="twitter"
              onChange={handleChange}
              value={twitter}
            ></input>
          </div>
          <button className="btn btn-primary">Save</button>
          {this.props.error && (
            <p className="text-danger">{this.props.error.message}</p>
          )}
        </form>
      </>
    );
  }
}

export default BadgeForm;
