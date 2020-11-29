import { postBooking, putSeatingStatus } from '../../../client/seating';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    try {
      const outcomeOfPost = await postBooking(body);

      if (!outcomeOfPost) throw outcomeOfPost;

      const parsedOutcome = JSON.parse(outcomeOfPost.text);
      return res.status(200).send(parsedOutcome);
    } catch (err) {
      console.error('error booking seats', err);
      return res.status(err?.status ?? 500).send('Error booking seats.');
    }
  }
}
