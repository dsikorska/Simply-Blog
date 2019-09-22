import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';

const layout = (props) => {
    return (
        <Auxiliary>
            <header className={styles.Header}>
                Header
            </header>
            <nav className={styles.Nav}>
                <div className={styles.NavContent}>
                    <NavLink exact to='/' activeClassName={styles.ActiveNavLink}>Posts</NavLink>
                    <NavLink to='/about' activeClassName={styles.ActiveNavLink}>About me</NavLink>
                    <NavLink to='/contact' activeClassName={styles.ActiveNavLink}>Contact</NavLink>
                </div>
            </nav>
            <div>
                {props.children}
            </div>
            <footer className={styles.Footer}>
                Footer
            </footer>
        </Auxiliary>
    );
};

export default layout;