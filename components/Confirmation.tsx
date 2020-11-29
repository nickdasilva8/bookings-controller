import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import { IStore, useStore } from '../store';
import YouAreWatching from './YouAreWatching';

import 'bootstrap/dist/css/bootstrap.min.css';

interface IOwnProps {
  store?: IStore;
  title: string;
  linkForward: string;
  linkPrevious: string;
}

const Confirmation: React.FC<IOwnProps> = observer((props) => {
  const {
    name,
    email,
    setName,
    setEmail,
    seatsForTime,
    setBookingComplete,
    setEmailError,
    emailError,
    bookingComplete
  } = useStore('');

  const router = useRouter();

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    // remove any spaces at either end of the string
    setName(name.trim());

    // prevents "      " being submitted.
    if (!name) return;

    const selectedSeatsToPost = [];

    seatsForTime.forEach((seat) => {
      if (seat.selected) {
        selectedSeatsToPost.push({ ...seat });
      }
    });

    const bodyToPost = {
      name,
      email,
      seats: selectedSeatsToPost
    };

    try {
      const response = await fetch('/api/seating', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(bodyToPost)
      });

      if (!response.ok) throw response;

      setBookingComplete(true);
      setEmailError(false);

      // change path after 5 seconds
      setTimeout(() => {
        router.push('/', undefined, { shallow: true });
      }, 5000);
    } catch (err) {
      setEmailError(true);
      setBookingComplete(false);
    }
  };

  const validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  return (
    <Container className="main-body mt-3 mb-3">
      <Row>
        <Col sm={12} md={6}>
          <h1>{props.title}</h1>
          <Form>
            <FormGroup>
              <Label for="films-list">Your name</Label>
              <Input
                className={`${name.trim()?.length > 1 ? 'is-valid' : ''}`}
                type="text"
                name="films-list"
                id="films-list"
                value={name}
                onChange={(e) => setName(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="showings-times">Your email address</Label>
              <Input
                type="email"
                name="showings-times"
                id="showings-times"
                className={validateEmail(email) ? 'is-valid' : 'is-invalid'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Input>
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
              <a
                className={`btn btn-custom pull-right ${
                  name?.length < 2 || !validateEmail(email) ? 'disabled' : ''
                }`}
                role="button"
                onClick={handleFormSubmission}>
                Done
              </a>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          {emailError && (
            <div className="mt-3">
              <Alert color="danger">
                There was an error booking your seats. Please try again.
              </Alert>
            </div>
          )}
          {bookingComplete && (
            <div className="mt-3 clear-both">
              <Alert color="success">
                You're booking was successful. Redirecting to the start in 5
                seconds.
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
});

export default Confirmation;
