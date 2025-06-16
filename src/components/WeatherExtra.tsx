import axios from 'axios';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

const WeatherExtra = () => {
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
      console.error('Error has occurred:', error);
      setWeather(null);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError('入力した都市が見つかりませんでした。');
        console.log(typeof axios.isAxiosError);
      } else {
        setError('予期せぬエラーが発生しました。');
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
        <input type="button" value="検索" />
      </form>

      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h1>{currentDate}</h1>
          <h2>{weather.name}</h2>
          <p>Temperature:{weather.main.temp}</p>
          <p>Weather:{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherExtra;
