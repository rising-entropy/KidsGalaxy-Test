import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Main from './Main/Main'

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route exact path="/" component={Main}></Route>   
          </Switch>
      </Router>
    </div>
  );
}

export default App;
