import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { ConnectedDashboard } from './Dashboard';


const mockStore = configureStore([]);

describe('ConnectedDashboard', () => {
    let store;

    beforeAll(() => {
        store = mockStore({
            user: {
                username: 'test_username',
                email: 'test_email@email.com'
            }
        })
    });
    test('should render.', () => {
        render(<Provider store={store}><ConnectedDashboard username="testUser" email="testUser@email.com"/></Provider>);
        expect(screen.getByText("test_username")).toBeInTheDocument();
    });
});