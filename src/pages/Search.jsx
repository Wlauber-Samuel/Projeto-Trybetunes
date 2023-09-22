import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    loading: false,
    nameArtist: '',
    input: '',
    albuns: [],
    vazio: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  searchArtist = (artist) => {
    this.setState({
      input: '',
      loading: true,
      nameArtist: artist,
    }, async () => {
      const albuns = await searchAlbumsAPI(artist);

      this.setState({
        albuns,
        loading: false,
      });
    });
  };

  // componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   }, async () => {
  //     const data = await getUser();
  //     this.setState({
  //       name: data.name,
  //       loading: false,
  //     });
  //   });
  // }

  render() {
    const {
      loading,
      nameArtist,
      input,
      albuns,
      vazio,
    } = this.state;

    if (vazio) return <p>Nenhum álbum foi encontrado</p>;
    if (loading) return <Carregando />;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="input"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
          value={ input }
        />

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ input.length < 2 }
          onClick={ () => this.searchArtist(input) }
        >
          Pesquisar
        </button>
        <h4>{ `Resultado de álbuns de: ${nameArtist}` }</h4>
        { albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          albuns.map((element, index) => (
            <div key={ index }>
              <img src={ element.artworkUrl100 } alt="foto-album" />
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                { element.collectionName }
              </Link>
            </div>
          ))

        ) }
      </div>
    );
  }
}

export default Search;
