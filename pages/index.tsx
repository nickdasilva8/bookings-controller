import { getSnapshot, applySnapshot } from 'mobx-state-tree';

import { getAllFilms } from '../client/films';
import { initializeStore } from '../store';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FilmSelection from '../components/FilmSelection';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Header />
      <FilmSelection title="Lets start..." linkForward="/seat-selection" />
      <Footer />
    </>
  );
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps() {
  const films = await getAllFilms();
  const store = initializeStore();

  await store.setFilms(films);

  return { props: { initialState: getSnapshot(store) } };
}
