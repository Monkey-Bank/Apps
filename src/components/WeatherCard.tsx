// WeatherCardコンポーネントで受け取るpropsの型を定義
interface WeatherCardProps {
  date: string;
  city: string; // 都市名
  weather: string; // 天気
  temperature: {
    min: string; // 最低気温
    max: string; // 最高気温
  };
  iconUrl: string; // 天気アイコンのURL
}

// WeatherCardコンポーネント
const WeatherCard = ({
  date,
  city,
  weather,
  temperature,
  iconUrl,
}: WeatherCardProps) => {
  return (
    <div
      style={{
        border: '1px solid #ccc', // カードのスタイル
        borderRadius: '10px',
        padding: '20px',
        width: '300px',
        margin: '0 auto',
      }}
    >
      <h1>{date}</h1>
      <h2>{city}</h2> {/* 都市名を表示 */}
      <img
        src={iconUrl}
        alt={weather}
        style={{ width: '100px', height: '100px' }} // アイコン画像のサイズ
      />
      <p>天気：{weather}</p> {/* 天気を表示 */}
      <p>
        気温：最高 {temperature.max}°C / 最低 {temperature.min}°C
      </p>
      {/* 気温を表示 */}
    </div>
  );
};

export default WeatherCard;
