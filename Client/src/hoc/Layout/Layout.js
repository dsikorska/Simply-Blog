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
            <div className="row">
                <div className="leftcolumn">
                    {props.children}
                </div>
                <div className="rightcolumn">
                    <div className="card">
                        <h2>About Me</h2>
                        <div className="fakeimg" style={{ height: "100px" }}>Image</div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                    </div>
                    <div className="card">
                        <h3>Popular Post</h3>
                        <div className="fakeimg">Image</div><br />
                        <div className="fakeimg">Image</div><br />
                        <div className="fakeimg">Image</div>
                    </div>
                    <div className="card">
                        <h3>Follow Me</h3>
                        <p>Some text..</p>
                    </div>
                </div>
            </div>
            <footer className={styles.Footer}>
                Footer
            </footer>
        </Auxiliary>
    );
};

export default layout;