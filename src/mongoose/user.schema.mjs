import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: Schema.Types.String,
    password: {
        type: Schema.Types.String,
        required: true
    }
});

export const UserModel = model( 'User', UserSchema );
