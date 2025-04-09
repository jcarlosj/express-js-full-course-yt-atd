const loggingMiddlware = ( req = Request, res = Response, next = Next ) => {
    console.log( `${ req.method } - ${ req.url }` );

    next();
}

export {
    loggingMiddlware
}