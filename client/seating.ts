import { put, post } from 'superagent';

// ToDo :: This URL should come from the controller's config.
const serviceUrl = 'http://localhost:3001';

interface Seat {
  id: number;
  screenId: number;
  position: string;
  booked: boolean;
  locked: boolean;
  filmId: number;
  timeSlot: string;
  updatedAt: string;
  selected: boolean;
}

export interface ObjectToPost {
  name: string;
  email: string;
  seats: Seat[];
}

export const putSeatingStatus = async (
  seatPosition: string,
  newLockedStatus: string
): Promise<boolean> => {
  try {
    const outcome = await put(
      `${serviceUrl}/seating/${seatPosition}/${newLockedStatus}`
    );

    if (!outcome) throw outcome;

    return true;
  } catch (err) {
    console.error('There was an error in getAllFilmsWithTimes()', err);
    // not throwing here, so that the function can be called without wrapping it in a try/catch
    return false;
  }
};

export const postBooking = async (bodyToPost: ObjectToPost): Promise<any> => {
  try {
    const outcome = await post(`${serviceUrl}/seating/`).send(bodyToPost);

    if (!outcome) throw outcome;

    return outcome;
  } catch (err) {
    console.error('There was an error in postBooking()', err);
    // not throwing here, so that the function can be called without wrapping it in a try/catch
    return undefined;
  }
};
