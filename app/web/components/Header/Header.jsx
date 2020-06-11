import React from 'react';

import * as Styles from './Header.styles';

import DefaultLogo from '../DefaultLogo';

const Header = () => {
  return (
    <Styles.Wrapper>
      <Styles.Container>
        <DefaultLogo />
      </Styles.Container>
    </Styles.Wrapper>
  );
};

export { Styles };
export default Header;