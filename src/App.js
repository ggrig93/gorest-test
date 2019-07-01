import React from 'react'; 
import { Route, Switch } from "react-router-dom";
import Home from './container/Home/Home';
import "./App.css";
import UserInfo from './container/UserInfo/UserInfo';
import NewUser from './container/NewUser/NewUser';

function App() {
  return (
    <div className="App">
      {/* All routes  */}
      <Switch>
        <Route path="/users/:id/edit" render={() => <NewUser edit={true} />} />
        <Route path="/users/new" component={NewUser} />
        <Route path="/users/:id" component={UserInfo} />
        <Route path="/page/:page" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;