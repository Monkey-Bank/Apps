import axios, { isAxiosError, AxiosError } from 'axios';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

const WeatherExtra = () => {
  // interface Weather {
  //   weather: {
  //     name: string;
  //     main: {
  //       temp: string;
  //       temp_max: string;
  //       temp_min: string;
  //     };
  //     weather: {
  //       description: string;
  //     };
  //   };
  // }

  const apiKey = import.meta.env.VITE_APP_OW_API_KEY;
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const cityValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const apiCall = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);
      console.log(response.data);
      setError(null);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          setError('入力した都市が見つかりませんでした。');
        } else {
          setError('予期せぬエラーが発生しました。');
        }
      } else {
        setError('ネットワークエラーまたは予期しないエラーです。');
      }
    }

    setCity('');
  };

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
  }, []);

  return (
    <div>
      <h1>天気予報アプリ（検索機能付き）</h1>
      <form
        onSubmit={(e) => {
          apiCall(e);
        }}
      >
        <input type="text" value={city} onChange={(e) => cityValue(e)} />
        <button type="submit">検索</button>
      </form>

      {error && <p>{error}</p>}
      {weather && (
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <div
            style={{
              border: '1px solid #ccc', // カードのスタイル
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              margin: '0 auto',
            }}
          >
            <h1>{currentDate}</h1>
            <h2>{weather.name}</h2>
            <h3>現在の気温:{weather.main.temp}</h3>
            <h4>体感気温:{weather.main.feels_like}</h4>
            <p>最高気温:{weather.main.temp_max}</p>
            <p>最低気温:{weather.main.temp_min}</p>
            <p>予報:{weather.weather[0].description}</p>
          </div>
          <div
            style={{
              border: '1px solid #ccc', // カードのスタイル
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              margin: '0 auto',
            }}
          >
            <h1>{currentDate}</h1>
            <h2>{weather.name}</h2>
            <h3>現在の気温:{weather.main.temp}</h3>
            <h4>体感気温:{weather.main.feels_like}</h4>
            <p>最高気温:{weather.main.temp_max}</p>
            <p>最低気温:{weather.main.temp_min}</p>
            <p>予報:{weather.weather[0].description}</p>
          </div>
          <div
            style={{
              border: '1px solid #ccc', // カードのスタイル
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              margin: '0 auto',
            }}
          >
            <h1>{currentDate}</h1>
            <h2>{weather.name}</h2>
            <h3>現在の気温:{weather.main.temp}</h3>
            <h4>体感気温:{weather.main.feels_like}</h4>
            <p>最高気温:{weather.main.temp_max}</p>
            <p>最低気温:{weather.main.temp_min}</p>
            <p>予報:{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherExtra;
