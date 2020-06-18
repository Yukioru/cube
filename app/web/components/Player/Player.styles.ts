import styled from 'styled-components';

interface ButtonProps {
  isAir?: boolean;
  isActive?: boolean;
  [key: string]: any;
};

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Button = styled.button<ButtonProps>`
  width: 65px;
  height: 65px;
  border: none;
  transform: rotate(45deg);
  padding: 8px;
  background-color: #FFF;
  border: 6px solid;
  border-color: #090e13;
  outline: 4px solid;
  outline-color: ${props => (props.isAir ? '#ca1818' : '#22897f')};
  box-shadow: ${props => (props.isActive ? `0 0 32px 0px ${props.isAir ? '#f00' : '#22897f'}` : `0 0 0 0 ${props.isAir ? '#f00' : '#22897f'}`)};

  cursor: pointer;

  transition: outline-color .2s ease, outline-width .2s ease, border-width .2s ease, box-shadow .2s ease;
  will-change: outline-color, outline-width, border-width, box-shadow;

  &:hover {
    outline-width: 6px;
    box-shadow: 0 0 32px 0px ${props => (props.isAir ? '#f00' : '#22897f')};
  }

  &:active {
    border-width: 8px;
    box-shadow: 0 0 32px 0px ${props => (props.isAir ? '#f00' : '#22897f')};
  }
`;

export const ButtonContent = styled.div`
  transform: rotate(-45deg);
  font-size: 14px;
  font-weight: bold;
`;

export const ActionWrapper = styled.div`
  display: inline-block;
  padding: 20px;
  overflow: inherit;
  margin-right: 0;
  margin-bottom: 48px;
  position: relative;

  @media (min-width: 768px) {
    margin-right: 48px;
    margin-bottom: 0;
  }
`;

export const SliderWrapper = styled.div`
  margin-top: auto;
  width: 200px;

  .rc-slider-rail {
    border-radius: 0;
    background-color: #ffffff0d;
  }
  .rc-slider-track {
    border-radius: 0;
    background-color: #22897f;
  }
  .rc-slider-handle {
    border-radius: 0;
    border: solid 2px #22897f;
    background-color: #ecffff;
    transform: translateX(-50%) rotate(45deg) !important;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const M3U = styled.a`
  position: absolute;
  top: -3px;
  left: -10px;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  transform: rotate(-45deg) scale(1);
  text-shadow: 0 0 0 #fff;

  transition: transform .2s ease, text-shadow .2s ease;
  will-change: transform, text-shadow;

  &:hover {
    text-shadow: 0 0 4px #fff;
    transform: rotate(-45deg) scale(1.2);
  }
`;
