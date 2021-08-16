import * as React from "react"
import { graphql } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import { Jumbo, Products } from "../components"

export const query = graphql`
  query GET_DESCRIPTION {
    allSite {
      edges {
        node {
          siteMetadata {
            description
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  // console.log(data.allSite.edges[0].node.siteMetadata.description)
  return (
    <>
      <Seo title="Home" />
      <Jumbo
        description={data.allSite.edges[0].node.siteMetadata.description}
      />
      <Products />
    </>
  )
}

export default IndexPage
