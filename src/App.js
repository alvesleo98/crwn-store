import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//importação dos meus componentes
import Header from './components/header/header.jsx';
import HomePage from './pages/homepage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx';
import CheckoutPage from './pages/checkout/checkout';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

class App extends React.Component{
  

  unsubscribeFromAuth = null

  componentDidMount(){
    //nessa funçao deve ser realizada toda a comunicação com APIS

    const { setCurrentUser } = this.props;

    //verifica se foi realizado login ou logout com conta google
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          
          
        });
      }
      setCurrentUser(userAuth);

      //addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({title, items})));
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route  exact path='/signIn' render=
            {
              //verifica se existe usuario logado e redireciona para a home do site
              () => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)
            }
            />
        </Switch>        
      </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
