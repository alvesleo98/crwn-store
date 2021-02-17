import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collection-overview/collection-overview.jsx';
import CollectionPage from '../collection/collection.jsx';
import { updateCollections } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        
        //obtem a referencia as collections
        const collectionRef = firestore.collection('collections')
        
        //converte o snapshot dos items que vem do firebase para map
        //assim os items da loja podem ser adicionados ao redux
        collectionRef.onSnapshot(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            //adiciona os items ao redux
            updateCollections(collectionsMap);
        });
    }
    
    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        );
        
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)) 
});

export default connect(null, mapDispatchToProps)(ShopPage);