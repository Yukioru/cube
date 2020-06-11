import styled from 'styled-components';
import { Styles } from '../Container';

export const Wrapper = styled.footer`
  margin-top: auto;
  padding-bottom: 54px;
`;

export const Container = styled(Styles.Wrapper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Images = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled.a`
  width: 130px;
  height: 50px;
  filter: grayscale(1);
  transform: scale(1);

  transition: filter .2s ease, transform .2s ease;
  will-change: filter, transform;

  &:hover {
    filter: grayscale(0);
  }

  &:active {
    transform: scale(0.95);
  }

  & + & {
    margin-left: 32px;
  }

  @media (min-width: 768px) {
    width: 220px;
    height: 80px;
  }
`;