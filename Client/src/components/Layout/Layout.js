import React, { useRef, useEffect } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faCogs, faSave, faUpload, faCopy } from '@fortawesome/free-solid-svg-icons';
import Button from './../UI/Button/Button';
import Panel from '../UI/Panel/Panel';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Layout = (props) => {
    const headerRef = useRef(null);
    const uploadImageRef = useRef(null);
    useEffect(() => {
        props.headerRefHandler(headerRef);
        props.uploadImageRefHandler(uploadImageRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Auxiliary>
            {props.isAuthenticated ?
                <div className="M30">
                    <Panel.body>
                        <h3>Update header image</h3>
                        <form onSubmit={props.updateHeaderHandler} className="ButtonsGroup">
                            <div style={{ padding: "0.375rem 0.75rem", width: "85%" }}>
                                <input type="file" name="image" ref={headerRef} accept="image/*" className="Input" />
                            </div>
                            <div className="Button" style={{ width: "15%" }}>
                                <Button btnType="Success">
                                    <span><FontAwesomeIcon icon={faSave} /></span>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Panel.body>
                </div>
                : null}
            {props.headerImg ?
                <header className={styles.Header}>
                    <div className="Img">
                        <img src={props.headerImg} alt="" />
                    </div>
                </header>
                : null}
            {props.isAuthenticated ?
                <Panel.body>
                    <h3>Upload image to server</h3>
                    <form onSubmit={props.uploadImageHandler} className="ButtonsGroup">
                        <div style={{ padding: "0.375rem 0.75rem", width: "85%" }}>
                            <input type="file" name="uploadImage" ref={uploadImageRef} accept="image/*" className="Input" />
                        </div>
                        <div className="Button" style={{ width: "15%" }}>
                            <Button btnType="Success">
                                <span><FontAwesomeIcon icon={faUpload} /></span>
                                Upload
                            </Button>
                        </div>
                    </form>
                    <div className="ButtonsGroup" style={{ padding: "0.375rem 0.75rem", width: "100%" }}>
                        <input className="Input" disabled value={props.imageUrl} style={{ width: "90%", marginTop: "0.35rem" }} />
                        <Button btnType="Secondary">
                            <CopyToClipboard text={props.imageUrl}>
                                <FontAwesomeIcon icon={faCopy} />
                            </CopyToClipboard>
                        </Button>
                    </div>
                </Panel.body>
                : null
            }
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
        </Auxiliary >
    );
};

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(Layout);