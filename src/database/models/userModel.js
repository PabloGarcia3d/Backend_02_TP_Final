import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        required: true,
        min: 0 // Asegura que la edad sea positiva
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId
       // ref: "carts" // Hace referencia a la colección de carritos
    },

    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        enum: ["admin", "user", "user_vip"], 
        default: "user"
    }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
