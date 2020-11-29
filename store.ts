import { useMemo } from 'react';

import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from 'mobx-state-tree';

let store: IStore | undefined;

const FilmModel = types.model({
  id: types.string,
  name: types.string,
  showingTimes: types.array(types.string)
});

const SeatModel = types.model({
  id: types.integer,
  screenId: types.integer,
  position: types.string,
  booked: types.boolean,
  locked: types.boolean,
  filmId: types.integer,
  timeSlot: types.string,
  updatedAt: types.string,
  selected: types.boolean
});

interface Film {
  id: string;
  name: string;
  showingTimes: string[];
}

// I ran into issues with trying to get the default blob to be the first value it gets from the API call when
// initializeStore() is called.
export const tempFilms = [
  {
    id: '1',
    name: 'Frozen',
    showingTimes: [
      '10:00am',
      '11:30am',
      '1:00pm',
      '2:30pm',
      '4:00pm',
      '5:30pm',
      '7:00pm',
      '8:30pm'
    ]
  },
  {
    id: '2',
    name: '22 Happy Gilmore',
    showingTimes: ['10:15am', '12:15am', '2:15m', '4:15pm', '6:15pm', '8:15pm']
  },
  {
    id: '3',
    name: '33 Ragnarok',
    showingTimes: ['10:30am', '1:30pm', '4:30pm', '7:30pm']
  }
];

const Store = types
  .model('BookingStore', {
    filmChoice: types.optional(types.string, ''),
    films: types.array(FilmModel),
    selectedTime: types.optional(types.string, ''),
    selectedDate: types.Date,
    seatsForTime: types.array(SeatModel),
    name: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    emailError: types.optional(types.boolean, false),
    bookingComplete: types.optional(types.boolean, false)
  })
  .actions((self) => {
    const setFilmChoice = (usersFilmChoice: string) => {
      const [filmId, arrayPosition] = usersFilmChoice.split('-');

      // set the film ID
      self.filmChoice = filmId;
      // set the time to the first time in the array
      // ToDo :: You could do something and check the time and select the next available time from now to improve the UX.
      self.selectedTime = self.films[arrayPosition].showingTimes[0];
    };

    const selectDate = (date: Date, modifiers: any = {}): void => {
      if (modifiers?.disabled) {
        return;
      }

      self.selectedDate = date;
    };

    const setFilmTime = (time: string): void => {
      self.selectedTime = time;
    };

    const setFilms = (films: any): void => {
      self.films = films;
    };

    const setSeatsForFilmTime = (seats: any): void => {
      self.seatsForTime = seats;
    };

    // this function is not really efficient.
    const selectSeat = (seatIdWithIndex: string): void => {
      const [seatId] = seatIdWithIndex.split('-');

      const copyOfSeats = [];
      self.seatsForTime.forEach((seat) => copyOfSeats.push({ ...seat }));

      const selectedSeat = copyOfSeats.find((seat) => seat.position === seatId);

      selectedSeat.selected = !selectedSeat.selected;

      setSeatsForFilmTime(copyOfSeats);
    };

    const setName = (name: string) => (self.name = name);

    const setEmail = (email: string) => (self.email = email);

    const setEmailError = (isError: boolean) => (self.emailError = isError);
    const setBookingComplete = (isComplete: boolean) =>
      (self.bookingComplete = isComplete);

    return {
      setFilmChoice,
      selectDate,
      setFilmTime,
      setFilms,
      setSeatsForFilmTime,
      selectSeat,
      setName,
      setEmail,
      setEmailError,
      setBookingComplete
    };
  });

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      films: tempFilms,
      filmChoice: tempFilms[0].id,
      selectedDate: new Date(),
      selectedTime: tempFilms[0].showingTimes[0],
      name: '',
      email: ''
    });

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
