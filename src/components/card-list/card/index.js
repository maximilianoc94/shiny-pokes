import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import styles from './card.module.scss';

function Card({ name, img }) {
  const [error, setError] = useState(false);
  return (
    <div className={styles.card}>
      {error ? (
        <span className={[styles.name, styles.imgSize].join(' ')}>No Shiny</span>
      ) : (
        <LazyLoadImage
          onError={() => { setError(true); }}
          src={img}
          alt={name}
          width={96}
          height={96}
        />
      )}
      <span className={styles.name}>{name}</span>
    </div>
      );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default Card;
