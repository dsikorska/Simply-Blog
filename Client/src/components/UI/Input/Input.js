import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    placeholder={props.placeholder} />
            break;
        case 'textarea':
            inputElement =
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    placeholder={props.placeholder} />
            break;
        case 'select':
            inputElement =
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(opt => {
                        return <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    })}
                </select>
            break;
        default:
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    placeholder={props.placeholder} />
            break;
    }

    return (
        <div className={styles.Input}>
            {props.label ? <label className={styles.Label}>{props.label}</label> : null}
            {inputElement}
        </div>
    );
};

export default input;