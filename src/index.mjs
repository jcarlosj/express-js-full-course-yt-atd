import express, { response } from 'express';
import { query, body, validationResult, matchedData } from 'express-validator';

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: 'manug', displayName: 'Manuela Gomez' },
    { id: 2, username: 'julip', displayName: 'Juliana Puerta' },
    { id: 3, username: 'caror', displayName: 'Carolina Rojas' },
    { id: 4, username: 'malu', displayName: 'Luisa Bazalar' },
    { id: 5, username: 'elima', displayName: 'Elisa Giraldo' },
    { id: 6, username: 'mauram', displayName: 'Maura Villanueva' },
    { id: 7, username: 'anamac', displayName: 'Ana Maria Castro' },
    { id: 8, username: 'carop', displayName: 'Carolina Porras' },
    { id: 9, username: 'melis', displayName: 'Melissa Sanchez' }
];


const loggingMiddlware = ( req = Request, res = Response, next = Next ) => {
    console.log( `${ req.method } - ${ req.url }` );

    next();
}
const resolveIndexByUserId = ( req = Request, res = Response, next = Next ) => {
    // console.log( req.body );

    const { params: { id } } = req;

    const parsedId = parseInt( id );
    if( isNaN( parsedId ) ) return res.status( 400 ).send({ msg: "Bad Request. Invalid Id." });

    const findUserIndex = mockUsers.findIndex( user => user.id === parsedId );
    if( findUserIndex === -1 ) return res.sendStatus( 404 );

    req.findUserIndex = findUserIndex;
    next();
}


/** Middleware: */
app.use( express.json() );

/** Middleware: EndPoints */
app.get( '/', ( req = Request, res = Response ) => {
    res.status( 201 ).send( { msg: "Hello, World!" } );
} );

const allowedFilters = ['username', 'displayName'];
app.get( 
    '/api/users', 
    [
        /** Valida el parámetro de consulta 'filter' (nombre de las propiedades sobre las que se realizará la búsqueda) */
        query( 'filter' )
            .trim()
            .optional()
            .isString(), 
        /** Valida el parámetro de consulta 'value' (valor de la propiedad sobre la que se realiza la búsqueda) */
        query( 'value' )
            .trim()
            .optional() // porque podrías permitir que falte y devuelvas todos los usuarios
            .isString().withMessage( 'Value must be a string' )
    ],
    ( req = Request, res = Response ) => {
        console.log( req[ 'express-validator#contexts' ] );
        // console.log( req.query );

        const errors = validationResult( req );
        console.log( errors );
        if ( ! errors.isEmpty() ) {
            return res.status( 400 ).json({ errors: errors.array() });
        }

        // Extraemos solo los campos que fueron validados exitosamente, los sanitiza e ignora campos adicionales, manipulados por el cliente, en este caso del query
        const { filter, value } = matchedData( req, { locations: [ 'query' ] });

        /**
         * filter: hace referencia al campo de busqueda
         * value: el termino de busqueda esperado
         */
        console.log({ filter, value });

        if ( filter?.trim() && value?.trim() && allowedFilters.includes( filter ) ) {
            return res.send(
                mockUsers.filter( user =>
                    user[ filter ].toLowerCase().includes( value.toLowerCase() )
                )
            );
        }

        res.send( mockUsers );
    } 
);

app.use( loggingMiddlware );            // Todas las rutas de aqui en adelante harán uso del loggingMiddleware
app.post( 
    '/api/users', 
    [
        body( 'username' )
            .trim()
            .notEmpty().withMessage( 'Username is required' )
            .isLength({ min: 5, max: 32 }).withMessage( 'Username must be at least 5 characters with a max of 32 characters' )
            .isAlphanumeric().withMessage( 'Username must contain only letters and numbers' )
            .custom( value => {
                const exists = mockUsers.some( user => user.username === value );
                if ( exists ) {
                    throw new Error( 'Username already exists' );
                }

                return true;
            }),
        body( 'displayName' )
            .notEmpty().withMessage( 'Display name is required' )
            .isString().withMessage( 'Display name must be a string' )
            .isLength({ max: 50 }).withMessage( 'Display name must be at most 50 characters' )
    ],
    ( req = Request, res = Response ) => {
        const { body } = req;
        
        const errors = validationResult( req );
        console.log( errors );
        if ( ! errors.isEmpty() ) {
            return res.status( 400 ).json({ errors: errors.array() });
        }

        const dataBody = matchedData( req );

        const newUser = {
            id: mockUsers[ mockUsers.length - 1 ].id + 1,
            ...dataBody
        }

        mockUsers.push( newUser );

        return res.status( 201 ).send( newUser );
    } 
);
app.get( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[ findUserIndex ];
    
    if( ! findUser ) return res.sendStatus(404);

    return res.send( findUser );
} );
app.put( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    mockUsers[ findUserIndex ] = {
        id: mockUsers[ findUserIndex ].id,
        ...body
    }

    return res.sendStatus( 200 );
} );
app.patch( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { body, findUserIndex } = req;

    // console.log({ ...mockUsers[ findUserIndex ], ...body });
    mockUsers[ findUserIndex ] = { ...mockUsers[ findUserIndex ], ...body };

    return res.sendStatus( 200 );
} );
app.delete( '/api/users/:id', resolveIndexByUserId, ( req = Request, res = Response ) => {
    const { findUserIndex } = req;

    mockUsers.splice( findUserIndex, 1 );

    return res.sendStatus( 200 );
} );
app.get( '/api/products', ( req = Request, res = Response ) => {
    res.send( [
        { id: 1, name: 'Chicken Breast', price: 12.99 }
    ] );
} );


/** Launch Server using ExpressJS */
app.listen( PORT, () => {
    console.log( `Running on http://localhost:${ PORT }` );
} );