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


export {
    resolveIndexByUserId
}