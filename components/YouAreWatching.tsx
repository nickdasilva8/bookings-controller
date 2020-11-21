import React from 'react';
import dayjs from 'dayjs';

import { observer } from 'mobx-react-lite';

import { IStore, useStore } from '../store';
import 'react-day-picker/lib/style.css';

interface IOwnProps {
  store?: IStore;
}

const YouAreWatching: React.FC<IOwnProps> = observer((props) => {
  const { films, filmChoice, selectedDate, selectedTime } = useStore('');

  const selectedFilm = films.filter(({ id }) => id === filmChoice)[0];

  const readableDate = dayjs(selectedDate).format('dddd (DD-MMM-YYYY)');

  return (
    <div className="summary mb-5 p-5">
      <h2>This is what you're doing so far</h2>
      <p>
        You're watching <span>{selectedFilm.name}</span> at{' '}
        <span>{selectedTime}</span> on <span>{readableDate}</span>
      </p>
    </div>
  );
});

export default YouAreWatching;
