import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Pages/Home';
import { LoginPage } from './components/Pages/LoginPage';
import { ChoicePage } from './components/Pages/ChoicePage';
import { SendPage } from './components/Pages/SendPage';
import { RecievePage } from './components/Pages/RecievePage';
import { UserCreationPage } from './components/Pages/UserCreationPage';





import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/LoginPage' component={LoginPage} />
            <Route path='/ChoicePage' component={ChoicePage} />
            <Route path='/SendPage' component={SendPage} />
            <Route path='/RecievePage' component={RecievePage} />
            <Route path='/UserCreationPage' component={UserCreationPage} />

            
      </Layout>
    );
  }
}
