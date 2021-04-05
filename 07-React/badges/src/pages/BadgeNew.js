import React from "react";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import "./styles/BadgeNew.css";
import api from "../api";

// const attendee = {
//   name: "Fredy",
//   lastname: "Castellón",
//   avatarUrl: "https://gravatar.com/avatar?d=identicon",
//   jobTitle: "Frontend Engineer",
//   twitter: "@kasteion",
// };

class BadgeNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      attendee: {
        firstName: "",
        lastName: "",
        avatarUrl: "https://gravatar.com/avatar?d=identicon",
        email: "",
        jobTitle: "",
        twitter: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "email") {
      let md5email = md5(e.target.value);
      this.setState({
        attendee: {
          ...this.state.attendee,
          avatarUrl: `https://gravatar.com/avatar/${md5email}?d=identicon`,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        attendee: {
          ...this.state.attendee,
          [e.target.name]: e.target.value,
        },
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HandleSubmit");
    this.setState({
      loading: true,
      error: null,
    });
    try {
      await api.badges.create(this.state.attendee);
      this.setState({ loading: false });
      this.props.history.push("/badges");
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    return (
      <>
        <div className="BadgeNew__hero">
          <img
            className="BadgeNew__hero-image img-fluid"
            src={header}
            alt="Logo"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge attendee={this.state.attendee}></Badge>
            </div>
            <div className="col-6">
              <h1>New Attendant</h1>
              <BadgeForm
                attendee={this.state.attendee}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                error={this.state.error}
              ></BadgeForm>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(BadgeNew);
