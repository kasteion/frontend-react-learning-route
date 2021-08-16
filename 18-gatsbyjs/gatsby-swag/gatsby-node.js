/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const productTemplate = path.resolve(`src/templates/Product.js`)
  return graphql(`
    query GET_PRICES {
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
  `).then(result => {
    const {
      data: {
        allStripePrice: { edges: products },
      },
    } = result
    products.forEach(({ node }) => {
      createPage({
        path: `${node.id}`,
        component: productTemplate,
        context: { price: node },
      })
    })
  })
}
