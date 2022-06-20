import React from 'react';
import Authorize from '../Services/authFunctions'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            error:'',
        };

        this.handleChange=this.handleChange.bind(this);
        this.onClick=this.onClick.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }



    handleLogin(e){
        e.preventDefault()
        const user={
            username: this.state.username,
            password: this.state.password
        }
        Authorize.requestLogin(user)
            .then((res => {
                if(!res.ok){
                    this.setState({error:true})
                    throw new Error('Http error' + res.status) }
                return res.json()
            }))
            .then(data => data)
            .then(data => {
                sessionStorage.setItem('utente',JSON.stringify(data));
                if (data[1] && data[2] ){
                    window.history.pushState({}, "", '/admin');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                } else if (data[2]) {
                    window.history.pushState({}, "", '/chef');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                }else if(!data[1] && !data[2]) {
                    window.history.pushState({}, "", '/client');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
            }
        })
            .catch(err => console.log(err));

    }




    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }



    onClick(e){
        e.preventDefault();
        window.history.pushState({}, "", '/registration');
        const pop = new PopStateEvent('popstate');
        window.dispatchEvent(pop);
    }



    render() {
        return (
            <>
                <hgroup>
                    <h1>Benvenuto sul nostro sito </h1>
                    <h2>Loggati</h2>
                </hgroup>
                <form onSubmit={this.handleLogin}>
                    <div >
                        <label htmlFor='username'>Username: </label>
                        <br/>
                        <input  placeholder="Username" type="text" required
                               onChange={this.handleChange} value={this.state.username} name="username"/>
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
                    <br/>
                    <p>Se non sei ancora registrato: &nbsp;
                        <a href='/registration' onClick={this.onClick}>Clicca qui</a>
                    </p>
                    <br/>
                    {(this.state.error) &&
                        <footer>Utente o Password incorretti, riprova </footer>
                    }
                </form>
            </>
        );
    }
}

export default Login;




