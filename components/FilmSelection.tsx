import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { observer } from 'mobx-react-lite';
import DayPicker from 'react-day-picker';

import Link from 'next/link';

import { IStore, useStore } from '../store';

import YouAreWatching from './YouAreWatching';

import 'react-day-picker/lib/style.css';

interface IOwnProps {
  store?: IStore;
  title: string;
  linkForward: string;
}

const FilmSelection: React.FC<IOwnProps> = observer((props) => {
  const {
    films,
    setFilmChoice,
    setFilmTime,
    filmChoice,
    selectDate,
    selectedDate
  } = useStore('');

  const filmsList = [];
  const showingTimes = [];

  const selectFilm = (e) => {
    setFilmChoice(e.target.value);
  };

  const selectTime = (e) => {
    setFilmTime(e.target.value);
  };

  // list films
  films.forEach((film, index) =>
    filmsList.push(
      <option key={film.id} value={`${film.id}-${index}`}>
        {film.name}
      </option>
    )
  );

  // list showing times for selected film
  films.forEach((film, index) => {
    if (film.id === filmChoice) {
      film.showingTimes.forEach((time, index) =>
        showingTimes.push(
          <option key={`${time}${index}`} value={time}>
            {time}
          </option>
        )
      );
    }
  });

  // get date 7 days in the future
  // this should come from the client's config file
  const limit = 7;
  const date = new Date();
  const daysInTheFuture = date.setTime(
    date.getTime() + limit * 24 * 60 * 60 * 1000
  );

  return (
    <Container className="main-body mt-3 mb-3">
      <Row>
        <Col sm={12} md={6}>
          <h1>{props.title}</h1>
          <Form>
            <FormGroup>
              <Label for="films-list">Select a film</Label>
              <Input
                type="select"
                name="films-list"
                id="films-list"
                defaultValue={1}
                onChange={(e) => selectFilm(e)}>
                {filmsList}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="showings-times">Select a time</Label>
              <Input
                type="select"
                name="showings-times"
                id="showings-times"
                onChange={(e) => selectTime(e)}>
                {showingTimes}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="date">Select a date</Label>
              <FormText>
                Dates can only be selected for up to 7 days in the future.
              </FormText>
              <DayPicker
                selectedDays={selectedDate}
                onDayClick={selectDate}
                disabledDays={[
                  {
                    after: new Date(daysInTheFuture),
                    before: new Date()
                  }
                ]}
              />
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

export default FilmSelection;
