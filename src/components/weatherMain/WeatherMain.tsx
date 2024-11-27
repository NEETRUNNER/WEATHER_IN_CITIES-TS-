import { useState, useEffect } from 'react';

// Получили картинки
import cloudyImg from '../../img/cloudy.png';
import stormImg from '../../img/storm.png';
import sunnyImg from '../../img/sunny.png';
import rainImg from '../../img/rain.png';
import clearImg from '../../img/clearSky.png';
import './weatherMain.sass';

// Иконки из библиотеки
import { WiThermometer } from 'react-icons/wi';
import { WiWindBeaufort11 } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import { FaDroplet } from 'react-icons/fa6';
import { FaTachometerAlt } from 'react-icons/fa';
import { TiWaves } from 'react-icons/ti';

// Спиннер
import { Hourglass } from 'react-loader-spinner';

import { usePropsContext, WeatherData } from '../hooks/usePropsContext';

const Main = () => {

    const {weatherClouds, cityName, cityTemp, humidity, lvlSea, wind, pressure, visibility, loading, setLoading} = usePropsContext();
    
    const getWeatherImage = (weatherClouds: string | void): string => { // Устанавливаем тип либо строку либо ничего(void)
        switch (weatherClouds) {
            case 'Clouds':
                return cloudyImg;
            case 'Rain':
                return rainImg;
            case 'Storm':
                return stormImg;
            case 'Clear':
                return clearImg;
            case 'Sunny':
                return sunnyImg;
            default:
                return cloudyImg; // Default image if no match
        }
    }

    useEffect(() => {
        setLoading(true);
        // Имитация загрузки данных (например, запрос API)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        // Очистка таймера при размонтировании компонента или обновлении эффекта
        return () => clearTimeout(timer);
    }, [cityName, cityTemp]); // Эффект срабатывает при изменении cityName или cityTemp

        console.log(loading)

        const content = !loading ? <RenderCard cityTemp={cityTemp} cityName={cityName} weatherClouds={weatherClouds} getWeatherImage={getWeatherImage} humidity={humidity} lvlSea={lvlSea} wind={wind} pressure={pressure} visibility={visibility}></RenderCard> : null;
        const spinner = loading ? <LoadSpinner></LoadSpinner> : null;

        return (
            <>
                {content}
                {spinner}
            </>
        );
}

const RenderCard = ({cityTemp, cityName, weatherClouds, getWeatherImage, humidity, lvlSea, wind, pressure, visibility} : WeatherData) => { // Метод который рендерит карточку и доп. информацию

    const mathTemp = Math.round(cityTemp as number).toFixed(0);
    const windTemp = Math.round(wind as number).toFixed(0);

    const weatherImage = getWeatherImage ? getWeatherImage(weatherClouds as string) : null;

    const styleIcon = {
        fontSize: '25px',
    };

    // Анимационные настройки
    const blockAnimation = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, type: 'spring', stiffness: 50 },
        whileHover: { scale: 1.1 },
    };

    return (
        <div className="main">
        <div className="main-card">
            <div className="main-card__left">
                <h5 className="main-card__title">
                {cityName || 'Ваш город'}
                </h5>
                <h1 className="main-card__number">
                {mathTemp ? `${mathTemp}°c` : '11°c'}
                </h1>
                <h4 className="main-card__weather">
                {weatherClouds || 'Clouds'}
                </h4>
            </div>
            <div className="main-card__right">
                <motion.img
                src={weatherImage || 'default-image-url.jpg'}
                alt="Weather Icon"
                className="main-card__img"
                /* key={weatherImage} */
                initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                }}
                />
            </div>
            </div>
                <div className="main-info">
                    <motion.div
                        className="main-info__block"
                        key={`temp-${cityTemp}`}
                        {...blockAnimation}
                    >
                        <WiThermometer style={styleIcon}></WiThermometer>
                        <div className="main-info__div">
                            <div className="main-info__title">Ощущается</div>
                            <div className="main-info__num">
                                {mathTemp ? mathTemp : 0} °c
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`wind-${wind}`}
                        {...blockAnimation}
                    >
                        <WiWindBeaufort11 style={styleIcon}></WiWindBeaufort11>
                        <div className="main-info__div">
                            <div className="main-info__title">Ветер</div>
                            <div className="main-info__num">
                                {windTemp ? windTemp : 0} км/час
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`humidity-${humidity}`}
                        {...blockAnimation}
                    >
                        <FaDroplet style={styleIcon}></FaDroplet>
                        <div className="main-info__div">
                            <div className="main-info__title">Влажность</div>
                            <div className="main-info__num">{humidity ? humidity : 0} %</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`visibility-${visibility}`}
                        {...blockAnimation}
                    >
                        <FaEye style={styleIcon} />
                        <div className="main-info__div">
                            <div className="main-info__title">Видимость</div>
                            <div className="main-info__num">
                                {visibility ? visibility : 0} км
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`pressure-${pressure}`}
                        {...blockAnimation}
                    >
                        <FaTachometerAlt style={styleIcon}></FaTachometerAlt>
                        <div className="main-info__div">
                            <div className="main-info__title">Давление</div>
                            <div className="main-info__num">{pressure ? pressure : 0} мб</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="main-info__block"
                        key={`lvlSea-${lvlSea}`}
                        {...blockAnimation}
                    >
                        <TiWaves style={styleIcon} />
                        <div className="main-info__div">
                            <div className="main-info__title">Уровень моря</div>
                            <div className="main-info__num">{lvlSea ? lvlSea : 0}</div>
                        </div>
                    </motion.div>
                </div>
            </div>
    )
    
};

const LoadSpinner = () => { // Функция-метод которая создаёт компонент спиннера

    return (
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: 'center'}} className="spinner-container">
                <Hourglass
                visible={true}
                height="130"
                width="130"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
                />
            </div>
    );
};

export default Main;