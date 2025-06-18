import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import WeatherCard from './WeatherCard';
import apiClient from './api';

const Weather = () => {
  interface WeatherData {
    location: {
      city: string; // 都市名
    };
    forecasts: {
      date: string;
      telop: string; // 天気の説明
      temperature: {
        max: { celsius: string | null } | null; // 最高気温（nullの場合もある）
        min: { celsius: string | null } | null; // 最低気温（nullの場合もある）
      };
      image: {
        url: string; // 天気アイコンのURL
      };
    }[];
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await apiClient.get<WeatherData>(
          '/forecast/city/130010'
        );
        console.log(response.data);
        setWeather(response.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>天気予報アプリ</h1>

      {error ? (
        // エラーがある場合はエラーメッセージを表示
        <p style={{ color: 'red' }}>{error}</p>
      ) : weather ? (
        // 天気情報が取得できた場合はWeatherCardコンポーネントにデータを渡して表示
        <div style={{ display: 'flex' }}>
          <WeatherCard
            date={weather.forecasts[0].date}
            city={weather.location.city}
            weather={weather.forecasts[0].telop}
            temperature={{
              max: weather.forecasts[0].temperature.max?.celsius || 'N/A', // 最高気温
              min: weather.forecasts[0].temperature.min?.celsius || 'N/A', // 最低気温
            }}
            iconUrl={weather.forecasts[0].image.url} // 天気アイコンのURL
          />
          <WeatherCard
            date={weather.forecasts[1].date}
            city={weather.location.city}
            weather={weather.forecasts[1].telop}
            temperature={{
              max: weather.forecasts[1].temperature.max?.celsius || 'N/A', // 最高気温
              min: weather.forecasts[1].temperature.min?.celsius || 'N/A', // 最低気温
            }}
            iconUrl={weather.forecasts[1].image.url} // 天気アイコンのURL
          />
          <WeatherCard
            date={weather.forecasts[2].date}
            city={weather.location.city}
            weather={weather.forecasts[2].telop}
            temperature={{
              max: weather.forecasts[2].temperature.max?.celsius || 'N/A', // 最高気温
              min: weather.forecasts[2].temperature.min?.celsius || 'N/A', // 最低気温
            }}
            iconUrl={weather.forecasts[2].image.url} // 天気アイコンのURL
          />
        </div>
      ) : (
        // データ取得中のローディングメッセージ
        <p>天気情報を取得中...</p>
      )}
    </div>
  );
};

export default Weather;

// 5. ✅ お天気アプリ（API通信）
// OpenWeatherMapなどの無料APIを使用
// fetch / axios、非同期処理（async/await）
// APIレスポンスに対して型を定義して扱う（interface WeatherResponse {}）

// https://envader.plus/article/520
