import { getSnapshot } from 'mobx-state-tree';
import dayjs from 'dayjs';

import { getAllFilmsWithTimes } from '../client/films';
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

export async function getServerSideProps() {
  const today = dayjs().format('YYYY-MM-DD');
  const films = await getAllFilmsWithTimes(today);

  const store = initializeStore(null);

  await store.setFilms(films);

  return { props: { initialState: getSnapshot(store) } };
}
