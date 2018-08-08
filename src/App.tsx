import * as React from 'react';
import banner from './assets/banner.png';
import styles from './styles/main';

class App extends React.Component<{}> {
    public render() {
        return (
            <div id="mainPage" style={styles.container}>
                <img src={banner} alt="banner" style={styles.image} />
            </div>
        );
    }
}

export default App;
