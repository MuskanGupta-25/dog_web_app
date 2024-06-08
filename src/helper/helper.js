// src/weatherService.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds`, {
      headers: {
        'x-api-key': 'live_v0GeIfqNSPvKD3yD3B9xbDwveBo0V1wgi1trzqRuJCGgAQl76ZqJBUfIG17wBWnl'
      },

    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

