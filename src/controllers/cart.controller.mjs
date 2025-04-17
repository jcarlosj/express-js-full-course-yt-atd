const addToCart = ( req = Request, res = Response ) => {

    // TODO: Validar campos del producto usando express-validator

    if( ! req.session.user )
        return res.sendStatus( 401 );

    const { body: item } = req;
    const { cart } = req.session;

    if( ! cart )
        req.session.cart = [ item ];
    else
        cart.push( item );

    return res.status( 201 ).send( item );
}

const statusCart = ( req = Request, res = Response ) => {

    /** Muestra el último estado de los datos guardado en la sesion para el carrito */
    req.sessionStore.get( req.session.id, ( err, sessionData ) => {
        if ( err ) {
            console.error( err );
            throw err;
        }

        console.log( 'sessionStore (cart): ', sessionData );                            // Muestra los datos almacenados en el store (Sin procesar por Express)
    } );

    if( ! req.session.user )
        return res.sendStatus( 401 );

    return res.send( req.session.cart ?? [] );
}


export default {
    addToCart,
    statusCart
}