import React, { Component } from "react";
import axios from "axios";
import Datapicker from "react-datepicker";
// import
import "react-datepicker/dist/react-datepicker.css";
export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    date: new Date(),
    title: "",
    content: "",
    editing: false,
    _id: "",
  };
  async componentDidMount() {
    const res = await axios.get("http://localhost:8080/UserRestService/FindAll");
    this.setState({
      users: res.data.map((user) => user._Nombre),
      userSelected: res.data[0].username,
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        `http://localhost:8080/NotesRestService/FindById/${this.props.match.params.id}`
      );
      const note = res.data;

      this.setState({
        title: note._Titulo,
        content: note._Contenido,
        userSelected: note._Autor,
        date: new Date(note._Fecha),
        editing: true,
        _id: this.props.match.params.id,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      "_Titulo": this.state.title,
      "_Contenido": this.state.content,
      "_Fecha": this.state.date,
      "_Autor": this.state.userSelected
    };

    const newNote1 = {
      "_Id": this.state._id,
      "_Titulo": this.state.title,
      "_Contenido": this.state.content,
      "_Fecha": this.state.date,
      "_Autor": this.state.userSelected
    };

    console.log(newNote);
    console.log(this.state.editing);
    if (this.state.editing) {
      await axios.post(
        `http://localhost:8080/NotesRestService/Update`,
        newNote1
      );
    } else {
      await axios.put("http://localhost:8080/NotesRestService/Add", newNote);
    }

    this.props.history.push("/");
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    // this.setState({
    //   userSelected: e.target.value,
    // });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h3 className="text-center">Crea una nota</h3>
          {/*     Select user */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              value={this.setState.userSelected}
              onChange={this.onInputChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="Description"
              value={this.state.content}
              onChange={this.onInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <Datapicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
