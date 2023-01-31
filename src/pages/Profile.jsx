import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    usuario: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const usuario = await getUser();
      this.setState({ usuario, loading: false });
    });
  }

  render() {
    const { usuario, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (
          <Carregando />
        ) : (
          <div>
            <img src={ usuario.image } alt="" data-testid="profile-image" />
            <h2>{ usuario.name }</h2>
            <p>{ usuario.email }</p>
            <p>{ usuario.description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
