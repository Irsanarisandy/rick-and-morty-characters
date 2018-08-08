import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    Toolbar
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import logo from '../../assets/navLogo.png';
import styles from './styles';

interface IState {
    openDrawer: boolean;
}

class Header extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            openDrawer: false
        };
    }

    public render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <MediaQuery maxDeviceWidth={450}>
                            <IconButton
                                aria-label="Menu"
                                color="inherit"
                                onClick={this.toggleDrawer(true)}
                            >
                                <MenuIcon aria-haspopup="true" />
                            </IconButton>
                            <Link style={styles.navLink} to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={styles.logoSmall}
                                />
                            </Link>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={450}>
                            <Link style={styles.navLink} to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={styles.logoLarge}
                                />
                            </Link>
                            <Link style={styles.navLink} to="/characters">
                                <p style={styles.text}>Characters</p>
                            </Link>
                        </MediaQuery>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.openDrawer}
                    onClose={this.toggleDrawer(false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                    >
                        <Link style={styles.drawerLink} to="/">
                            <img
                                src={logo}
                                alt="logo"
                                style={styles.logoSmall}
                            />
                        </Link>
                        <Divider />
                        <Link style={styles.drawerLink} to="/characters">
                            <p style={styles.drawerText}>Characters</p>
                        </Link>
                    </div>
                </Drawer>
            </div>
        );
    }

    private toggleDrawer = (shouldOpen: boolean) => (
        event: React.MouseEvent<HTMLElement>
    ) => {
        this.setState({
            openDrawer: shouldOpen
        });
    };
}

export default Header;
