import React from 'react';
import Authorize from '../Services/authFunctions'


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            isAdmin:'',
            isChef:''
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleRegister(e){
        e.preventDefault();
        const user= {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isAdmin: false,
            isChef: false
        };
        Authorize.registerUser(user)
            .then(() => {
                window.history.pushState({}, "", '/');
                const pop = new PopStateEvent('popstate');
                window.dispatchEvent(pop);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <hgroup>
                    <h1>Benvenuto sul nostro sito</h1>
                    <h2>Registrati</h2>
                </hgroup>
                <form onSubmit={this.handleRegister}>
                    <div >
                        <label htmlFor='username'>Username: </label>
                        <br/>
                        <input  placeholder="Username" type="text" required
                                onChange={this.handleChange} value={this.state.username} name="username"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <br/>
                        <input  placeholder="Email" type="text" required
                                onChange={this.handleChange} value={this.state.email} name="email"/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <br/>
                        <input placeholder="Password" type="password" required
                               onChange={this.handleChange} value={this.state.password} name="password"/>
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </>
        );
    }
}

export default Registration;