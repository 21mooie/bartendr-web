import React from 'react';
import LocalBarIcon from '@material-ui/icons/LocalBar';

import './UserFavDrinks.css';
import ConnectedDrinkCard from '../../../common/DrinkCard/DrinkCard';


function UserFavDrinks({favDrinks}) {
    return (
        <div className="userFavDrinks">
            {
                favDrinks.length > 0 ?
                    <>
                        <h3>Favorite Drinks</h3>
                        <div className="userFavDrinks__grid">
                            {
                                favDrinks.map((fav_drink) => (
                                    <div className="userFavDrinks__item" key={fav_drink.idDrink}>
                                        <ConnectedDrinkCard drink={fav_drink}/>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                :
                    <div className="userFavDrinks__empty">
                        <LocalBarIcon style={{fontSize: 60}}/>
                        <h3>No Favorite Drinks</h3>
                    </div>
            }
        </div>
    )
}

export default UserFavDrinks
