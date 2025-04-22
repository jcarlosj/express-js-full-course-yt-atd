import { model, Schema } from 'mongoose';

const DiscordUserSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    discordId: {
        type: Schema.Types.String,
        required: true,
        unique: true
    }
});

export const DiscordUserModel = model( 'DiscordUser', DiscordUserSchema );
