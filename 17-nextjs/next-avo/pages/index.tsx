import React from "react";
import { Header } from "semantic-ui-react";
import styled from "styled-components";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import { useProductsList } from "../hooks/useProductsList";
import Avocado from "../components/Avocado";
import AvoList from "../components/AvoList";

const Title = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomePage = () => {
  const { error, loading, products } = useProductsList();

  return (
    <>
      <Title as="h1">
        Platzi <Avocado size="50pt" /> Avo
      </Title>
      {loading ? (
        <>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </>
      ) : error ? (
        <Segment>
          <Message negative>
            <Message.Header>Sorry</Message.Header>
            <p>{error}</p>
          </Message>
        </Segment>
      ) : (
        <AvoList avos={products} />
      )}
    </>
  );
};

export default HomePage;
