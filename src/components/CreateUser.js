import React, { Component } from 'react'
import axios from 'axios';
export default class CreateUser extends Component {
  state = {
    users: [], 
    username: ''
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:8080/CategoryRestService/FindAll');
    this.setState({ users: res.data.content });
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  async componentDidMount() {
    this.getUsers();
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put('http://localhost:8080/UserRestService/Add', {
      "_Nombre": this.state.username,
      "_Descripcion": this.state.username
    }
    )
    console.log(res);
    this.setState({ username: '' });
    this.getUsers();
  }

  deleteUser = async(id) => {
    const res = await axios.delete(`http://localhost:8080/NotesRestService/Delete/${id}`);
    console.log(res);
    this.getUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear un nuevo usuario</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">

                <input type="text" className="form-control" onChange={this.onChangeUsername}
                  value={this.state.username} />
              </div>

              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="list-group">
            {
              this.state.users.map(user => (
                <li className="list-group-item list-group-item-action" key={user._Id}
                  onDoubleClick={() => this.deleteUser(user._Id)}>
                  {user.username}
                </li>
              )
              )
            }
          </div>
        </div>
      </div >
    )
  }
}
