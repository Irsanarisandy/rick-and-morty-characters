import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import { CharacterPage } from './components/CharacterPage';
import { CustomNav } from './components/CustomNav';
import './styles/main.css';

const AppRouter: React.StatelessComponent<{}> = () => (
    <BrowserRouter>
        <div>
            <CustomNav />
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Route path="/characters" component={CharacterPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
