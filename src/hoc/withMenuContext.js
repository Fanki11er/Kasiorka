import React, { Component } from 'react';
import MenuContext from '../context/MenuContext';

const withMenuContext = Component => {
  return function contextComponent(props) {
    return (
      <MenuContext.Consumer>
        {context => <Component {...props} menuContext={context} />}
      </MenuContext.Consumer>
    );
  };
};

export default withMenuContext;
