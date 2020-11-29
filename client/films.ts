import { get } from 'superagent';
import dayjs from 'dayjs';

// ToDo :: This URL should come from the controller's config.
const serviceUrl = 'http://localhost:3001';

export const getAllFilmsWithTimes = async (
  date: string | Date
): Promise<any> => {
  try {
    const outcome = await get(
      `${serviceUrl}/films/list-with-time/${dayjs(date).format('YYYY-MM-DD')}`
    );

    // I usually assign the parsed value so it can be logged as debug or modified further by the controller
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
  timeSlot: string,
  date: string
) => {
  try {
    const outcome = await get(
      `${serviceUrl}/films/${filmId}/${timeSlot}/${dayjs(date).format(
        'YYYY-MM-DD'
      )}`
    );
    const parsedOutcome = JSON.parse(outcome?.text);

    // ToDo :: This is the cause of an issue where if you lock a set, refresh the page you are then locked out of your seat.
    // ToDo :: There should be a way to make mobx value its existing state before  merging selected into it.
    const modifiedOutcomeForUi = parsedOutcome.map((seat) => {
      seat.selected = false;
      return seat;
    });

    return modifiedOutcomeForUi;
  } catch (err) {
    console.error('There was an error in getAllSeatsByFilmAndTime()', err);
    return undefined;
  }
};
