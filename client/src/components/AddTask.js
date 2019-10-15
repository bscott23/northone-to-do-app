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
    this.onChangeLabels = this.onChangeLabels.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      title: "",
      description: "",
      status: "",
      labels: [],
      dueDate: new Date(),
      users: []
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("/users/");
        console.log(usersResponse);

        const labelsResponse = await axios.get("/labels/");
        console.log(labelsResponse);

        this.setState({
          users: usersResponse.data.map(user => user.username),
          username: usersResponse.data[0].username,
          labels: labelsResponse.data.map(label => label.label)
        })
      } catch (error) {
        console.error(error)
      }
    }
    return fetchData();
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

  onChangeLabels(e) {
    this.setState({
      labels: e.target.value
    });
  }

  onChangeDueDate(date) {
    this.setState({
      dueDate: date
    });
  }

  listLabelOptions() {
    const options = this.state.labels.map(currentLabel => {
      return (
        <option value={currentLabel} key={currentLabel._id}>
          {currentLabel}
        </option>
      );
    });

    return options.join();
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      username: this.state.username,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      labels: this.state.labels,
      due_date: this.state.dueDate
    };

    console.log(task);

    axios.post("/tasks/add", task).then(res => console.log(res.data));

    //window.location = "/taskList";
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
            <label>Labels: </label>
            <select
              ref="userInput"
              optional
              className="form-control"
              value={this.state.labels}
              onChange={this.onChangeLabels}
            >
              {this.state.labels.map(label => {
                return (
                  <option key={label} value={label}>
                    {label}
                  </option>
                );
              })}
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
