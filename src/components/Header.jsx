import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

export default class Header extends Component {
  state = {
    loading: true,
    nameUser: '',
  };

  async componentDidMount() {
    // async () => {
    const data = await getUser();
    this.setState({
      nameUser: data.name,
      loading: false,
    });
    // };
  }

  render() {
    const { nameUser, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisar
              </Link>
            </li>

            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>

          </ul>
        </nav>
        { loading ? <Carregando /> : <p data-testid="header-user-name">{ nameUser }</p> }
      </header>
    );
  }
}
