import React from 'react';

import * as Styles from './Field.styles';

const Field = ({ children, help, title, ...props }) => {
  return (
    <Styles.Wrapper {...props}>
      {title && <Styles.Title>{title}</Styles.Title>}
      {children}
      <Styles.Help>{help}</Styles.Help>
    </Styles.Wrapper>
  );
};

export { Styles };
export default Field;
