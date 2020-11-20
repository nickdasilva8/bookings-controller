import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { IStore, useStore } from '../store';
import Clock from './Clock';

interface IOwnProps {
  store?: IStore;
  title: string;
  linkTo: string;
}

const SampleComponent: React.FC<IOwnProps> = observer((props) => {
  const { lastUpdate, light, start, stop } = useStore('');

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, [start, stop]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>{props.title}</h1>
          <Clock lastUpdate={lastUpdate} light={light} />
          <nav>
            <Link href={props.linkTo}>
              <a>Navigate</a>
            </Link>
          </nav>
        </Col>
      </Row>
    </Container>
  );
});

export default SampleComponent;
