import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { api } from '../service';
import Auth from './screens/auth';
import AuthCreate from './screens/auth-create';
import Home from './screens/home';

const App: FunctionComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              const isToken = !!localStorage.getItem('authorization-token');
              return isToken ? <Redirect to='/home' /> : <Redirect to='/auth' />;
            }}
          />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/auth-create' component={AuthCreate} />
          <Route path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
