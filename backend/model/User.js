import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password:{
        type: String,
        required:true
    }, 
    role:{
      type:String,
      required: true,
      default: 'client'
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (password){
  return (password == this.password) ? true: false
}

export default mongoose.model('User', UserSchema)
