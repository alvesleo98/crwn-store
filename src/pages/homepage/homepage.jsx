import React from 'react';

import Directory from '../../components/directory/directory.jsx';

//importando styled component
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;