import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import Context from '../../App.context';
import * as Styles from './UserMenu.styles';

const UserMenu = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Styles.Wrapper>
      <Button as={Link} to="/login">
        Вход
      </Button>
    </Styles.Wrapper>
  );
};

export { Styles };
export default UserMenu;
