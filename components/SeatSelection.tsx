import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  FormText
} from 'reactstrap';
import { observer } from 'mobx-react-lite';

import Link from 'next/link';

import { IStore, useStore } from '../store';

import YouAreWatching from './YouAreWatching';

interface IOwnProps {
  store?: IStore;
  title: string;
  linkForward: string;
  linkPrevious: string;
}

const SeatSelection: React.FC<IOwnProps> = observer((props) => {
  const {
    films,
    setFilmChoice,
    setFilmTime,
    filmChoice,
    selectDate,
    selectedDate
  } = useStore('');

  return (
    <Container className="main-body mt-3 mb-3">
      <Row>
        <Col sm={12} md={6}>
          <h1>{props.title}</h1>
          <Form>
            <FormGroup>
              <Label for="films-list">Select a seat</Label>
              <FormText>
                Selecting a seat will verify the seats availability in case
                another customer has locked it during the process of you
                selecting yours.
              </FormText>

              <p>something</p>
              <p>something</p>
              <p>something</p>
            </FormGroup>
          </Form>
        </Col>
        <Col sm={12} md={6}>
          <YouAreWatching />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <div className="text-right">
            <Link href={props.linkPrevious}>
              <a className="btn btn-custom pull-right" role="button">
                Previous
              </a>
            </Link>{' '}
            <Link href={props.linkForward}>
              <a className="btn btn-custom pull-right" role="button">
                Continue
              </a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default SeatSelection;
