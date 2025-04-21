import { UserModel } from "../mongoose/user.schema.mjs";

const insertUser = async ( newUserData ) => {
    const newUser = new UserModel( newUserData );

    return await newUser.save();
}

const findUserByUsername = async ( username ) => {
    return await UserModel.findOne({ username });
}

const findUserById = async ( _id ) => {
    return await UserModel.findById( _id );
}


export default {
    insertUser,
    findUserByUsername,
    findUserById
}