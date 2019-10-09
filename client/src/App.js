import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={LandingPage} />
        <Route path="/taskList" component={TaskList} />
        <Route path="/addTask" component={AddTask} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
