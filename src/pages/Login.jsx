import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    loading: false,
    redirect: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleUser = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { name, loading, redirect } = this.state;
    const three = 3;

    return (
      <div data-testid="page-login">

        <input
          type="text"
          data-testid="login-name-input"
          name="name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length < three }
          onClick={ this.handleUser }
        >
          Entrar
        </button>
        { loading && <p>Carregando...</p>}
        {redirect && <Redirect to="/search" />}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
