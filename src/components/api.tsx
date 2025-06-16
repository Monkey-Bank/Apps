import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://weather.tsukumijima.net/api/', // ベースURL
  timeout: 5000, // タイムアウト設定（ミリ秒）
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
