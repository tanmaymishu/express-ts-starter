import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Authenticatable from '@/database/authenticatable';

export interface UserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUser extends Authenticatable, UserInput, mongoose.Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

// Virtual method
userSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// When the user registers
userSchema.pre('save', async function (this: IUser, next: any) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  // Replace the password with the hash
  this.password = hash;

  return next();
});

// Compare a candidate password with the user's password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // So we don't have to pass this into the interface method
  const user = this as IUser;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.methods.getId = function () {
  const user = this as IUser;
  return user._id;
};
userSchema.methods.getPassword = function () {
  const user = this as IUser;
  return user.password;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
