import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          <Link className="navbar-brand" to="/">
            Slack 2.0
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Notas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Crear una nota</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" to="/user">Crear un usuario</Link>
              </li>
            </ul>

        </div>
        </div>
      </nav >

    )
  }
}
