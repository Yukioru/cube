import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './Container.styles';

const Container = ({ children, ...props }) => {
  return (
    <Styles.Wrapper {...props}>
      {children}
    </Styles.Wrapper>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export { Styles };
export default Container;
