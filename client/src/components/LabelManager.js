import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const Label = props => (
  <tr>
    <td>{props.label.label}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteLabel(props.label._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class CreateLabelModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.deleteLabel = this.deleteLabel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      label: "",
      savedLabels: [],
      modalShow: false
    };
  }

  componentDidMount() {
    axios
      .get("/labels/")
      .then(response => {
        this.setState({ savedLabels: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    console.log("component mounted");
  }

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onModalShow(e) {
    this.setState({
      modalShow: true
    });
  }

  onModalClose(e) {
    this.setState({
      modalShow: false
    });
  }

  deleteLabel(id) {
    axios.delete("/labels/" + id).then(res => console.log(res.data));
    this.setState({
      savedLabels: this.state.savedLabels.filter(el => el._id !== id)
    });
  }

  createLabelsList() {
    return this.state.savedLabels.map(selectedLabel => {
      return (
        <Label
          label={selectedLabel}
          deleteLabel={this.deleteLabel}
          key={selectedLabel._id}
        />
      );
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newLabel = {
      label: this.state.label
    };

    console.log(newLabel);

    axios.post("/labels/add", newLabel).then(res => console.log(res.data));

    this.setState({
      savedLabels: this.state.savedLabels.concat(newLabel)
    });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.onModalShow}>
          Manage Labels
        </Button>

        <Modal show={this.state.modalShow} onHide={this.onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Label Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder='Examples: "work", "school"'
                onChange={this.onChangeLabel}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.onSubmit}>
                  Create
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <div>
              <table className="table">
                <tbody>{this.createLabelsList()}</tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
