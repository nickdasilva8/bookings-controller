import { Container } from 'reactstrap';
import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SampleComponent from '../components/SampleComponent';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Header />
      <SampleComponent title="Index Page" linkTo="/other" />
      <Footer />
    </>
  );
}
