import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Styles } from '../Container';

export const Wrapper = styled.header`
  min-height: 114px;
  padding-top: 54px;
  display: flex;
  flex-direction: column;
`;

export const Container = styled(Styles.Wrapper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Logo = styled.div`
  position: absolute;
  padding: 0 100px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
`;

export const User = styled.div`
  position: absolute;
  padding: 0 30px;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;