import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../themes/mainTheme';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebaseConfig from '../firebase/firebaseConfig';
import { rrfConfig } from '../firebase/firebaseConfig';
import store from '../store/index';
import GlobalStyle from '../themes/GlobalStyle';
import AuthIsLoaded from '../components/atoms/AuthIsLoaded/AuthIsLoaded';
import UserPage from '../Template/UserPage/UserPage';
import LoginView from '../Views/LoginView/LoginView';
import RegisterView from '../Views/RegisterView/RegisterView';
import MainPageView from '../Views/MainPageView/MainPageView';

function Router() {
  const { login, user, register, main } = routes;
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebaseConfig}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <BrowserRouter>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <AuthIsLoaded>
              <Switch>
                <Route exact path={main} component={MainPageView} />
                <Route path={login} component={LoginView} />
                <Route path={user} component={UserPage} />
                <Route path={register} component={RegisterView} />
                <Route path={'*'} component={LoginView} />
              </Switch>
            </AuthIsLoaded>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default Router;
