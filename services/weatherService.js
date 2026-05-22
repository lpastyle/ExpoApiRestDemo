import axios from 'axios';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';

const weatherClient = axios.create({
  baseURL: OPENWEATHER_BASE_URL,
  params: {
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
    lang:  'fr',
  },
});

export async function fetchMeteoParVille(ville) {
  try {
    const { data } = await weatherClient.get('/weather', {
      params: { q: ville },
    });
    return { data, erreur: null };
  } catch (e) {
    const status = e.response?.status;
    let erreur;
    if (status === 404)      erreur = `Ville "${ville}" introuvable`;
    else if (status === 401) erreur = 'Clé API invalide ou non activée';
    else                     erreur = e.message;
    return { data: null, erreur };
  }
}
