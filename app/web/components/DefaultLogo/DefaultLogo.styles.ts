import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  width: 182px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 12px;
  text-decoration: none;
`;

export const Icon = styled.div`
  width: 48px;
  height: 60px;
  margin-right: 22px;
  position: relative;
  top: 1;
`;

export const Square1 = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 10px;
  left: 10px;
  background-color: #ecffff;
  transform: rotate(45deg);
  box-shadow: 0 0 0 6px #090e13;
  z-index: 1;
`;

export const Square2 = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 7px;
  left: 10px;
  box-shadow: inset 0 0 0 4px #22897f;
  background-color: #090e13;
  transform: rotate(45deg) translate3d(12px,12px,0);
`;

export const Title = styled.h1`
  font-size: 34px;
  font-weight: normal;
  margin: 0;
  position: relative;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 24px;
  display: flex;
  align-items: center;
  user-select: none;
`;
