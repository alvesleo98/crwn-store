import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils.js';
import CartIcon from '../cart-icon/cart-icon.jsx';
import CartDropdown from '../cart-dropdown/cart-dropdown.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

//importação dos styled components
import { HeaderContainer, LogoContainer, MenuContainer, MenuItemLink, MenuItemDiv} from './header.styles';

//sintaxe do React para importar imagem svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <MenuContainer>
            <MenuItemLink to='/shop'>SHOP</MenuItemLink>
            <MenuItemLink to='/shop'>CONTATO</MenuItemLink>
            {
                //verifica se currentUser possui um usuario ou possui null
                currentUser ?
                //caso possua um usuario cria a opção de logout da conta
                <MenuItemDiv onClick={() => auth.signOut()}>SIGN OUT</MenuItemDiv>
                :
                //caso nao possua um usuario ainda, cria um link para pagina de login
                <MenuItemLink to='/signin'>SIGN IN</MenuItemLink>
            }
            <CartIcon/>
        </MenuContainer>
        {
            //variavel que controla a renderização do carrinho
            //checa se o carrinho esta com hidden true ou false
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector ({
    //state referencia o root reducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);