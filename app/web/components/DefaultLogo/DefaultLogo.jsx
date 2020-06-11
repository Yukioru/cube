import React from 'react';

import * as Styles from './DefaultLogo.styles';

const DefaultLogo = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>
        C
        <Styles.Icon>
          <Styles.Square1 />
          <Styles.Square2 />
        </Styles.Icon>
        be
      </Styles.Title>
    </Styles.Wrapper>
  );
}
 
export { Styles };
export default DefaultLogo;