import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},{
    timestamps: true,
});

const User = model("User", userSchema);


// export the schema
export default User;