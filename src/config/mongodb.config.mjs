import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect( 'mongodb://localhost/express_tutorial' )
        .then( () => console.log( 'Conected to Database' ) )
        .catch( ( err ) => console.error( 'Error: ', err ) );
}


export default dbConnect;