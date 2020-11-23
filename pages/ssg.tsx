import { getSnapshot } from 'mobx-state-tree';
import SampleComponent from '../components/SampleComponent';
import { initializeStore } from '../store';

export default function Ssg() {
  return <SampleComponent title={'SSG Page'} linkTo="/" />;
}

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export async function getServerSideProps() {
  const store = initializeStore();

  store.update();
  // store.getFilms();

  return { props: { initialState: getSnapshot(store) } };
}
