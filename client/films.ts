import { get } from 'superagent';

// ToDo :: This URL should come from the controller's config.
const serviceUrl = 'http://localhost:3001';

export const getAllFilmsWithTimes = async (): Promise<any> => {
  try {
    const outcome = await get(`${serviceUrl}/films/list-with-time`);

    const parsedOutcome = JSON.parse(outcome?.text);

    return parsedOutcome;
  } catch (err) {
    console.error('There was an error in getAllFilmsWithTimes()', err);
    // not throwing here, so that the function can be called without wrapping it in a try/catch
    return undefined;
  }
};

export const getAllSeatsByFilmAndTime = async (
  filmId: string,
  timeSlot: string
) => {
  try {
    const outcome = await get(`${serviceUrl}/films/${filmId}/${timeSlot}`);
    const parsedOutcome = JSON.parse(outcome?.text);

    return parsedOutcome;
  } catch (err) {
    console.error('There was an error in getAllSeatsByFilmAndTime()', err);
    // not throwing here, so that the function can be called without wrapping it in a try/catch
    return undefined;
  }
};
