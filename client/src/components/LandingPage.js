import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Jumbotron from "react-bootstrap/Jumbotron";

export default class LandingPage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1 class="display-4">Welcome to CrushinTasks 🔥</h1>
        <p class="lead">
          CrushinTasks is a productivity app to help you crush those tasks.
        </p>
        <hr class="my-4" />
        <p>
          Start crushin' tasks now by adding some to your Task List. 
        </p>
        <p class="lead">
          <Link to="/addTask" className="btn btn-primary btn-lg" role="button">Crush some tasks</Link>
        </p>
      </Jumbotron>
    );
  }
}