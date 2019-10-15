import React from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './../UI/Button/Button';
import Input from './../UI/Input/Input';
import { connect } from 'react-redux';
import Axios from '../../axios-api';

class Settings extends React.Component {
    state = {
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
            valid: false,
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
            valid: false,
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
            valid: false,
            touched: false
        }
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

    inputChangedHandler = (event, control) => {
        const updatedControl = {
            ...control,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, control.validation),
            touched: true
        }

        this.setState({ [control.name]: updatedControl });
    }

    loginSubmitHandler = (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure?")) {
            return;
        }

        Axios.post('/api/admin/changeLogin?value=' + this.state.login.value)
            .then(response => {
                this.setState({ login: { ...this.state.login, value: '' } });
            }).catch(err => {
                console.log(err);
            })
    }

    passwordSubmitHandler = (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure?")) {
            return;
        }

        Axios.post('/api/admin/changePassword?value=' + this.state.password.value)
            .then(response => {
                this.setState({ password: { ...this.state.password, value: '' } });
            }).catch(err => {
                console.log(err);
            })
    }

    tokenSubmitHandler = (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure?")) {
            return;
        }

        Axios.post('/api/admin/changeSecret?value=' + this.state.token.value)
            .then(response => {
                this.setState({ token: { ...this.state.token, value: '' } });
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.loginSubmitHandler}>
                    <Input
                        key={this.state.login.elementConfig.placeholder}
                        elementType={this.state.login.elementType}
                        elementConfig={this.state.login.elementConfig}
                        value={this.state.login.value}
                        changed={(event) => this.inputChangedHandler(event, this.state.login)}
                        shouldValidate={this.state.login.validation}
                        invalid={!this.state.login.valid}
                        touched={this.state.login.touched} />
                    <div className="Button">
                        <Button btnType="Danger">
                            <span><FontAwesomeIcon icon={faSave} /></span>
                            Change login
                        </Button>
                    </div>
                </form>
                <form onSubmit={this.passwordSubmitHandler}>
                    <Input
                        key={this.state.password.elementConfig.placeholder}
                        elementType={this.state.password.elementType}
                        elementConfig={this.state.password.elementConfig}
                        value={this.state.password.value}
                        changed={(event) => this.inputChangedHandler(event, this.state.password)}
                        shouldValidate={this.state.password.validation}
                        invalid={!this.state.password.valid}
                        touched={this.state.password.touched} />
                    <div className="Button">
                        <Button btnType="Danger">
                            <span><FontAwesomeIcon icon={faSave} /></span>
                            Change password
                        </Button>
                    </div>
                </form>
                <form onSubmit={this.tokenSubmitHandler}>
                    <Input
                        key={this.state.token.elementConfig.placeholder}
                        elementType={this.state.token.elementType}
                        elementConfig={this.state.token.elementConfig}
                        value={this.state.token.value}
                        changed={(event) => this.inputChangedHandler(event, this.state.token)}
                        shouldValidate={this.state.token.validation}
                        invalid={!this.state.token.valid}
                        touched={this.state.token.touched} />
                    <div className="Button">
                        <Button btnType="Danger">
                            <span><FontAwesomeIcon icon={faSave} /></span>
                            Change secret
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
    };
}

export default connect(mapStateToProps)(Settings);