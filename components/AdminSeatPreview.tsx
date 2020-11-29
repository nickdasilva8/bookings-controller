import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../client/fetcher';
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

import 'bootstrap/dist/css/bootstrap.min.css';

interface IOwnProps {
  store?: IStore;
}

const AdminSeatPreview: React.FC<IOwnProps> = observer((props) => {
  const {
    setSeatsForFilmTime,
    selectSeat,
    filmChoice,
    selectedTime,
    seatsForTime,
    selectedDate
  } = useStore('');

  const secondsToMilliseconds = (seconds: number) => seconds * 1000;

  // this handles getting new data in intervals.
  const {
    data,
    error
  } = useSWR(
    `/api/films/${filmChoice}/${selectedTime}/${selectedDate}`,
    fetcher,
    { refreshInterval: secondsToMilliseconds(30) }
  );

  useEffect(() => {
    setSeatsForFilmTime(data);
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
      await fetch(
        `/api/seating/${seatPosition}/${lockedState}/${selectedDate}`,
        {
          credentials: 'include'
        }
      );
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
          return (
            <button
              type="submit"
              key={`${seat.position}`}
              onClick={(e) => e.preventDefault()}
              value={`${seat.id}-${seat.position}-${!seat.selected}`}
              disabled={seat.booked || seat.locked}
              className={`seat-preview btn ${
                seat.booked || seat.locked ? 'btn-warning' : 'btn-success'
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
      <Label for="films-list">Select a seat</Label>
      <FormText>
        <ul>
          <li>
            <span className="key available"></span>
          </li>
          <li>
            <span className="key unavailable"></span>
          </li>
        </ul>
      </FormText>
      <div className="mt-1 screen-direction">
        screen
        <span />
      </div>
      <div className="pt-3 pb-3">{seats}</div>
    </Container>
  );
});

export default AdminSeatPreview;
