import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import Avocado from "./Avocado";
import Basket from "./Basket";

const StyledItem = styled(Menu.Item)`
  & svg {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const {
    state: { cart },
  } = useContext(AppContext) as TUseInitialState;
  const [activeItem, setActiveItem] = useState(router.asPath);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    router.push(name);
  };

  const showItemCount = () => {
    const numArray = cart.map((item) => item.number);
    if (numArray.length === 0) {
      return 0;
    }
    const count = numArray.reduce((acc, curr) => acc + curr);
    return count;
  };

  return (
    <Menu pointing fluid widths={3} size="large">
      <StyledItem
        name="/"
        active={activeItem === "/"}
        onClick={handleItemClick}
        position="left"
      >
        <Avocado size="30pt" />
        AvoStore
      </StyledItem>
      <StyledItem
        name="/cart"
        active={activeItem === "/cart"}
        onClick={handleItemClick}
        position="right"
      >
        <Basket size="30pt" />
        Canasta ({showItemCount()})
      </StyledItem>
    </Menu>
  );
};

export default Navbar;
