import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils.js';
import CartIcon from '../cart-icon/cart-icon.jsx';
import CartDropdown from '../cart-dropdown/cart-dropdown.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.scss';
//sintaxe do React para importar imagem svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='menu'>
            <Link className='menu-item' to='/shop'>SHOP</Link>
            <Link className='menu-item' to='/shop'>CONTATO</Link>
            {
                //verifica se currentUser possui um usuario ou possui null
                currentUser ?
                //caso possua um usuario cria a opção de logout da conta
                <div className='menu-item' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                //caso nao possua um usuario ainda, cria um link para pagina de login
                <Link className='menu-item' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            //variavel que controla a renderização do carrinho
            //checa se o carrinho esta com hidden true ou false
            hidden ? null : <CartDropdown />
        }
    </div>
);

const mapStateToProps = createStructuredSelector ({
    //state referencia o root reducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);