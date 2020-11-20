const temp = [
  {
    id: '1',
    name: 'Happy Gilmore'
  },
  {
    id: '2',
    name: 'Deadpool'
  }
];

export default function handler(req, res) {
  return res.status(200).json(temp);
}
