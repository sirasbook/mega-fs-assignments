import './App.css';
import { Route, Router, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Supply from "./supply/supply";
import Withdraw from './withdraw/withdraw';
import Login from './login/login';
import PrivateRoute from './components/privateroute';

function App() {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact key="login" path="/" component={Login} />
        <PrivateRoute exact key="supply" path="/supply" component={Supply} />
        <PrivateRoute exact key="withdraw" path="/withdraw" component={Withdraw} />
      </Switch>
    </Router>
  );
}

export default App;
