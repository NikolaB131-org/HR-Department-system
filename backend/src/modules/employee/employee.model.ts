import { Schema, Types, model } from 'mongoose';

export type EmployeeType = {
  id: string;
  imageUrl?: string;
  name: string;
  age: number;
  yearsOfExperience: number;
  phoneNumber: string;
  email: string;
  salary: number;
};

export type EmployeeSchema = {
  imageUrl?: string;
  name: string;
  age: number;
  yearsOfExperience: number;
  phoneNumber: string;
  email: string;
  salary: number;
};

const employeeSchema = new Schema<EmployeeSchema>(
  {
    imageUrl: String,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    yearsOfExperience: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  },
);

employeeSchema.index({ name: 'text' });

const Employee = model<EmployeeSchema>('Employee', employeeSchema);

export default Employee;
