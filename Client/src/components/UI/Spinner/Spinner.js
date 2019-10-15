import React from 'react';
import styles from './Spinner.module.css';

const spinner = (props) => (
    <div className={styles.SpinnerContainer}>
        <div className={styles.Spinner}>Loading</div>
    </div>
);

export default spinner;