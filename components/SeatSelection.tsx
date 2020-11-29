import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../client/fetcher';
import { Container, Row, Col, Label, FormText } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import { IStore, useStore } from '../store';
import YouAreWatching from './YouAreWatching';

import 'bootstrap/dist/css/bootstrap.min.css';

interface IOwnProps {
  store?: IStore;
  title: string;
  linkForward: string;
  linkPrevious: string;
}

const SeatSelection: React.FC<IOwnProps> = observer((props) => {
  const {
    setSeatsForFilmTime,
    selectSeat,
    filmChoice,
    selectedTime,
    seatsForTime
  } = useStore('');

  const secondsToMilliseconds = (seconds: number) => seconds * 1000;

  // this handles getting new data in intervals.
  const { data, error } = useSWR(
    `/api/films/${filmChoice}/${selectedTime}`,
    fetcher,
    { refreshInterval: secondsToMilliseconds(30) }
  );

  useEffect(() => {
    const mergedResults = data?.map((seat, index) => {
      const seatClone = { ...seat };

      if (seatsForTime[index]?.selected) {
        seatClone.selected = true;
        seatClone.locked = false;
      }

      return seatClone;
    });

    setSeatsForFilmTime(mergedResults);
  }, [data]);

  const handleClick = (e: any): void => {
    e.preventDefault();
    const [seatId, seatPosition, lockedState] = e.target.value.split('-');

    selectSeat(seatPosition);
    updateSeatStatus(seatId, lockedState);
  };

  const updateSeatStatus = async (
    seatPosition: string,
    lockedState: string
  ) => {
    try {
      await fetch(`/api/seating/${seatPosition}/${lockedState}`, {
        credentials: 'include',
        method: 'PUT'
      });
    } catch (err) {
      console.error('Error updating seat selection');
      // you can do something in the UI here, I'm just failing silently.
    }
  };

  const selectedSeatIds = [];

  seatsForTime.forEach((seat) => {
    if (seat.selected) {
      selectedSeatIds.push(seat.position);
    }
  });

  const chunkSize = 3;
  const chunkedSeats = seatsForTime?.reduce((all, one, i) => {
    const ch = Math.floor(i / chunkSize);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);

  const seats = chunkedSeats?.map((chunk, index) => {
    return (
      <div key={`seat-row-${index}`} className="seat-row mb-2">
        {chunk.map((seat, index) => {
          let disableSeat = false;

          // this will allow user A to unselect a seat they've selected, which will show as locked to user B.
          if (seat.selected) {
            disableSeat = false;
          } else if (seat.booked || seat.locked) {
            disableSeat = true;
          }

          return (
            <button
              type="submit"
              key={`${seat.position}`}
              onClick={handleClick}
              value={`${seat.id}-${seat.position}-${!seat.selected}`}
              disabled={disableSeat}
              className={`btn ${
                seat.selected ? 'btn-success' : 'btn-primary'
              }`}>
              {seat.position}
            </button>
          );
        })}
      </div>
    );
  });

  return (
    <Container className="main-body mt-3 mb-3">
      <Row>
        <Col sm={12} md={6} className="mb-3">
          <h1>{props.title}</h1>

          <Label for="films-list">Select a seat</Label>
          <FormText>
            Selecting a seat will verify the seats availability in case another
            customer has locked it during the process of you selecting yours.
          </FormText>
          <div className="mt-1 screen-direction">
            screen
            <span />
          </div>
          <div className="pt-3 pb-3">{seats}</div>
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
                className={`btn ${
                  selectedSeatIds?.length > 0 ? 'btn-custom' : 'disabled'
                } pull-right `}
                role="button">
                Continue
              </a>
            </Link>
          </div>
          {selectedSeatIds?.length === 0 && (
            <FormText className="text-right">
              You must select at least one seat before you can continue.
            </FormText>
          )}
        </Col>
      </Row>
    </Container>
  );
});

export default SeatSelection;
