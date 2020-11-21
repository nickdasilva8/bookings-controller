import Header from '../components/Header';
import Footer from '../components/Footer';
import FilmSelection from '../components/FilmSelection';

export default function SeatSelection() {
  return (
    <>
      <Header />
      <FilmSelection title="Pick a seat" linkTo="/" />

      <Footer />
    </>
  );
}
