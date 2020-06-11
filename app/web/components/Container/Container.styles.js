import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {  
    max-width: 540px;
  }
  
  /* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
  @media (min-width: 768px) {  
    max-width: 720px;
  }
  
  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) { 
    max-width: 960px;
  }
  
  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {  
    max-width: 1140px;
  }
  
  /* Super extra large devices (wide large desktops, 1600px and up) */
  @media (min-width: 1600px) {  
    max-width: 1540px; 
  }
`;
