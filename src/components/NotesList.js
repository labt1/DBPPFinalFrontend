
import React, { Component } from 'react'
import axios from 'axios';
import {format} from 'timeago.js'
import {Link} from 'react-router-dom';

export default class NotesList extends Component {
  state = {
    notes: []
  }

  async componentDidMount() {
    
    this.getNotes();
  }

  getNotes = async() => {
    const res = await axios.get('http://localhost:8080//NotesRestService/FindAll');
    console.log(res);
    this.setState({ notes: res.data })

  }
  onDeleteNote = async (id) => {

    await axios.delete(`http://localhost:8080//NotesRestService/Delete/${id}`)
    
    this.getNotes();
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => 
            // eslint-disable-next-line no-unused-expressions
            <div className="col-md-4 p-2" key={note._Id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  {note._Titulo}
                  <Link className="btn btn-secondary" to={`/edit/${note._Id}`}>
                    Edit
                  </Link>
                </div>
                <div className="card-body">
                  <p>{note._Contenido}</p>
                  <p>{note._Autor}</p>
                  <p>{format(note._Fecha)}</p>

                </div>
                <div className="card-body">
                  <div className="btn btn-danger"
                  onClick={() => this.onDeleteNote(note._Id)}>
                    Delete
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
