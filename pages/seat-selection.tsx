import Header from '../components/Header';
import Footer from '../components/Footer';
import SeatSelection from '../components/SeatSelection';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function SeatSelectionPage() {
  return (
    <>
      <Header />
      <SeatSelection
        title="Pick a seat"
        linkForward="/confirmation"
        linkPrevious="/"
      />
      <Footer />
    </>
  );
}
