import React from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './../UI/Button/Button';
import Input from './../UI/Input/Input';
import { connect } from 'react-redux';
import Axios, { options } from '../../axios-api';

class Settings extends React.Component {
    state = {
        controls: {
            login: {
                name: 'login',
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Enter new login'
                },
                value: '',
                validation: {
                    minLength: 6
                },
                valid: true,
                touched: false
            },
            password: {
                name: 'password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter new password'
                },
                value: '',
                validation: {
                    minLength: 6
                },
                valid: true,
                touched: false
            },
            token: {
                name: 'token',
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Enter new secret text (used for authorization)'
                },
                value: '',
                validation: {
                    minLength: 64
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false,
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.controls };
        const updatedFormElement = { ...updatedForm[inputId] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }

        this.setState({ controls: updatedForm, formIsValid: formIsValid });
    }

    clearForm = () => {
        let controls = { ...this.state.controls };

        for (let key in this.state.controls) {
            controls = {
                ...controls,
                [key]: {
                    ...this.state.controls[key],
                    value: ''
                }
            }
        }

        this.setState({ controls: controls });
    }

    formSubmitHandler = (e) => {
        e.preventDefault();

        if (!this.state.formIsValid) {
            return;
        }

        if (!window.confirm("Are you sure?")) {
            return;
        }

        const credential = {
            login: this.state.controls.login.value,
            password: this.state.controls.password.value,
            secret: this.state.controls.token.value
        }

        Axios.post('/api/admin/credential', credential, options(this.props.token))
            .then(response => {
                this.clearForm();
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        return (
            <div>
                <form onSubmit={this.formSubmitHandler}>
                    {formElements.map(element => (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            changed={(event) => this.inputChangedHandler(event, element.id)}
                            shouldValidate={element.config.validation}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            className={element.config.className} />
                    ))}
                    <div className="Button">
                        <Button btnType="Success">
                            <span><FontAwesomeIcon icon={faSave} /></span>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(Settings);