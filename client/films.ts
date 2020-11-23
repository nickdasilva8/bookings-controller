import { get } from 'superagent';

const temp = [
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

const getAllFilms = async (): Promise<any> => {
  try {
    const outcome = await get('http://localhost:3001/films');

    const parsedOutcome = JSON.parse(outcome?.text);

    return temp;

    return parsedOutcome;
  } catch (err) {
    const message = 'there was an error in getAllFilms()';

    console.log(message, err);
    // not throwing here, so that the function can be called without wrapping it in a try/catch
    return undefined;
  }
};

export { getAllFilms };
