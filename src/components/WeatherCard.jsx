import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const iconMap = {
  Clear: WiDaySunny,
  Clouds: WiCloudy,
  Rain: WiRain,
  Snow: WiSnow,
  Thunderstorm: WiThunderstorm,
};

const WeatherCard = ({ data }) => {
  if (!data) return null;
  const current = data.current;
  const Icon = iconMap[current?.weather[0]?.main] || WiCloudy;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-3xl text-violet-500" />
        <h3 className="text-lg font-semibold text-slate-800">Weather</h3>
      </div>
      <p className="text-5xl font-bold text-slate-900">{Math.round(current?.temp)}°</p>
      <p className="text-sm capitalize text-slate-500 mt-1">{current?.weather[0]?.description}</p>
      <p className="text-xs text-slate-400 mt-1">Feels like {Math.round(current?.feels_like)}°</p>
      <div className="flex gap-2 mt-auto pt-4">
        {data.daily?.slice(1, 5).map((day, i) => (
          <div key={i} className="flex-1 text-center bg-slate-100 rounded-xl py-2">
            <p className="text-[10px] text-slate-400">{new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</p>
            <p className="text-sm font-semibold text-slate-700">{Math.round(day.temp.day)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;