import React, { useContext, useState, useEffect } from "react"
import { Link } from "gatsby"
import { Button, StyledCart } from "../styles/components"
import formatPrice from "../utils/priceFormat"
import { CartContext } from "../Context"

const Cart = () => {
  const { cart } = useContext(CartContext)
  const [subtotal, setSubtotal] = useState(0)

  const calcSubtotal = () => {
    setSubtotal(cart.reduce((acc, swag) => acc + swag.quantity * swag.price, 0))
  }

  useEffect(() => {
    calcSubtotal()
  }, [])

  return (
    <StyledCart>
      <h2>Carrito de compras</h2>
      <table>
        <tbody>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
          {cart.map(swag => (
            <tr key={swag.id}>
              <td>
                <img src={swag.img} alt={swag.name}></img>
              </td>
              <td>USD {formatPrice(swag.price)}</td>
              <td>{swag.quantity}</td>
              <td>{formatPrice(swag.price * swag.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <div>
          <h3>Subtotal: </h3>
          <small>{formatPrice(subtotal)}</small>
        </div>
        <div>
          <Link to="/">
            <Button type="outline">Volver</Button>
          </Link>
          <Button>Comprar</Button>
        </div>
      </nav>
    </StyledCart>
  )
}

export default Cart
