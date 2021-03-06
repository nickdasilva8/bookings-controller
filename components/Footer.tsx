import { Container, Row, Col } from 'reactstrap';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={12}>
            <h1>I am the Footer</h1>
            <nav>
              <span>
                <a href="#">About us</a>
              </span>
              <span>
                <a href="#">Terms and Conditions</a>
              </span>
              <span>
                <Link href="admin">
                  <a>Admin</a>
                </Link>
              </span>
              <span>
                <a target="_blank" href="https://youtu.be/eUrkWecExwo?t=47">
                  Woodhouse
                </a>
              </span>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
