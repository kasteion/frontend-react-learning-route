import React from "react";
import { Link } from "react-router-dom";
import BadgesList from "../components/BadgesList";
import PageLoading from "../components/PageLoading";
import MiniLoader from "../components/MiniLoader";
import PageError from "../components/PageError";
import confLogo from "../images/platziconf-logo.svg";
import api from "../api";
import "./styles/Badges.css";

class Badges extends React.Component {
  constructor(props) {
    super(props);
    console.log("1. Constructor()");
    this.state = {
      loading: false,
      error: null,
      page: 1,
      data: [],
    };
  }

  componentDidMount() {
    console.log("3. componentDidMount()");
    // this.timeoutId = setTimeout(() => {
    //   this.setState({
    //     data: [
    //       {
    //         id: "2de30c42-9deb-40fc-a41f-05e62b5939a7",
    //         name: "Freda",
    //         lastname: "Grady",
    //         email: "Leann_Berge@gmail.com",
    //         jobTitle: "Legacy Brand Director",
    //         twitter: "FredaGrady22221-7573",
    //         avatarUrl:
    //           "https://www.gravatar.com/avatar/f63a9c45aca0e7e7de0782a6b1dff40b?d=identicon",
    //       },
    //       {
    //         id: "d00d3614-101a-44ca-b6c2-0be075aeed3d",
    //         name: "Major",
    //         lastname: "Rodriguez",
    //         email: "Ilene66@hotmail.com",
    //         jobTitle: "Human Research Architect",
    //         twitter: "ajorRodriguez61545",
    //         avatarUrl:
    //           "https://www.gravatar.com/avatar/d57a8be8cb9219609905da25d5f3e50a?d=identicon",
    //       },
    //       {
    //         id: "63c03386-33a2-4512-9ac1-354ad7bec5e9",
    //         name: "Daphney",
    //         lastname: "Torphy",
    //         email: "Ron61@hotmail.com",
    //         jobTitle: "National Markets Officer",
    //         twitter: "DaphneyTorphy96105",
    //         avatarUrl:
    //           "https://www.gravatar.com/avatar/e74e87d40e55b9ff9791c78892e55cb7?d=identicon",
    //       },
    //     ],
    //   });
    // }, 3000);
    this.fetchCharacters();
    this.intervalId = setInterval(() => {
      this.fetchCharacters();
    }, 5000);
  }

  fetchCharacters = async () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    try {
      // const response = await fetch(
      //   `https://rickandmortyapi.com/api/character/?page=${this.state.page}`
      // );
      // const data = await response.json();
      // const dataArray = data.results.map((character) => {
      //   return {
      //     id: character.id,
      //     name: character.name,
      //     lastname: "",
      //     email: "",
      //     jobTitle: character.species,
      //     twitter: character.name.replace(" ", ""),
      //     avatarUrl: character.image,
      //   };
      // });
      // this.setState({
      //   ...this.state,
      //   loading: false,
      //   error: null,
      //   page: this.state.page + 1,
      //   data: [].concat(this.state.data, dataArray),
      // });
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch (err) {
      this.setState({
        ...this.state,
        loading: false,
        error: err,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("5. componentDidUpdate()");
    console.log({
      prevProps: prevProps,
      prevState: prevState,
    });
    console.log({
      props: this.props,
      state: this.state,
    });
  }

  componentWillUnmount() {
    //clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
    console.log("6. componentWillUnmout()");
  }

  render() {
    console.log("2/4. render()");
    if (this.state.loading === true && this.state.data.length === 0) {
      return <PageLoading></PageLoading>;
    }
    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }
    return (
      <>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img className="img-fluid" src={confLogo} alt="Logo" />
            </div>
          </div>
        </div>
        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>
        </div>
        <div className="Badges__list">
          <div className="Badges__container">
            <BadgesList badges={this.state.data} />
          </div>
        </div>
        <div className="Badges__container">
          {this.state.loading && <MiniLoader />}
        </div>
      </>
    );
  }
}

export default Badges;
