import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import List from './pages/List';
import Detail from './pages/Detail';

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Router history={createBrowserHistory}>
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/detail/:id" component={Detail} />
            {/* <Route path="/404" component={NotFoundPage} /> */}
            {/* 其他重定向到 404 */}
            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}
export default App;
