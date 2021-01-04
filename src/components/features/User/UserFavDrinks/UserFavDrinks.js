import React from 'react';
import LocalBarIcon from '@material-ui/icons/LocalBar';

import './UserFavDrinks.css';
import DrinkCard from '../../../common/DrinkCard/DrinkCard';


function UserFavDrinks({fav_drinks}) {
    return (
        <div className="userFavDrinks">
            {
                fav_drinks.drinks.length > 0 ?
                    <>
                        <h3>Favorite Drinks</h3>
                        <div className="userFavDrinks__grid">
                            {
                                fav_drinks.drinks.map((fav_drink) => (
                                    <div className="userFavDrinks__item" key={fav_drink.idDrink}>
                                        <DrinkCard drink={fav_drink}/>
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
