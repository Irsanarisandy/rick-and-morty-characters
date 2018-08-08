import { AppBar, IconButton, Toolbar } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import logo from '../../assets/navLogo.png';
import styles from './styles';

const Header: React.StatelessComponent<{}> = () => (
    <AppBar position="static">
        <Toolbar>
            <MediaQuery maxDeviceWidth={450}>
                <IconButton aria-label="Menu" color="inherit">
                    <MenuIcon aria-haspopup="true" />
                </IconButton>
                <Link style={styles.navLink} to="/">
                    <img src={logo} alt="logo" style={styles.logoSmall} />
                </Link>
            </MediaQuery>
            <MediaQuery minDeviceWidth={450}>
                <Link style={styles.navLink} to="/">
                    <img src={logo} alt="logo" style={styles.logoLarge} />
                </Link>
                <Link style={styles.navLink} to="/characters">
                    <p style={styles.text}>Characters</p>
                </Link>
            </MediaQuery>
        </Toolbar>
    </AppBar>
);

export default Header;
