import React from "react"
import { StyledJumbo } from "../styles/components"
import { graphql, useStaticQuery } from "gatsby"
import Image from "./image"

function Jumbo({ description }) {
  const data = useStaticQuery(graphql`
    query GET_IMAGE {
      icon: file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1000
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)
  return (
    <StyledJumbo>
      <div>
        <h2>Consigue el mejor swag exclusivo y especial de Platzi</h2>
        <small>{description}</small>
      </div>
      <Image data={data} alt="Icon" />
    </StyledJumbo>
  )
}

export default Jumbo
