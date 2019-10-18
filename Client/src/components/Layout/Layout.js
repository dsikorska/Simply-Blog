import React, { useRef, useEffect } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faCogs, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Button from './../UI/Button/Button';

const Layout = (props) => {
    const ref = useRef(null);
    useEffect(() => {
        props.refHandler(ref);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Auxiliary>
            {props.headerImg ?
                <header className={styles.Header}>
                    <div className="Img">
                        <img src={props.headerImg} alt="" />
                    </div>
                </header>
                : null}
            {props.editMode ?
                <form onSubmit={props.updateHeaderHandler}>
                    <div style={{ padding: "0.375rem 0.75rem" }}>
                        <input type="file" name="image" ref={ref} accept="image/*" className="Input" />
                    </div>
                    <div className="Button">
                        <Button btnType="Danger">
                            <span><FontAwesomeIcon icon={faSave} /></span>
                            Change header image
                        </Button>
                    </div>
                </form>
                : null}
            {props.isAuthenticated ?
                <div className="Button">
                    <Button btnType="Secondary" clicked={props.toggleEditMode}>
                        <span><FontAwesomeIcon icon={faEdit} /></span>
                        Edit
                    </Button>
                </div>
                : null}
            <nav className={styles.Nav}>
                <div className={styles.NavContent}>
                    <NavLink exact to='/' activeClassName={styles.ActiveNavLink}>Posts</NavLink>
                    <NavLink to='/about' activeClassName={styles.ActiveNavLink}>About me</NavLink>
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
                <a href="https://github.com/LadyHail/Simply-Blog" className="link">Powered by Simply Blog.</a>
            </footer>
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Layout);