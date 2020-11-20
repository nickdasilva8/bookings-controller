import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';

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
            <h1>House of Reel</h1>
            <p>Films, films and more films.</p>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
