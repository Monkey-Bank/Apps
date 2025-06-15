import React from 'react';

const Weather = () => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const city = 'Tokyo';

  return <div>Weather</div>;
};

export default Weather;

// 5. ✅ お天気アプリ（API通信）
// OpenWeatherMapなどの無料APIを使用
// fetch / axios、非同期処理（async/await）
// APIレスポンスに対して型を定義して扱う（interface WeatherResponse {}）
