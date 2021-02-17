import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItemContainerStyles = css`
    font-size: 20px;
    height: 100%;
    padding: 0px 15px;
    margin-top: 30px;
    border: none;
    cursor: pointer;

`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgrey;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 10px;
`;

export const MenuContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const MenuItemLink = styled(Link)`
    ${MenuItemContainerStyles}
`;

export const MenuItemDiv = styled.div`
    ${MenuItemContainerStyles}
`;