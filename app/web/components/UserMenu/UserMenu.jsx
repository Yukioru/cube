import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';

import Button from '../Button';
import Context from '../../App.context';
import * as Styles from './UserMenu.styles';

const UserMenu = () => {
  // const history = useHistory();
  const { user } = useContext(Context);
  if (Object.keys(user).length) {
    const onSelect = async ({ key }) => {
      if (key === 'logout') {
        const res = await fetch('/api/auth/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(e => e.json());
        if (res.code === 200) {
          window.location.pathname = '/';
          // history.replace('/');
        }
      }
    };

    const menu = (
      <Menu onSelect={onSelect}>
        {/* <MenuItem className="link" key="account">
          <Link to={`/account/${user._id}`}>
            Аккаунт
          </Link>
        </MenuItem>
        <MenuItem className="link" key="2">
          <Link to="/register">
            two
          </Link>
        </MenuItem>
        <Divider /> */}
        <MenuItem key="logout">Выйти</MenuItem>
      </Menu>
    );
    
    return (
      <Dropdown
        trigger={['click']}
        overlay={menu}
        animation="slide-up"
      >
        <Button>
          {user.displayName}
        </Button>
      </Dropdown>
    );
  }
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
