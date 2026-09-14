const mongoose= require("mongoose"); //mongoose to create schema
const bycrpt= require("bcryptjs"); // bycrpt to hash passwords

//SCHEMA- bluepirnt/template for MongoDB
const UserSchema= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            uniqe: true,
            lowercase: true,
        },
        password:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//PRE-SAVE HOOK
//runs automatically before saving
//hashes password before storing
UserSchema.pre("save", async function () {
    if(!this.isModified("password")) return; //skip if password not changed

    const salt = await bycrpt.genSalt(10); //generate salt
    this.password=await bycrpt.hash(this.password, salt); //hash password
});

//CUSTOM METHOD- comparePassword
//compares entered password with hashed password
UserSchema.methods.comparePassword= async function (candidatePassword){
    return bycrpt.compare(candidatePassword, this.password); //returns true or false
};

module.exports= mongoose.model("User", UserSchema); //exports User model