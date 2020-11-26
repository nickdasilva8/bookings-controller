import { getAllFilmsWithTimes } from '../../client/films';

export default async function handler(req, res) {
  try {
    const films = await getAllFilmsWithTimes();

    if (!films) throw undefined;

    res.status(200).send(films);
  } catch (err) {
    res.status(err?.status ?? 500).send('Error getting all films.');
  }
}
