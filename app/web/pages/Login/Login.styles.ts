import styled from 'styled-components';
import { Styles } from '../../components/Container';

export const Container = styled(Styles.Wrapper)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  max-width: 300px;
  width: 100%;
`;
