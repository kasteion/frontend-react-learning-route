import React from "react"
import Seo from "../components/seo"
import { Button, Purchase } from "../styles/components"
import { Link } from "gatsby"

function gracias() {
  return (
    <div>
      <Seo title="Compra Exitosa" />
      <Purchase>
        <h2>Compra Exitosa</h2>
        <p>Espero que disfrutes tu Swag, lúcelo con orgullo.</p>
        <p>¡Te esperamos de vuelta, no pares de aprender!</p>
        <p>
          <span role="img" aria-label="emoji">
            ❤
          </span>
        </p>
        <Link to="/">
          <Button>Volver al catalogo</Button>
        </Link>
      </Purchase>
    </div>
  )
}

export default gracias
