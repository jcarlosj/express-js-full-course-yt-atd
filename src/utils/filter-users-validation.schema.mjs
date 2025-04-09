import { checkSchema } from 'express-validator';

const allowedFilters = [ 'username', 'displayName' ];

export const filterUsersSchema = checkSchema({
    filter: {
        in: [ 'query' ],
        optional: true,
        trim: true,
        isString: true,
        custom: {
            options: ( value ) => {
                if ( value && ! allowedFilters.includes( value ) ) {
                    throw new Error( `Filter must be one of: ${ allowedFilters.join(', ') } ` );
                }

                return true;
            }
        }
    },
    value: {
        in: [ 'query' ],
        optional: true,
        trim: true,
        isString: {
            errorMessage: 'Value must be a string'
        }
    }
});
