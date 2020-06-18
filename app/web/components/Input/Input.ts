import styled from 'styled-components';

interface InputProps {
  error?: boolean;
  [key: string]: any;
};

const Input = styled.input<InputProps>`
  display: block;
  width: 100%;

  background-color: transparent;
  border: 2px solid ${props => (props.error ? '#ca1818' : '#ecffff')};
  padding: 14px 18px;
  color: #fff;
  font-size: 16px;
  outline: none;
  font-family: 'Noto Sans', sans-serif;

  transition: border .2s ease;
  will-change: border;
`;

export default Input;
