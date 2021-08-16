import React, { useState, useContext } from "react"
import { CartContext } from "../Context"
import priceFormat from "../utils/priceFormat"
import {
  Tag,
  SizeButton,
  SizeSelect,
  Button,
  StyledProductDetail,
  QtySelect,
} from "../styles/components"
import { Seo, Stars } from "./"

const ProductDetails = ({ price: { id, unit_amount, product } }) => {
  const formatedPrice = priceFormat(unit_amount)
  const [size, setSize] = useState(2)
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(CartContext)
  return (
    <StyledProductDetail>
      <Seo title={product.name} />
      <img src={product.metadata.img} alt={product.name} />
      <div>
        <Tag>Popular</Tag>
        <h2>{product.name}</h2>
        <b>USD {formatedPrice}</b>
        <Stars />
        {product.metadata.wear && <h3>Color: Azul</h3>}
        <small>{product.metadata.description}</small>
        {product.metadata.wear && (
          <SizeSelect selected={size}>
            <SizeButton onClick={() => setSize(1)}>XS</SizeButton>
            <SizeButton onClick={() => setSize(2)}>S</SizeButton>
            <SizeButton onClick={() => setSize(3)}>M</SizeButton>
            <SizeButton onClick={() => setSize(4)}>L</SizeButton>
          </SizeSelect>
        )}
        <p>Cantidad:</p>
        <QtySelect>
          <button onClick={() => (qty > 1 ? setQty(qty - 1) : null)}>-</button>
          <input type="text" disabled value={qty} />
          <button onClick={() => setQty(qty + 1)}>+</button>
        </QtySelect>
        <Button
          onClick={() =>
            addToCart({
              id: id,
              price: unit_amount,
              name: product.name,
              img: product.metadata.img,
              quantity: qty,
            })
          }
        >
          Agregar al carrito
        </Button>
      </div>
    </StyledProductDetail>
  )
}

export default ProductDetails
