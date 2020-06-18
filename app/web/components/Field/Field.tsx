import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './Field.styles';

interface FieldProps {
  children?: React.ReactNode;
  help?: string;
  title?: string;
  [key: string]: any;
};

const Field: React.FC<FieldProps> = ({ children, help, title, ...props }) => {
  return (
    <Styles.Wrapper {...props}>
      {title && <Styles.Title>{title}</Styles.Title>}
      {children}
      <Styles.Help>{help}</Styles.Help>
    </Styles.Wrapper>
  );
};

Field.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string,
  title: PropTypes.string,
};

Field.defaultProps = {
  children: undefined,
  help: undefined,
  title: undefined,
};

export { Styles };
export default Field;
