import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const Header: React.StatelessComponent<{}> = () => (
    <AppBar position="static">
        <Toolbar>
            <IconButton aria-label="Menu" color="inherit">
                <MenuIcon aria-haspopup="true" />
            </IconButton>
            <Typography variant="display1" color="inherit">
                <Link style={styles.link} to="/">
                    Rick &amp; Morty Wiki
                </Link>
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;
