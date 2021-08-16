import React, { useContext } from "react"
import { CartContext } from "../Context"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { MenuItem, StyledHeader } from "../styles/components"

const Header = ({ siteTitle }) => {
  const { cart } = useContext(CartContext)

  const calcItems = () => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0)
  }

  return (
    <StyledHeader>
      <Link to="/">
        <img
          src="https://i.postimg.cc/6q3pg48v/Logo.png"
          alt="Logo Platzi Swag"
        />
      </Link>
      <nav>
        <ul>
          <MenuItem>
            <Link to="/">Productos</Link>
          </MenuItem>
          <MenuItem>
            <a href="http://platzi.com">Platzi</a>
          </MenuItem>
          <MenuItem>
            <Link to="/cart">
              <span>
                <img
                  src="https://i.postimg.cc/L6wpMxLt/cart.png"
                  alt="Cart Logo"
                />
                {calcItems()}
              </span>
            </Link>
          </MenuItem>
        </ul>
      </nav>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
