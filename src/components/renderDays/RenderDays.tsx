import { useState, useEffect } from "react";

import '../renderDays/renderDays.sass'
import WeatherApi from "../weatherService/WeatherService";

// Импорт иконок
import { WiWindBeaufort11 } from 'react-icons/wi';
import { CiDroplet } from "react-icons/ci";

// Импорт фоток
import cloudyImg from '../../img/card_cloudy.png'
import sunnyImg from '../../img/card_sunny.png'
import rainImg from '../../img/card_rain.png'
import clearImg from '../../img/card_clear.png'

import { usePropsContext } from "../hooks/usePropsContext";

interface WeatherData {
    dt: number;
    weather: { main: string}[];
    main: {
        temp_max: number;
        temp_min: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
}

interface CustomPropsType {
    cityLat: number;
    cityLon: number;
    weatherInfo: WeatherData[]; // Предопредилили weatherInfo, и поместили туда другой интерфейс
    setWeatherInfo: (value: number[] | string) => void; // Функция стейта которая имеет value=первоначальный стейт, и состояние стейта должна быть строка или число, и возвращающий ничего
}

const RenderDays = () => {
    const {cityLat, cityLon, weatherInfo, setWeatherInfo} = usePropsContext() as unknown as CustomPropsType; // unknown принудительно приводит к типу CustomPropsType

    useEffect(() => {
        if (cityLat || cityLon) {
            getWeek(cityLat, cityLon);
        }
    }, [cityLat, cityLon])

    const weatherApi = new WeatherApi(); // Создали экземпляр класса

    const getWeek = (lat: number, lon: number) => {
        setWeatherInfo([]) // Нужно описывать тип массива и сам массив, при описании типа

        weatherApi
        .getWeatherWeekApi(lat, lon)
        .then(response => {
            console.log(response)
            const weatherInfo = response;
            console.log(weatherInfo)
            console.log(weatherInfo.list[0].weather[0].main)
            
            setTimeout(() => {
                setWeatherInfo(weatherInfo.list)
            }, 3500);
        })
        .catch(error => {
            console.error("Ошибка при запросе погоды на неделю:", error);
        });
    }

    const getWeatherImage = (weatherClouds: string | void): string => { // Метод для перебора картинки
        switch (weatherClouds) {
            case 'Clouds':
                return cloudyImg;
            case 'Rain':
                return rainImg;
            case 'Clear':
                return clearImg;
            case 'Sunny':
                return sunnyImg;
            default:
                return cloudyImg; // Default image if no match
        }
    }

    const getDayOfWeek = (date: number) => { // Метод для подсчёта дня по времени
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const dayIndex = new Date(date * 1000).getDay(); // Преобразуем Unix timestamp в дату
        return daysOfWeek[dayIndex];
    }

        const styleOne = {
            fontSize: '30px'
        }

        const styleTwo = {
            fontSize: '40px'
        }

        console.log(weatherInfo)

        return (
        <div className="renderDays">

        {weatherInfo.length > 0 && weatherInfo
            .filter((_, index) => [0, 8, 16, 24, 32, 40].includes(index)) // Создали тернарного оператора, который фильтрует наш массив weatherInfo(data.list), в фильтре мы ставим первый прочерк так как нам не нужен первый аргумент, вместо этого можно поставить прочерк, указываем нулевой массив это первый день, 
            .map((day, index) => {
                const weatherCondition = day.weather[0].main;
                const dayOfWeek = getDayOfWeek(day.dt)
                return (
                    
                    <div key={index} className="renderDays-block">
                        <h5 className="renderDays-block__day">{dayOfWeek}</h5>
                            <img src={getWeatherImage(weatherCondition)} alt="" className="renderDays-block__img" />
                        <div className="renderDays-block__nums">
                            <h1 className="renderDays-block__num">{Math.round(day.main.temp_max).toFixed(0)}°C</h1>
                            <h1 className="renderDays-block__num">{Math.round(day.main.temp_min).toFixed(0)}°C</h1>
                        </div>
                        <div className="render-wrap">
                        <div className="div-render">
                            <CiDroplet style={styleOne} />
                            <p className="renderDays-block__humidity">{day.main.humidity}%</p>
                        </div>

                        <div className="div-render">
                            <WiWindBeaufort11 style={styleTwo} />
                            <p className="renderDays-block__wind">{day.wind.speed} км/час</p>
                        </div>
                    </div>
                    </div>
                    
                );
            })}
            </div>
        )
}

export default RenderDays;