import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import { CustomNav } from './components/CustomNav';
import './styles/main.css';

const AppRouter: React.StatelessComponent<{}> = () => (
    <BrowserRouter>
        <div>
            <CustomNav />
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
