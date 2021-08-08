import React from "react";
import { Grid, Header, Container, Segment } from "semantic-ui-react";
import Link from "next/link";

const Footer = () => {
  return (
    <Segment vertical textAlign="center" padded="very">
      <Container>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header as="h4" content="Nosotros" />
              <Link href="/about">Conoce más</Link>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as="h4" content="Servicios" />
              <Link href="/">Todos los productos</Link>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as="h4" content="Hecho para" />
              <p>
                El curso de Next.JS de <a href="https://platzi.com">Platzi</a>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <div style={{ paddingTop: "50px" }}>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Avocado images taken from{" "}
        <a
          href="https://www.californiaavocado.com/avocado101/avocado-varieties"
          title="California Avocado"
        >
          Avocado 101
        </a>{" "}
        at{" "}
        <a href="https://www.californiaavocado.com/" title="California Avocado">
          www.flaticon.com
        </a>
      </div>
    </Segment>
  );
};

export default Footer;
