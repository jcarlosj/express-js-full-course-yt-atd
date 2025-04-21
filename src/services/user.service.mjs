import { UserModel } from "../mongoose/user.schema.mjs";

const insertUser = async ( newUserData ) => {
    const newUser = new UserModel( newUserData );

    return await newUser.save();
}

export default {
    insertUser
}