import axios from "axios";

export interface getCity {
    name: string;
}

class WeatherApi {

    _apiKey = '403a46430b72cd84dcf1d87acffaeeed';

    getCityApi = async (name: string) => {
        try {
            const geoUrl = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this._apiKey}&lang=ru`)
            return geoUrl.data;
        } catch (error) {
            console.log(error)
        }
    }

    getWeatherApi = async (lat: number, lon: number) => {
        try {
            const geoUrl = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this._apiKey}&lang=ru`)
            return geoUrl.data;
        } catch (error) {
            console.log(error)
        }
    }

    getWeatherWeekApi = async (lat: number, lon: number) => {
        try {
            const geoUrl = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${this._apiKey}&lang=ru`)
            return geoUrl.data;
        } catch (error) {
            console.log(error)
        }
    }

}

export default WeatherApi;