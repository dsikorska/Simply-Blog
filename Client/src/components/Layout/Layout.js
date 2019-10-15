import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faCogs } from '@fortawesome/free-solid-svg-icons';

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
                {props.isLogged ?
                    <div className={styles.Login}>
                        <NavLink to='/settings' activeClassName={styles.ActiveNavLink}>
                            <FontAwesomeIcon icon={faCogs} size="lg" />
                        </NavLink>
                    </div>
                    :
                    <div className={styles.Login}>
                        <NavLink to='/login' activeClassName={styles.ActiveNavLink}>
                            <FontAwesomeIcon icon={faUserCog} size="lg" />
                        </NavLink>
                    </div>}
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

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(layout);