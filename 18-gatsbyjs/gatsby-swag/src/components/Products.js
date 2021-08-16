import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import formatPrice from "../utils/priceFormat"
import { StyledProducts } from "../styles/components"

const Product = () => {
  const {
    allStripePrice: { edges: products },
  } = useStaticQuery(graphql`
    query ALL_PRODUCTS {
      allStripePrice {
        edges {
          node {
            id
            unit_amount
            product {
              id
              name
              metadata {
                description
                img
                wear
              }
            }
          }
        }
      }
    }
  `)
  return (
    <StyledProducts>
      <h2>Productos</h2>
      <section>
        {products.map(({ node }) => {
          const price = formatPrice(node.unit_amount)
          return (
            <article key={node.id}>
              <img src={node.product.metadata.img} alt={node.product.name} />
              <p>{node.product.name}</p>
              <small>USD {price}</small>
              <Link to={`/${node.id}`}>
                Comprar ahora <span>➡</span>
              </Link>
            </article>
          )
        })}
      </section>
    </StyledProducts>
  )
}

export default Product
