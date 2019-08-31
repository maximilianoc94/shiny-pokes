import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { requestPokeData } from '../../redux/actions';
import Card from './card';
import styles from './card-list.module.scss';

const PAGE_SIZE = 20;
const getImgUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
const getPageQuery = (page) => `https://pokeapi.co/api/v2/pokemon/?offset=${PAGE_SIZE * page}&limit=${PAGE_SIZE}`;

function CardList({ pokelist, requestPokeData }) {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    requestPokeData();
  }, [requestPokeData]);

  useEffect(() => {
    if (pokelist && pokelist.results) {
      setPokemons(pokelist.results.map((pokemon, i) => ({ name: pokemon.name, img: getImgUrl(PAGE_SIZE * page + i + 1) })));
      setLastPage(Math.floor(pokelist.count / PAGE_SIZE));
    }
  }, [page, pokelist]);

  function pageChange(next) {
    return () => {
      const pageDirection = next ? page + 1 : page - 1;
      setPage(pageDirection);
      requestPokeData(getPageQuery(pageDirection));
  };
  }

  return (
    <>
      <div className={styles.listWrapper}>
        {pokemons.map(({ name, img }) => (<Card key={name} name={name} img={img} />))}
      </div>
      <div className={styles.paginationWrapper}>
        {page !== 0 && <button className={[styles.btn, styles.left].join(' ')} type="button" onClick={pageChange(false)}>Anterior</button>}
        {page !== lastPage && <button className={[styles.btn, styles.right].join(' ')} type="button" onClick={pageChange(true)}>Proximo</button>}
      </div>
    </>
      );
}

function mapStateToProps(state) {
  return {
    pokelist: state.pokelist.response
  };
}

export default connect(
  mapStateToProps,
  { requestPokeData }
)(CardList);
