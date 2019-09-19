import React from 'react';
import Auxiliary from './../Auxiliary/Auxiliary';
import styles from './Layout.module.css';

const layout = (props) => {
    return (
        <Auxiliary>
            <header className={styles.Header}>
                Header
            </header>
            <div className={styles.Header}>
                Toolbar
            </div>
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