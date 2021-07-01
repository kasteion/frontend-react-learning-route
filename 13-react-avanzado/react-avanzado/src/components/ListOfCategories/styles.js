import styled, { css } from 'styled-components'

export const ListContainer = styled.nav`
  overflow-y: hidden;
  overflow-x: hidden;
  width: 500px;

  ${
    props => props.fixed && css`
      background: #fff;
      border-radius: 60px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      margin: 0 auto;
      padding: 5px;
      position: fixed;
      top: -20px;
      transform: scale(0.5);
      z-index: 1;
    `
  }
`

export const ItemContainer = styled.div`
  padding: 0 8px;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding-top: 8px;
`
