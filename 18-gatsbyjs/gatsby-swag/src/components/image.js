import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function Image({ data, alt }) {
  const image = getImage(data.icon)
  return <GatsbyImage image={image} alt={alt} />
}

export default Image
