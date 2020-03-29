import React from 'react';
import ViewsContext from '../context/ViewsContext';

const withViewsContext = Component => {
  return function contextComponent(props) {
    return (
      <ViewsContext.Consumer>
        {context => <Component {...props} viewsContext={context} />}
      </ViewsContext.Consumer>
    );
  };
};

export default withViewsContext;
