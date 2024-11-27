import './App.sass';
import Header from '../weatherHeader/WeatherHeader';
import Main from '../weatherMain/WeatherMain';
import RenderDays from '../renderDays/RenderDays';

import { ContextWrapper } from '../hooks/usePropsContext';

const App = () => {
    return (
        <ContextWrapper>
                <div className="App">
                    <Header></Header>
                <div className="main-wrapper">
                    <Main></Main>
                    <RenderDays></RenderDays>
                </div>
            </div>
        </ContextWrapper>
    );
}

export default App;