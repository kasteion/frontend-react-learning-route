import { useState, useReducer, useMemo, useRef, useCallback } from "react";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const API = "https://rickandmortyapi.com/api/character/";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  // Esto lo elimino por utilizar el custom hook
  //const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  // Quito esto porque voy a utilizar un custom hook
  // useEffect(() => {
  //   fetch(URI)
  //     .then((response) => response.json())
  //     .then((data) => setCharacters(data.results));
  // }, []);

  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // Antes de useRef
  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // };

  // Con useRef
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  // Con useCallback
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // Antes de useMemo
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  // Con useMemo
  const filteredUsers = useMemo(() =>
    characters.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="characters">
      <ul>
        {favorites.favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {filteredUsers.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <button
              type="button"
              onClick={() => {
                handleClick(character);
              }}
            >
              Add to Favorite
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
