import React from 'react'
import Authorize from '../Services/authFunctions'

export default class Client extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error:false
        }
    }

    componentDidMount() {
        Authorize.checkAuth()
            .then((res => {
                if(!res.ok){
                    this.setState({error:true})
                    throw new Error('Http error' + res.status) }
                return res.text()
            }))
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    render(){
        return(
            <div>
                <h1> Hello client</h1>
                {this.state.error ?  <p>Qualcosa non va</p> :  <p>Tutto a posto</p>}
            </div>
        )
    }
}