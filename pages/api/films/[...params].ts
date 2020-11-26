import { getAllSeatsByFilmAndTime } from '../../../client/films';

export default async function handler(req, res) {
  const {
    query: { params }
  } = req;
  try {
    const films = await getAllSeatsByFilmAndTime(params[0], params[1]);

    if (!films) throw undefined;

    res.status(200).send(films);
  } catch (err) {
    const message = `Error getting all seats for film '${params[0]}' at ${params[1]}.`;

    console.error(message, err);
    // log the error above, and return a simple message to the client (in the network tab)
    res.status(err?.status ?? 500).send(message);
  }
}
