async function fetchData(url) {
  try {
    const response = await fetch(url || 'https://pokeapi.co/api/v2/pokemon').then(
      resp => resp.json()
    );
    return response;
  } catch (error) {
    return 'Woops...';
  }
}

export { fetchData };
