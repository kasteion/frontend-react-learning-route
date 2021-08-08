import React, { useContext } from "react";
import {
  Message,
  Divider,
  Container,
  Segment,
  Button,
  Item,
  Icon,
} from "semantic-ui-react";
import Link from "next/link";
import AppContext from "../../context/AppContext";

const Cart = () => {
  const {
    state: { cart },
    removeFromCart,
  } = useContext(AppContext) as TUseInitialState;

  const handleRemoveItem = (payload) => {
    removeFromCart(payload);
  };

  const showItemCount = () => {
    const numArray = cart.map((item) => item.number);
    if (numArray.length === 0) {
      return 0;
    }
    const count = numArray.reduce((acc, curr) => acc + curr);
    return count;
  };

  return (
    <Container>
      {cart.length === 0 ? (
        <Message warning>
          <Message.Header>Your cart is empty</Message.Header>
          <p>
            You will need to add some items to the cart before you can checkout.
          </p>
        </Message>
      ) : (
        <Item.Group divided>
          {cart.map((item, i) => (
            <Item key={i}>
              <Item.Image src={item.product.image} />
              <Item.Content>
                <Item.Header as="h3">
                  <Link href={`/product/${item.product.id}`}>
                    {item.product.name}
                  </Link>
                </Item.Header>
                <Item.Meta>{`${item.number} x ${item.product.price}`}</Item.Meta>
                <Item.Description>
                  Some more information goes here...
                </Item.Description>
                <Item.Extra>
                  <Button
                    icon
                    color="black"
                    floated="right"
                    onClick={() => handleRemoveItem(item.product)}
                  >
                    <Icon name="remove" />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
      <Divider />
      <Segment clearing>
        <strong>Sub Total: </strong>
        {showItemCount()}
        <Button secondary floated="right">
          Check Out
        </Button>
      </Segment>
    </Container>
  );
};

export default Cart;
