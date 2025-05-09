import { checkSchema } from "express-validator";

import mockUsers from '../mocks/users.mock.mjs';

export const createUserValidationSchema = checkSchema({
    username: {
        in: [ 'body' ],
        trim: true,
        notEmpty: {
            errorMessage: 'Username is required',
        },
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: 'Username must be at least 5 characters with a max of 32 characters',
        },
        isAlphanumeric: {
            errorMessage: 'Username must contain only letters and numbers',
        },
        custom: {
            options: ( value ) => {
                const exists = mockUsers.some( user => user.username === value );

                if ( exists ) {
                    throw new Error( 'Username already exists' );
                }
                return true;
            },
        }
    },
    password: {
        in: [ 'body' ],
        trim: true,
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 6, max: 24 },
            errorMessage: 'Password must be at least 6 characters with a max of 24 characters',
        },
        isAlphanumeric: {
            errorMessage: 'Password must contain only letters and numbers',
        }
    },
    displayName: {
        in: [ 'body' ],
        notEmpty: {
            errorMessage: 'Display name is required',
        },
        isString: {
            errorMessage: 'Display name must be a string',
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Display name must be at most 50 characters',
        }
    }
});
