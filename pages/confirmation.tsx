import Header from '../components/Header';
import Footer from '../components/Footer';
import Confirmation from '../components/Confirmation';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Header />
      <Confirmation
        title="Review and confirm your booking"
        linkForward="/"
        linkPrevious="/seat-selection"
      />
      <Footer />
    </>
  );
}
