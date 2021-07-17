import styled from 'styled-components'
import { Link as LinkRouter } from '@reach/router'
import { fadeIn } from '../../styles/animation'

export const Nav = styled.nav`
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #e0e0e0;
  bottom: 0;
  display: flex;
  height: 50px;
  justify-content: space-around;
  left: 0;
  margin: 0 auto;
  max-width: 500px;
  right: 0;
  width: 100%auto;
  z-index: 1;
`

export const Link = styled(LinkRouter)`
  align-items: center;
  color: #888;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  flex-direction: column;
  width: 100%;
  &[aria-current] {
      color: #000;
      ${fadeIn({ time: '0.5s' })};
      &::after {
        content: '.';
        margin-top: -20px;
        bottom: 0;
        font-size: 34px;
        line-height: 20px;
      }
  }
`
