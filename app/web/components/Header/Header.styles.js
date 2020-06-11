import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Styles } from '../Container';

export const Wrapper = styled.header`
  min-height: 150px;
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
`;
