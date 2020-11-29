import { getAllSeatsByFilmAndTime } from '../../../client/films';
import { putSeatingStatus } from '../../../client/seating';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const {
        query: { params }
      } = req;

      let updateResult = await putSeatingStatus(params[0], params[1]);

      if (!updateResult) throw undefined;

      res.status(200).send(updateResult);
    } catch (err) {
      const {
        query: { params }
      } = req;

      const message = `Error updating seat status '${params[0]}' at ${params[1]}.`;

      console.error(message, err);
      // log the error above, and return a simple message to the client (in the network tab)
      res.status(err?.status ?? 500).send(message);
    }
  } else {
    const {
      query: { params }
    } = req;
    try {
      let films = await getAllSeatsByFilmAndTime(params[0], params[1]);

      if (!films) throw undefined;

      res.status(200).send(films);
    } catch (err) {
      const message = `Error getting all seats for film '${params[0]}' at ${params[1]}.`;

      console.error(message, err);
      // log the error above, and return a simple message to the client (in the network tab)
      res.status(err?.status ?? 500).send(message);
    }
  }
}
