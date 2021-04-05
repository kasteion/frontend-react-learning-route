import React from "react";
import { withRouter } from "react-router-dom";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import "./styles/BadgeEdit.css";
import api from "../api";

// const attendee = {
//   name: "Fredy",
//   lastname: "Castellón",
//   avatarUrl: "https://gravatar.com/avatar?d=identicon",
//   jobTitle: "Frontend Engineer",
//   twitter: "@kasteion",
// };

class BadgeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      attendee: {
        name: "",
        lastname: "",
        avatarUrl: "https://gravatar.com/avatar?d=identicon",
        email: "",
        jobTitle: "",
        twitter: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      attendee: {
        ...this.state.attendee,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HandleSubmit");
    this.setState({ loading: true, error: null });
    try {
      await api.badges.update(
        this.props.match.params.badgeId,
        this.state.attendee
      );
      this.setState({ loading: false });
      this.props.history.push("/badges");
    } catch (err) {
      this.setState({ loading: false, error: err });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });
    try {
      console.log(this.props.match.params.badgeId);
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, attendee: data });
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
        <div className="BadgeEdit__hero">
          <img
            className="BadgeEdit__hero-image img-fluid"
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
              <h1>Edit Attendant</h1>
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

export default withRouter(BadgeEdit);
