import React from 'react';
import dayjs from 'dayjs';

import { observer } from 'mobx-react-lite';

import { IStore, useStore } from '../store';
import 'react-day-picker/lib/style.css';

interface IOwnProps {
  store?: IStore;
}

const YouAreWatching: React.FC<IOwnProps> = observer((props) => {
  const {
    films,
    filmChoice,
    selectedDate,
    selectedTime,
    seatsForTime
  } = useStore('');

  const selectedFilm = films.filter(({ id }) => id === filmChoice)[0];

  const readableDate = dayjs(selectedDate).format('dddd (DD-MMM-YYYY)');

  const selectedSeatIds = [];

  seatsForTime.forEach((seat) => {
    if (seat.selected) {
      selectedSeatIds.push(seat.position);
    }
  });

  return (
    <div className="summary mb-5 p-5">
      {selectedFilm?.name && (
        <>
          <h2>This is what you're doing so far</h2>
          <p>
            You're watching <span>{selectedFilm.name}</span> at{' '}
            <span>{selectedTime}</span> on <span>{readableDate}</span>
          </p>

          {selectedSeatIds?.length > 0 && (
            <p>
              You've selected the following seats:{' '}
              {selectedSeatIds.map((id, index) => {
                return (
                  <React.Fragment key={`${id}-${index}`}>
                    {index !== 0 &&
                      index + 1 === selectedSeatIds?.length &&
                      ' and '}
                    <span>{id}</span>
                    {index + 1 !== selectedSeatIds?.length &&
                      index + 1 !== selectedSeatIds?.length - 1 &&
                      ', '}
                  </React.Fragment>
                );
              })}
            </p>
          )}
        </>
      )}
    </div>
  );
});

export default YouAreWatching;
