import { getSnapshot } from 'mobx-state-tree';
import { getAllFilmsWithTimes } from '../client/films';
import SampleComponent from '../components/SampleComponent';
import { initializeStore } from '../store';

export default function Ssr() {
  return <SampleComponent title={'SSR Page'} linkTo="/" />;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps() {
  const films = await getAllFilmsWithTimes();
  const store = initializeStore({ ...films });

  store.update();
  // store.getFilms();

  return { props: { initialState: getSnapshot(store) } };
}
