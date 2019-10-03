import React from 'react';
import styles from './About.module.css'
import img from '../../assets/images/burger-logo.png';
import Panel from '../UI/Panel/Panel';

const about = (props) => {
    return (
        <Panel.body>
            <div className={styles.About}>
                <div className={styles.Details}>
                    <img src={img} alt="" />
                    <p>
                        Dolor est culpa officia reprehenderit sint exercitation enim deserunt cupidatat. Exercitation sit pariatur consectetur ut cillum irure
                        deserunt reprehenderit aliquip. Magna mollit consectetur consequat velit proident pariatur dolore. Sint id deserunt reprehenderit ad cillum
                        officia veniam Lorem do. Eu ipsum ea excepteur est enim.
                        Mollit et amet proident et ullamco cillum elit sunt ullamco esse. Et amet fugiat nostrud exercitation culpa commodo deserunt mollit eiusmod
                        reprehenderit mollit exercitation et. Ad ut magna consectetur voluptate quis culpa in.
                        Aute reprehenderit ea velit ea sint officia non minim pariatur adipisicing proident fugiat excepteur ea. Cupidatat velit ut pariatur fugiat occaecat
                        occaecat quis occaecat Lorem minim irure duis nulla ullamco. Aliqua commodo occaecat quis nostrud veniam dolor nisi. Incididunt consectetur ullamco
                        incididunt Lorem dolore veniam.
                    </p>
                </div>
                <div className={styles.Contact}>
                    contacst
            </div>
            </div>
        </Panel.body>
    )
};

export default about;