import React from 'react';
import {Router} from 'react-router-dom'
import { render, screen, waitForElement } from '@testing-library/react';
import SearchWithRouter from './Search';
import { createMemoryHistory } from 'history';
import axios from 'axios';

jest.mock('axios');


describe('SearchWithRouter', () => {
    let drinkResults;

    beforeAll(() => {
        drinkResults = {
            "drinkResults": {
                "drinks": [
                    {
                        "idDrink": "178358",
                        "strDrink": "Mango Mojito",
                        "strDrinkAlternate": null,
                        "strTags": "Fruity",
                        "strVideo": null,
                        "strCategory": "Cocktail",
                        "strIBA": null,
                        "strAlcoholic": "Alcoholic",
                        "strGlass": "Jar",
                        "strInstructions": "Squeeze the juice from 1½ limes and blend with the mango to give a smooth purée.\r\nCut the rest of the limes into quarters, and then cut each wedge in half again. Put 2 pieces of lime in a highball glass for each person and add 1 teaspoon of caster sugar and 5-6 mint leaves to each glass. Squish everything together with a muddler or the end of a rolling pin to release all the flavours from the lime and mint.\r\nDivide the mango purée between the glasses and add 30ml white rum and a handful of crushed ice to each one, stirring well to mix everything together. Top up with soda water to serve and garnish with extra mint, if you like.",
                        "strInstructionsES": null,
                        "strInstructionsDE": null,
                        "strInstructionsFR": null,
                        "strInstructionsIT": null,
                        "strInstructionsZH-HANS": null,
                        "strInstructionsZH-HANT": null,
                        "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/wfqmgm1630406820.jpg",
                        "strIngredient1": "Lime",
                        "strIngredient2": "Mango",
                        "strIngredient3": "Mint",
                        "strIngredient4": "White Rum",
                        "strIngredient5": "Ice",
                        "strIngredient6": "Soda Water",
                        "strIngredient7": "Mango",
                        "strIngredient8": null,
                        "strIngredient9": null,
                        "strIngredient10": null,
                        "strIngredient11": null,
                        "strIngredient12": null,
                        "strIngredient13": null,
                        "strIngredient14": null,
                        "strIngredient15": null,
                        "strMeasure1": "3",
                        "strMeasure2": "1 Fresh",
                        "strMeasure3": "Sprig",
                        "strMeasure4": "200 ml",
                        "strMeasure5": "cubes",
                        "strMeasure6": "Top",
                        "strMeasure7": "Garnish with",
                        "strMeasure8": null,
                        "strMeasure9": null,
                        "strMeasure10": null,
                        "strMeasure11": null,
                        "strMeasure12": null,
                        "strMeasure13": null,
                        "strMeasure14": null,
                        "strMeasure15": null,
                        "strImageSource": "https://www.instagram.com/p/COVlG8TMZYU",
                        "strImageAttribution": null,
                        "strCreativeCommonsConfirmed": "No",
                        "dateModified": null,
                        "strIngredientsArray": [
                            {
                                "ingredient": "Lime",
                                "measure": "3"
                            },
                            {
                                "ingredient": "Mango",
                                "measure": "1 Fresh"
                            },
                            {
                                "ingredient": "Mint",
                                "measure": "Sprig"
                            },
                            {
                                "ingredient": "White Rum",
                                "measure": "200 ml"
                            },
                            {
                                "ingredient": "Ice",
                                "measure": "cubes"
                            },
                            {
                                "ingredient": "Soda Water",
                                "measure": "Top"
                            },
                            {
                                "ingredient": "Mango",
                                "measure": "Garnish with"
                            }
                        ]
                    }
                ]
            }
        };
    });

    test('should render.', () => {
        axios.post.mockImplementation(() => Promise.resolve(drinkResults));
        const history = createMemoryHistory();
        history.push({
            pathname: '/search',
            search: `?query=mango`,
        }, {
            searchVal: 'mango'
        });
        render(
            <Router history={history}>
                <SearchWithRouter />
            </Router>
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});