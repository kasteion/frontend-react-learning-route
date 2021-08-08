import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import {
  Item,
  Label,
  Input,
  Container,
  Header,
  Table,
  Message,
  Icon,
} from "semantic-ui-react";
import styled from "styled-components";
import AppContext from "../../context/AppContext";

const Section = styled.section`
  display: flex;
  justify-content: center;
`;
const ProductItem = () => {
  const {
    query: { productId },
  } = useRouter();

  const [product, setProduct] = useState({} as TProduct);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/avo/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
    return () => ac.abort();
  }, [productId]);

  const quantity = useRef(null);
  const { addToCart } = useContext(AppContext) as TUseInitialState;

  const handleAddToCart = () => {
    setAddingToCart(true);
    const number = Number.parseInt(quantity.current.inputRef.current.value);
    setTimeout(() => {
      addToCart({ product, number });
      setAddingToCart(false);
      setShowMessage(true);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }, [showMessage]);

  if (product.attributes) {
    return (
      <>
        <Section>
          <Item.Group>
            <Item>
              <Item.Image src={product.image} size="medium" />
              <Item.Content verticalAlign="middle">
                <Item.Header>{product.name}</Item.Header>
                <Item.Meta>
                  <span>{product.price}</span>
                </Item.Meta>
                <Item.Meta>
                  <Label>{`SKU: ${product.sku}`}</Label>
                </Item.Meta>
                <Item.Extra>
                  <Input
                    action={{
                      color: "green",
                      labelPosition: "left",
                      icon: "cart",
                      content: "Add to cart",
                      loading: addingToCart,
                      onClick: handleAddToCart,
                    }}
                    disabled={addingToCart}
                    placeholder="1"
                    defaultValue="1"
                    type="number"
                    min="1"
                    ref={quantity}
                  />
                </Item.Extra>
                <Item.Extra>
                  <p style={{ color: "green", opacity: showMessage ? 1 : 0 }}>
                    <Icon name="check" /> Added to cart
                  </p>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Section>
        <Section>
          <Container text>
            <Header as="h2">About this avocado</Header>
            <p>{product.attributes.description}</p>
            <hr />
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">Attributes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>Shape</Table.Cell>
                  <Table.Cell>{product.attributes.shape}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Hardiness</Table.Cell>
                  <Table.Cell>{product.attributes.hardiness}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Taste</Table.Cell>
                  <Table.Cell>{product.attributes.taste}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
        </Section>
      </>
    );
  }

  return <></>;
};

export default ProductItem;
