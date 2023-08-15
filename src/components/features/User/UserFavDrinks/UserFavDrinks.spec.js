import React from 'react';
import { render, screen } from '@testing-library/react';
import UserFavDrinks from './UserFavDrinks';

// wrong but can probably be used for non-default imports
// jest.mock('../../../common/DrinkCard/DrinkCard', () => ({
//     ConnectedDrinkCard: () => 'Hi this is a drink card'
// }));
// how to mock component
jest.mock('../../../common/DrinkCard/DrinkCard', () => () => <div>Drink card</div>);


describe('UserFavDrinks', () => {
    let favDrinks;
    beforeAll(() => {
        favDrinks = [
            {
                "idDrink": "11046",
                "strDrink": "Applecar",
                "strDrinkAlternate": null,
                "strTags": null,
                "strVideo": null,
                "strCategory": "Ordinary Drink",
                "strIBA": null,
                "strAlcoholic": "Alcoholic",
                "strGlass": "Cocktail glass",
                "strInstructions": "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
                "strInstructionsES": "Agitar todos los ingredientes con hielo, colar en un vaso de cóctel y servir.",
                "strInstructionsDE": "Alle Zutaten mit Eis schütteln, in ein Cocktailglas abseihen und servieren.",
                "strInstructionsFR": null,
                "strInstructionsIT": "Shakerare tutti gli ingredienti con ghiaccio, filtrare in una coppetta da cocktail e servire.",
                "strInstructionsZH-HANS": null,
                "strInstructionsZH-HANT": null,
                "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/sbffau1504389764.jpg",
                "strIngredient1": "Applejack",
                "strIngredient2": "Triple sec",
                "strIngredient3": "Lemon juice",
                "strIngredient4": null,
                "strIngredient5": null,
                "strIngredient6": null,
                "strIngredient7": null,
                "strIngredient8": null,
                "strIngredient9": null,
                "strIngredient10": null,
                "strIngredient11": null,
                "strIngredient12": null,
                "strIngredient13": null,
                "strIngredient14": null,
                "strIngredient15": null,
                "strMeasure1": "1 oz ",
                "strMeasure2": "1 oz ",
                "strMeasure3": "1 oz ",
                "strMeasure4": null,
                "strMeasure5": null,
                "strMeasure6": null,
                "strMeasure7": null,
                "strMeasure8": null,
                "strMeasure9": null,
                "strMeasure10": null,
                "strMeasure11": null,
                "strMeasure12": null,
                "strMeasure13": null,
                "strMeasure14": null,
                "strMeasure15": null,
                "strImageSource": null,
                "strImageAttribution": null,
                "strCreativeCommonsConfirmed": "No",
                "dateModified": "2017-09-02 23:02:44",
                "strIngredientsArray": [
                {
                    "ingredient": "Applejack",
                    "measure": "1 oz "
                },
                {
                    "ingredient": "Triple sec",
                    "measure": "1 oz "
                },
                {
                    "ingredient": "Lemon juice",
                    "measure": "1 oz "
                }
                ]
            }
        ];
    });

    test('should render.', () => {
        render(<UserFavDrinks favDrinks={favDrinks}/>);
        expect(screen.getByText('Favorite Drinks')).toBeInTheDocument();
    });

    test('should render a ConnectedDrinkCard for each item in favDrinks.', () => {
        favDrinks.push(favDrinks);
        favDrinks[1].idDrink = '2';
        render(<UserFavDrinks favDrinks={favDrinks}/>);
        expect(screen.getAllByText('Drink card').length).toBe(2);
    });

    test('should render "No Favorite Drinks" if favDrinks is empty.', () => {
        render(<UserFavDrinks favDrinks={[]}/>);
        expect(screen.getByText('No Favorite Drinks')).toBeInTheDocument();
    });
});