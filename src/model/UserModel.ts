import mongoose from "mongoose";

export interface IUser {
    email: string;
    hash: string;
    name: string;
}


const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true,
            minlength: [1, 'is too short (minimum is 1 characters)'],
        },
        last: {
            type: String,
            required: true,
            minlength: [1, 'is too short (minimum is 1 characters)'],
        }
    }
});


//export the model and the schema
const UserModel = mongoose.model<IUser>('User', UserSchema);
export { UserModel, UserSchema }
