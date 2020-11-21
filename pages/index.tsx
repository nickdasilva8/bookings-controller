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
