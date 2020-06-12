import styled, { css } from 'styled-components';

const Button = styled.button`
  min-width: 80px;
  outline: none;
  display: block;
  background-color: transparent;
  color: #ecffff;
  border: ${props => (props.shadow ? 'none' : '2px solid #22897f')};
  font-size: 14px;
  font-family: 'Noto Sans', sans-serif;
  padding: 8px 16px;
  border-radius: 0;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-align: center;
  text-decoration: none;

  width: ${props => (props.block ? '100%' : 'auto')};

  ${props => (props.disabled && css`
    box-shadow: 0 0 0 0 transparent;
    border-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    cursor: not-allowed;
  `)}

  transition: color .2s ease, background-color .2s ease, box-shadow .2s ease;
  will-change: color, box-shadow, background-color;

  &:hover {
    color: #fff;
    background-color: #22897f1f;
    box-shadow: ${props => (props.shadow ? 'none' : '0 4px 8px -4px #22897f')};
  }
  
  &:active {
    background-color: #22897f45;
    box-shadow: ${props => (props.shadow ? 'none' : '0 0 0 0 #22897f')};;
  }
`;

export default Button;
