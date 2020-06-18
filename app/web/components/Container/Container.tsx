import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './Container.styles';

interface ContainerProps {
  children?: React.ReactNode;
  [key: string]: any;
};

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
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
  children: undefined,
};

export { Styles };
export default Container;
