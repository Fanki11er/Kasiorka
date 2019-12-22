import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../themes/mainTheme';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import store from '../store/index';
import GlobalStyle from '../themes/GlobalStyle';
import HoursView from '../Views/HoursView/HoursView';
import LoginView from '../Views/LoginView/LoginView';
import RegisterView from '../Views/RegisterView/RegisterView';

function Router() {
  const { login, hours, register } = routes;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <>
            <Switch>
              <Route exact path={login} component={LoginView} />
              <Route path={hours} component={HoursView} />
              <Route path={register} component={RegisterView} />
            </Switch>
          </>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default Router;
