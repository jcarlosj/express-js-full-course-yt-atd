import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

/** Middleware: EndPoints */
app.get( '/', ( req = Request, res = Response ) => {
    res.status( 201 ).send( { msg: "Hello, World!" } );
} );
app.get( '/api/users', ( req = Request, res = Response ) => {
    res.send( [
        { id: 1, username: 'manu', displayName: 'Manuela Gomez' },
        { id: 2, username: 'juli', displayName: 'Juliana Puerta' },
        { id: 3, username: 'caro', displayName: 'Carolina Rojas' }
    ] );
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