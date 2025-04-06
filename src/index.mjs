import express, { response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: 'manu', displayName: 'Manuela Gomez' },
    { id: 2, username: 'juli', displayName: 'Juliana Puerta' },
    { id: 3, username: 'caro', displayName: 'Carolina Rojas' }
];

/** Middleware: EndPoints */
app.get( '/', ( req = Request, res = Response ) => {
    res.status( 201 ).send( { msg: "Hello, World!" } );
} );
app.get( '/api/users', ( req = Request, res = Response ) => {
    res.send( mockUsers );
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