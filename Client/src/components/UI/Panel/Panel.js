import React from 'react';
import styles from './Panel.module.css';

const panel = (props) => {
    return (
        <div className={styles.Panel}>
            {props.children}
        </div>
    );
};

const header = (props) => {
    return (
        <div className={styles.PanelHeader}>
            {props.children}
        </div>
    );
};

const body = (props) => {
    return (
        <div className={styles.PanelBody}>
            {props.children}
        </div>
    )
}

const footer = (props) => {
    return (
        <div className={styles.PanelFooter}>
            {props.children}
        </div>
    )
}

const bodyImg = (props) => {
    return (
        <div className={styles.PanelImg}>
            {props.children}
        </div>
    )
}

panel.header = header;
panel.body = body;
panel.footer = footer;
panel.body.img = bodyImg;
export default panel;