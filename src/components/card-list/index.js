import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { requestPokeData, storePage } from '../../redux/actions';
import Card from './card';
import styles from './card-list.module.scss';

const PAGE_SIZE = 20;
const POKE_COUNT = 807;
const getImgUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
const getPageQuery = (page) => `https://pokeapi.co/api/v2/pokemon/?offset=${PAGE_SIZE * page}&limit=${PAGE_SIZE}`;

function CardList({ pokelist, requestPokeData, storePage, page }) {
  const [pokemons, setPokemons] = useState([]);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    requestPokeData();
  }, [requestPokeData]);

  useEffect(() => {
    if (pokelist && pokelist.results) {
      setPokemons(pokelist.results.map((pokemon, i) => {
        if (PAGE_SIZE * page + i + 1 < POKE_COUNT) {
          return {
              name: pokemon.name,
              img: getImgUrl(PAGE_SIZE * page + i + 1)
            };
        }
        return undefined;
      }).filter(poke => poke));
      setLastPage(Math.floor(POKE_COUNT / PAGE_SIZE));
    }
  }, [page, pokelist]);

  function pageChange(next) {
    return () => {
      const pageDirection = next ? page + 1 : page - 1;
      storePage(pageDirection);
      requestPokeData(getPageQuery(pageDirection));
  };
  }

  function pageChangeByIndex(index) {
    return () => {
      storePage(index - 1);
      requestPokeData(getPageQuery(index - 1));
    };
  }

  return (
    <>
      <div className={styles.listWrapper}>
        {pokemons.map(({ name, img }) => (<Card key={name} name={name} img={img} />))}
      </div>
      <div className={styles.paginationWrapper}>
        <button className={[styles.btn, page === 0 ? styles.hide : ''].join(' ')} type="button" onClick={pageChange(false)}>Anterior</button>
        <div className={styles.indexes}>
          {[...Array(5)].map((_, i) => {
            const pageIndex = -1 + i + page;
            if (pageIndex > 0) {
              return <span className={[styles.pageIndex, page + 1 === pageIndex ? styles.active : ''].join(' ')} key={`page-${pageIndex}`} onClick={pageChangeByIndex(pageIndex)}>{pageIndex}</span>;
            }
            return null;
          })}
        </div>
        <button className={[styles.btn, page === lastPage ? styles.hide : ''].join(' ')} type="button" onClick={pageChange(true)}>Próximo</button>
      </div>
    </>
      );
}

function mapStateToProps(state) {
  return {
    pokelist: state.pokelist.response,
    page: state.pagination.page
  };
}

export default connect(
  mapStateToProps,
  { requestPokeData, storePage }
)(CardList);
