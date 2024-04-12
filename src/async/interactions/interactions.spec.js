import axios from 'axios';

import { getInteractionsAsync, postInteractionAsync } from "./interactions";
import commentsMock from '../../mocks/comments.mock';
import interactionsMock from '../../mocks/interactions.mock';

jest.mock('axios');

describe('interactions', () => {
    describe('should be able to get interactions', () => {
        let comments;
        beforeAll(() => {
            axios.get.mockImplementation(() => Promise.resolve({
                "data": interactionsMock,
            }));
            comments = commentsMock.results;
        });

        it('successfully.', async() => {
            getInteractionsAsync('IDDRINK_COMMENT','d436482a-0c41-430d-a2cb-dccab4cccbfc',{commentIds: comments.map(comment => comment.commentId), idDrink: comments[0].idDrink})
                .then((data) => expect(data).toBe(interactionsMock));
        });

        it('and fail without errors.', async() => {
            axios.get.mockImplementationOnce(() => Promise.reject(new Error('Failed to get interactions')));
            const spy = jest.spyOn(console, "error").mockImplementation(() => {});
            getInteractionsAsync('IDDRINK_COMMENT','d436482a-0c41-430d-a2cb-dccab4cccbfc',{commentIds: comments.map(comment => comment.commentId), idDrink: comments[0].idDrink})
                .then((data) => {})
                .catch((err) => {
                    expect(err).toEqual(new Error('Failed to get interactions'));
                    expect(spy).toHaveBeenCalled();
                });

        });
    });

    describe('should be able to post interactions', () => {
        beforeAll(() => {
            axios.post.mockImplementation(() => Promise.resolve({
                data: {
                    "status": "SUCCESSFULLY_POST_INTERACTIONS",
                    "commentId": "65dab3a3d40675799c09a301",
                    "idDrink": "178332",
                    "uid": "d436482a-0c41-430d-a2cb-dccab4cccbfc",
                    "numLikes": 0,
                    "numDislikes": 1
                }
            }));
        });

        it('successfully.', async () => {
            postInteractionAsync('IDDRINK_COMMENT', '178332', 'LIKE', '65dab3a3d40675799c09a301', 'd436482a-0c41-430d-a2cb-dccab4cccbfc')
                .then((data) => expect(data).toEqual({
                    "status": "SUCCESSFULLY_POST_INTERACTIONS",
                    "commentId": "65dab3a3d40675799c09a301",
                    "idDrink": "178332",
                    "uid": "d436482a-0c41-430d-a2cb-dccab4cccbfc",
                    "numLikes": 0,
                    "numDislikes": 1
                }));
        });

        it('and handle errors successfully.', async() => {
            axios.post.mockImplementationOnce(() => Promise.reject(new Error('Error posting interaction')));
            postInteractionAsync('IDDRINK_COMMENT', '178332', 'LIKE', '65dab3a3d40675799c09a301', 'd436482a-0c41-430d-a2cb-dccab4cccbfc')
                .catch((err) => expect(err).toEqual(new Error('Error posting interaction')));
        });

    });
});