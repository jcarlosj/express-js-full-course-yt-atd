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
app.get( 
    '/api/users', 
    /** Valida el parámetro de consulta 'filter' */
    query( 'filter' )
        .isString().withMessage( 'Must be a string' )
        .notEmpty().withMessage( 'Must not be empty' )
        .isLength({ min: 3, max: 10 }).withMessage( 'Must be at least 3-10 characters' ), 
    ( req = Request, res = Response ) => {
        console.log( req[ 'express-validator#contexts' ] );
        // console.log( req.query );

        const errors = validationResult( req );
        console.log( errors );
        if ( ! errors.isEmpty() ) {
            return res.status( 400 ).json({ errors: errors.array() });
        }

        const { query: { filter, value } } = req;

        if( filter && value ) 
            return res.send(
                mockUsers.filter( user => user[ filter ].includes( value ) )
            );

        res.send( mockUsers );
    } 
);

app.use( loggingMiddlware );            // Todas las rutas de aqui en adelante harán uso del loggingMiddleware
app.post( 
    '/api/users', 
    body( 'username' )
        .notEmpty().withMessage( 'Username cannot be empty' )
        .isLength({ min: 5, max: 32 }).withMessage( 'Username must be at least 5 characters with a max of 32 characters' )
        .isString().withMessage( 'Usename must be a string' ),
    body( 'displayName' ).notEmpty().withMessage( 'displayName cannot be empty' ),
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