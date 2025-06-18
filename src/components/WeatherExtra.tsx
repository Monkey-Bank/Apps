import axios, { isAxiosError, AxiosError } from 'axios';
import { useCallback, useState, type FormEvent } from 'react';

const WeatherExtra = () => {
  interface ForecastItem {
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }

  interface ForecastResponse {
    city: {
      name: string;
    };
    list: ForecastItem[];
  }

  const apiKey = import.meta.env.VITE_APP_OW_API_KEY;
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<ForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dailyForecast = weather?.list
    .filter((item) => item.dt_txt.includes('12:00:00')) // 毎日12時のデータを取得
    .slice(0, 3); // 最初の3日分

  const apiCall = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true); // 追加
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
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
      } finally {
        setLoading(false); // ← finally で確実にOFFにする
        setCity('');
      }
    },
    [city, apiKey]
  );

  return (
    <div>
      <h1>天気予報アプリ（検索機能付き）</h1>
      <form onSubmit={apiCall}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">検索</button>
      </form>

      {error && <p>{error}</p>}

      {loading ? (
        <p>天気情報を取得中...</p>
      ) : weather && dailyForecast ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          {dailyForecast.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                width: '300px',
              }}
            >
              <h2>{weather.city.name}</h2>
              <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <p>現在の気温: {item.main.temp}</p>
              <p>体感気温: {item.main.feels_like}</p>
              <p>最高気温: {item.main.temp_max}</p>
              <p>最低気温: {item.main.temp_min}</p>
              <p>予報: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default WeatherExtra;
