import React, { Component } from 'react';
import propTypes from 'prop-types';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isFavorite: false,
  };

  async componentDidMount() {
    this.setState({
      isFavorite: await this.favoriteSong(),
    });
  }

  handleChange = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ loading: true });

    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      isFavorite: checked,
      loading: false,
    });
  };

  favoriteSong = async () => {
    const { music: { trackId } } = this.props;
    const favorite = await getFavoriteSongs();
    return favorite.map((music) => music.trackId).includes(trackId);
  };

  render() {
    const { music } = this.props;
    const { loading, isFavorite } = this.state;
    const { music: { trackId },
      favoriteMusic,
    } = this.props;

    return (
      <div>
        { loading ? (<Carregando />
        ) : (
          <>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ music.trackId }>
              <input
                type="checkbox"
                name="favorite"
                id={ trackId }
                checked={ isFavorite }
                onChange={ this.handleChange }
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ favoriteMusic }
              />
              Favorita
            </label>

          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackId: propTypes.string,
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }),
}.isRequired;
