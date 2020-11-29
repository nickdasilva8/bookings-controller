import { getSnapshot } from 'mobx-state-tree';

import { getAllFilmsWithTimes } from '../client/films';
import { initializeStore } from '../store';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminFilmSelection from '../components/AdminFilmSelection';
import AdminSeatPreview from '../components/AdminSeatPreview';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function admin() {
  return (
    <>
      <Header />
      <AdminFilmSelection title="Admin overview">
        <AdminSeatPreview />
      </AdminFilmSelection>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const films = await getAllFilmsWithTimes();

  const store = initializeStore(null);

  await store.setFilms(films);

  return { props: { initialState: getSnapshot(store) } };
}
