import { useMemo } from 'react';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from 'mobx-state-tree';
import { type } from 'os';

let store: IStore | undefined;

const FilmModel = types.model({
  id: types.string,
  name: types.string,
  showingTimes: types.array(types.string)
});

interface Film {
  id: string;
  name: string;
  showingTimes: string[];
}

const tempFilms = [
  {
    id: '1',
    name: 'The Grinch',
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
    name: 'Happy Gilmore',
    showingTimes: ['10:15am', '12:15am', '2:15m', '4:15pm', '6:15pm', '8:15pm']
  },
  {
    id: '3',
    name: 'Ragnarok',
    showingTimes: ['10:30am', '1:30pm', '4:30pm', '7:30pm']
  }
];

const Store = types
  .model('NickStore', {
    lastUpdate: types.Date,
    light: false,
    filmChoice: types.string,
    films: types.array(FilmModel),
    selectedTime: types.string,
    selectedDate: types.Date
  })
  .actions((self) => {
    let timer: any;
    const start = () => {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data.
        // Pass off to another action instead (need to cast self as any
        // because typescript doesn't yet know about the actions we're
        // adding to self here)
        (self as any).update();
      }, 1000);
    };
    const update = () => {
      self.lastUpdate = new Date(Date.now());
      self.light = true;
    };

    const stop = () => {
      clearInterval(timer);
    };

    // workout how to get TS types to work with store model type
    const setFilmChoice = (filmId: string) => {
      // self.filmChoice = tempFilms[2];

      self.filmChoice = filmId;
    };

    const selectDate = (date: Date, modifiers: any = {}) => {
      if (modifiers?.disabled) {
        return;
      }
      self.selectedDate = date;
    };

    const setFilmTime = (time: string) => {
      self.selectedTime = time;
    };

    return { start, stop, update, setFilmChoice, selectDate, setFilmTime };
  });

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      lastUpdate: 0,
      films: tempFilms,
      filmChoice: tempFilms[0].id,
      selectedDate: new Date(),
      selectedTime: tempFilms[0].showingTimes[0]
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
