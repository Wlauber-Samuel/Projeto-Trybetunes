import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorite extends React.Component {
  state = {
    music: [],
    loading: false,
  };

  componentDidMount() {
    this.favoriteMusic();
  }

  favoriteMusic = () => {
    this.setState({
      loading: true,
    }, async () => {
      const getFavoriteMusics = await getFavoriteSongs();
      this.setState({
        music: getFavoriteMusics,
        loading: false,
      });
    });
  };

  render() {
    const { music, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? (<Carregando />)
          : music.map((musics) => (
            <MusicCard
              favoriteMusic={ this.favoriteMusic }
              music={ musics }
              key={ music.trackId }
            />
          ))}
      </div>

    );
  }
}

export default Favorite;
