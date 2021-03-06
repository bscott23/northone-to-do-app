import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      title: "",
      description: "",
      status: "",
      dueDate: new Date(),
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("/users/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeDueDate(date) {
    this.setState({
      dueDate: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      username: this.state.username,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      due_date: this.state.dueDate
    };

    console.log(task);

    axios
      .post("/tasks/add", task)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Add Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date: </label>
            <div>
              <DatePicker
                selected={this.state.dueDate}
                onChange={this.onChangeDueDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
