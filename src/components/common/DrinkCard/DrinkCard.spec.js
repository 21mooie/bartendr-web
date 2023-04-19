import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ConnectedDrinkCard from "./DrinkCard";

const mockStore = configureStore([]);

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('axios');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const originalModule = jest.requireActual('react-redux');
  return {
    ...originalModule,
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
  }
});

describe('ConnectedDrinkCard', () => {
    let store;
    let drink;
  
    beforeAll(() => {
        drink = {
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
        };
        store = mockStore({
            username: 'test_username',
            // see if the reason fav wasn't working because this drink was already in the fav_drinks
            fav_drinks: {drinks: [drink], numDrinks: 1},
            isAuthenticated: true
        });
    })

    test('should render.', () => {
      render(<Provider store={store} ><ConnectedDrinkCard drink={drink}/></Provider>);
      expect(screen.getByText("Applecar")).toBeInTheDocument();
    });

    test('should be able to go to drink page by clicking image.', () => {
      render(<Provider store={store} ><ConnectedDrinkCard drink={drink}/></Provider>);
      userEvent.click(screen.getByRole('button'));
      expect(mockPush).toHaveBeenCalledTimes(1);
    });

    test('should be able to favorite a drink.', async () => {
      render(<Provider store={store} ><ConnectedDrinkCard drink={drink}/></Provider>);
      // userEvent.click(screen.getByTitle('Favorite Icon'));
      // not sure how to test yet
      // store.dispatch(mutations.requestUpdateFavDrinks('test_username', drink, false))
      // console.log(store.getActions());
      // expect(updateFavDrinksMock).resolves.toHaveBeenCalledTimes(1);
    });

    test('should test of on image load function is triggered.', () => {
      render(<Provider store={store} ><ConnectedDrinkCard drink={drink}/></Provider>);
      const image = screen.getByAltText("Applecar");
      fireEvent.load(image);
      expect(image).toBeInTheDocument();
    });
});