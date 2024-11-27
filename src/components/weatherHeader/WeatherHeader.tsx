import { useState } from "react";

import WeatherApi from "../weatherService/WeatherService";
import "../weatherHeader/weatherHeader.sass";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons"; // Импорт иконки

import { usePropsContext } from "../hooks/usePropsContext";

const Header = () => {

    const {setCityLat, setCityLon, updateCityCoords, updateWeatherData, loading} = usePropsContext();
    const [input, setInput] = useState<string>('');

    const weatherApi = new WeatherApi(); // Создаём экземпляр класса и получаем в использование его методы

    const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => { // Позволяет получить введенные данные из инпута
        const value = event.target.value;
        setInput(value)
        getCityFromInput(value);
    }

    const getCityFromInput = (value: string) => { // Выводим в консоль значение инпута
        console.log(value)
    }

    const getCity = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Отключаем дефолтное поведение формы (перезагрузку страницы)

        weatherApi.getCityApi(input.trim())
        .then(response => {
            console.log(response)
            return response;
        })
        .then(data => {
            const cityInfo = data;
            console.log(cityInfo)
            const cityLat = cityInfo.coord.lat; // Получаем координаты для поиска по городу погоду и для погоды на 5 дней
            const cityLon = cityInfo.coord.lon;
            console.log(cityLat, cityLon)
            // Передаем координаты города через пропсу в родительский компонент
            updateCityCoords({lat: cityLat, lon: cityLon}); // Отталкиваемся от своего интерфейса, чтобы lat и lon были number

            setCityLat(cityLat); // Когда убираю сетстейт то всё работает
            setCityLon(cityLon)

            getWeather(cityLat, cityLon) // Передали в наш метод по поиску погоды, ширину и долготу
        })
            .catch(error => {
                console.log('Ошибка в работе промисса')
                console.error("Ошибка при запросе данных о городе:", error);
            });
            if (input.trim()) { // Очищаем инпут после отправки
                setInput('')
            }
    }

    const getWeather = (lat: number, lon: number) => {

        weatherApi.getWeatherApi(lat, lon)
        .then(response => {
            return response
        })
        .then(data => {
            console.log(data)
            const weatherInfo = data;

            // Получили в переменные динамические данные о температура, названии города, облачности и другой информации
            const cityTemp = weatherInfo.main.temp;
            const cityName = weatherInfo.name;
            const weatherClouds = weatherInfo.weather[0].main;
            const humidity = weatherInfo.main.humidity;
            const lvlSea = weatherInfo.main.sea_level;
            const wind = weatherInfo.wind.speed;
            const pressure = weatherInfo.main.pressure;
            const visibility = weatherInfo.visibility;

            updateWeatherData({cityTemp: cityTemp, cityName: cityName, humidity: humidity, lvlSea: lvlSea, wind: wind, pressure: pressure, visibility: visibility, weatherClouds: weatherClouds}); // Передали как обьект
        })
        .catch(error => {
            console.error("Ошибка при запросе погоды:", error);
        });
    }

        return (
                <div className="header">
                    <h1 className="header-title">Прогноз погоды</h1>
                    <div className="header-block">
                        <form className='form' onSubmit={(event) => getCity(event)}>
                        <input placeholder="Введите название города" type="text" className="header-block__input" value={input} onChange={(e) => updateInputValue(e)}/>
                        <Button htmlType="submit"  type="primary" disabled={!input || loading} className="header-block__button" icon={<SearchOutlined />}>
                            Показать
                        </Button>
                        </form>
                    </div>
                </div>
        )
}

export default Header;