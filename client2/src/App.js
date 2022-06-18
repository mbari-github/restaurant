import React from 'react'
import Login  from './Components/Login'
import Registration from "./Components/Registration";
import Route from './Components/Route';
import Admin from './Pages/admin';
import Chef from './Pages/chef';
import Client from './Pages/client';

//import Interface from './Components/Interface'




function App(){
    return(
        <>
            <Route path='/registration'>
                <Registration />
            </Route>
            <Route path='/'>
                <Login />
            </Route>
            <Route path ='/admin'>
                <Admin />
            </Route>
            <Route path ='/chef'>
                <Chef />
            </Route>
            <Route path ='/client'>
                <Client />
            </Route>

        </>
        )
}

export default App;
