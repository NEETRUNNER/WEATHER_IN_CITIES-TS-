import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface WeatherData { // Для деструктуризации такого интерфейса возводим в обьектные скобки
    cityTemp: number | null; // Нельзя добавлять в интерфейс то что мы не используем, иначе будет ошибка
    cityName: string | null;
    weatherClouds: string | null;
    humidity: number | null;
    lvlSea: number | null;
    wind: number | null;
    pressure: number | null;
    visibility: number | null;
    getWeatherImage?: (weatherClouds: string) => string | void; // функция которая возвращает строку или ничего(void), а так же является необязательной, и не стоит забывать что если у нас есть аргумент, то мы обязательно должны записать его, иначе получим ошибку что функция не имеет аргументов
    // Интерфейс должен чётко описывать всё что он отобразит, в случае если не всегда что-то отображается, ставим знак необязательности ?
}

export interface UpdateCityCoords { // Если экспортируем без default ставим фигурные скобки
    lat: number | null;
    lon: number | null;
}

export interface PropsType {
    cityTemp: number | null;
    setCityTemp: (value: number | null) => void;

    cityName: string | null;
    setCityName: (value: string | null) => void;

    weatherClouds: string | null;
    setWeatherClouds: (value: string | null) => void;

    humidity: number | null;
    setHumidity: (value: number | null) => void;

    lvlSea: number | null;
    setLvlSea: (value: number | null) => void;

    wind: number | null;
    setWind: (value: number | null) => void;

    pressure: number | null;
    setPressure: (value: number | null) => void;

    visibility: number | null;
    setVisibility: (value: number | null) => void;

    cityLat: number | null;
    setCityLat: (value: number | null) => void;

    cityLon: number | null;
    setCityLon: (value: number | null) => void;

    weatherInfo: number[];
    setWeatherInfo: (value: number[]) => void;

    updateWeatherData: (data: WeatherData) => void;

    updateCityCoords: (data: UpdateCityCoords) => void;
    
    loading: boolean;
    setLoading: (value: boolean) => void;
}

interface contextWrapperProps {
    children: ReactNode; // Описываем елементы
}

const PropsContext = createContext({} as PropsType); // {} as PropsType утверждает, что контекст всегда будет содержать объект, соответствующий PropsType. Это убирает необходимость проверки на null в usePropsContext.

export const usePropsContext = () => useContext(PropsContext);

export const ContextWrapper = ({ children }: contextWrapperProps) => { // провайдер вашего контекста
  
    // Создаём начальный стейт для элементов
    const [cityTemp, setCityTemp] = useState<number | null>(null);
    const [cityName, setCityName] = useState<string | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [lvlSea, setLvlSea] = useState<number | null>(null);
    const [wind, setWind] = useState<number | null>(null);
    const [pressure, setPressure] = useState<number | null>(null);
    const [visibility, setVisibility] = useState<number | null>(null);
    const [cityLat, setCityLat] = useState<number | null>(null);
    const [cityLon, setCityLon] = useState<number | null>(null);
    const [weatherClouds, setWeatherClouds] = useState<string | null>(null);
    const [weatherInfo, setWeatherInfo] = useState<number[]>([])
    const [loading, setLoading] = useState<boolean>(false);

    const updateWeatherData = (data: WeatherData) => { // Тут нужно использовать какое-то название аргумента, например data, и использовать интерфейс в котором указаны типы, и для каждого указать приставку data и тип который мы указали
        setCityTemp(data.cityTemp);
        setCityName(data.cityName);
        setHumidity(data.humidity);
        setLvlSea(data.lvlSea);
        setWind(data.wind);
        setPressure(data.pressure);
        setVisibility(data.visibility);
        setWeatherClouds(data.weatherClouds)
        // Если вам нужно сохранить weatherClouds, добавьте отдельный стейт
    };

    const updateCityCoords = (data: UpdateCityCoords) => { // Важно чтобы при передаче функции, она была полностью одинаково по типу интерфейса в другом компоненте
        // Метод для обновления координат
        setCityLat(data.lat);
        setCityLon(data.lon);
    };

    return (
        <PropsContext.Provider 
        value={{
            cityTemp, setCityTemp,
            cityName, setCityName,
            humidity, setHumidity,
            lvlSea, setLvlSea,
            wind, setWind,
            pressure, setPressure,
            visibility, setVisibility,
            cityLat, setCityLat,
            cityLon, setCityLon,
            weatherClouds, setWeatherClouds,
            weatherInfo, setWeatherInfo,
            loading, setLoading,
            updateWeatherData, updateCityCoords
          }}
        >
            {children}
        </PropsContext.Provider>
    );
};