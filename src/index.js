import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Bin from './Bin';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';


export const GlobalContext = React.createContext();

const routing = (
    <Router>
      <div>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Bin">Bin</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Bin" component={Bin} />
            <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
