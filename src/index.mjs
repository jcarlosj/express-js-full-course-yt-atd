import express, { response } from 'express';

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

/** Middleware: */
app.use( express.json() );

/** Middleware: EndPoints */
app.get( '/', ( req = Request, res = Response ) => {
    res.status( 201 ).send( { msg: "Hello, World!" } );
} );
app.get( '/api/users', ( req = Request, res = Response ) => {
    console.log( req.query );

    const { query: { filter, value } } = req;

    if( filter && value ) 
        return res.send(
            mockUsers.filter( user => user[ filter ].includes( value ) )
        );

    res.send( mockUsers );
} );
app.post( '/api/users', ( req = Request, res = Response ) => {
    console.log( req.body );

    const { body } = req;

    const newUser = {
        id: mockUsers[ mockUsers.length - 1 ].id + 1,
        ...body
    }

    mockUsers.push( newUser );

    return res.status( 201 ).send( newUser );
} );
app.get( '/api/users/:id', ( req = Request, res = Response ) => {
    console.log( req.params );

    const parsedId = parseInt( req.params.id );
    if( isNaN( parsedId ) ) res.status( 400 ).send({ msg: "Bad Request. Invalid Id." });

    const findUser = mockUsers.find( ( user ) => user.id === parsedId );
    if( ! findUser ) return res.sendStatus(404);

    return res.send( findUser );
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