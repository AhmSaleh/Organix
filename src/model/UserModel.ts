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
        type: String,
        minlength: [2, 'is too short (minimum is 2 characters)'],
        required: true
    }
    
});


//export the model and the schema
const UserModel = mongoose.model<IUser>('User', UserSchema);
export {UserModel , UserSchema}
