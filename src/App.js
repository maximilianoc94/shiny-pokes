import React from 'react';
import { Router } from '@reach/router';
import CardList from './components/card-list';
import Contact from './components/contact';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router>
          <CardList path="/" />
          <Contact path="/contacto/" />
        </Router>
      </main>
    </>
  );
}

export default App;
