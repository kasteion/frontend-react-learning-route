import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import { Button, Purchase } from "../styles/components"

function cancelada() {
  return (
    <div>
      <Seo title="Compra Cancelada" />
      <Purchase>
        <h2>Compra Cancelada</h2>
        <p>
          Tu compra ha sido cancelada{" "}
          <span role="img" aria-aria-label="emoji">
            😢
          </span>
          .
        </p>
        <p>Pero tu Swag estará esperándote cuando te decidas a obtenerlo.</p>
        <p>¡Te esperamos de vuelta, no pares de aprender!</p>
        <Link to="/">
          <Button>Volver al catalogo</Button>
        </Link>
      </Purchase>
    </div>
  )
}

export default cancelada
