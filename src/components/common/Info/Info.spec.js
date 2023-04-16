import React from 'react';
import { render, screen } from '@testing-library/react';

import Info from './Info';
import drinkMock from '../../../mocks/Drink.mock';
import ConnectedDrinkCard from '../DrinkCard/DrinkCard';
import party from "../../../images/undraw_having_fun_iais.svg";

jest.mock('../DrinkCard/DrinkCard');

describe('Info', () => {
    let drink;
    beforeAll(() => {
        drink = drinkMock
    });

    test('should render drink.', () => {
        render(<Info 
            drink={drink}
            dark={true}
            topline="Personalized recommendations"
            heading="Try this drink"
            subtitle="Receive great drink suggestions based on your preferences thanks to our personalization engine"
            imgLeft={false}
        />);
        expect(screen.getByText("Try this drink")).toBeInTheDocument();
    });

    test('should render image.', () => {
        render(<Info 
            img={party}
            dark={false}
            topline="Community Oriented"
            heading="Meet other drink enthusiasts"
            subtitle="Make friends and share recipes for popular drinks"
            imgLeft={true}
        />);
        expect(screen.getByText("Meet other drink enthusiasts")).toBeInTheDocument();
    });
});
