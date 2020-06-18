import styled from 'styled-components';
import { Styles } from '../../components/Container';

export const Container = styled(Styles.Wrapper)`
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Inner = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 32px;
`;

export const Artist = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
  color: #ffffffde;
`;

export const TitlePlaceholder = styled.div`
  width: 200px;
  height: 32px;
  background: #ecffff5e;
`;

export const ArtistPlaceholder = styled.div`
  width: 140px;
  height: 18px;
  background: #ecffff5e;
`;

export const TitlePlaceholderWrapper = styled.div`
  height: 44px;
  padding-top: 8px;
  margin-bottom: 12px;
`;

export const ArtistPlaceholderWrapper = styled.div`
  height: 25px;
  padding-top: 5px;
  margin: 0 0 12px;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, rgba(9,14,19,0.3) 0%,rgba(9,14,19,1) 100%);
  z-index: 1;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: ${props => `url(${props.image})`};
  z-index: 0;
  opacity: ${props => (props.image ? 1 : 0)};
`;

export const Listeners = styled.div`
  margin: 0 0 8px;
  border-bottom: 1px solid #ffffff0d;
  padding: 0 0 12px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.4px;
  color: #ecffff;
`;

export const TooltipContent = styled.span`
  cursor: help;
`;

export const TooltipOverlay = styled.span`
  white-space: pre-line;
`;