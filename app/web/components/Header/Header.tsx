import React from 'react';

import * as Styles from './Header.styles';

import DefaultLogo from '../DefaultLogo';
import UserMenu from '../UserMenu';

const Header = () => {
  return (
    <Styles.Wrapper>
      <Styles.Container>
        <Styles.Logo>
          <DefaultLogo />
        </Styles.Logo>
        <Styles.User>
          <UserMenu />
        </Styles.User>
      </Styles.Container>
    </Styles.Wrapper>
  );
};

export { Styles };
export default Header;