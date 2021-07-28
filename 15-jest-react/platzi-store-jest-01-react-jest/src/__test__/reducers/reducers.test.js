import reducers from '../../reducers';
import ProductMock from '../../__mocks__/ProductMock';

describe('Reducers', () => {
  test('ADD_TO_CART reducer', () => {
    const initiaState = { cart: [] };
    const payload = ProductMock;
    const action = {
      type: 'ADD_TO_CART',
      payload,
    };
    const expected = { cart: [ProductMock] };
    expect(reducers(initiaState, action)).toEqual(expected);
  });

  test('REMOVE_FROM_CART reducer', () => {
    const initiaState = { cart: [ProductMock] };
    const payload = ProductMock;
    const action = {
      type: 'REMOVE_FROM_CART',
      payload,
    };
    const expected = { cart: [] };
    expect(reducers(initiaState, action)).toEqual(expected);
  });
});
