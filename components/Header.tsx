import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Container>
        <Row>
          <Head>
            <title>House of Reel</title>
            <meta property="og:title" content="House of Reel" key="title" />
          </Head>
          <Col md={12}>
            <h1>
              <Link href="/">House of Reel</Link>
            </h1>
            <p>Films, films and more films.</p>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
