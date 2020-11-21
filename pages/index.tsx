import Header from '../components/Header';
import Footer from '../components/Footer';
import FilmSelection from '../components/FilmSelection';
import SampleComponent from '../components/SampleComponent';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Header />
      <FilmSelection title="Lets start..." linkTo="/seat-selection" />
      {/* <SampleComponent title="Index Page" linkTo="/other" /> */}
      <Footer />
    </>
  );
}
