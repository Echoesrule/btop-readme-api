import { btopSvg } from '../lib/btop-svg.js';
import { getSimulation } from '../lib/simulation.js';

export default function handler(req, res) {
  const data = getSimulation();
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).send(btopSvg(data));
}