import ApiError from '../../middlewares/error/ApiError';
import Employee, { EmployeeType } from '../employee/employee.model';

const search = async (text: string) => {
  return (await Employee.find({ name: { $regex: text, $options: 'i' } }, { name: 1, imageUrl: 1 }).limit(100)).map(
    employee => employee.toObject(),
  );
};

const getEmployee = async (id: string) => {
  const employee = await Employee.findById({ _id: id });
  if (!employee) throw ApiError.notFound('Сотрудника с указанным id не существует');

  return employee.toObject();
};

const getAllEmployees = async () => {
  return (await Employee.find()).map(employee => employee.toObject());
};

const deleteEmployee = async (id: string): Promise<void> => {
  await Employee.deleteOne({ _id: id });
};

const updateEmployee = async (id: string, employeeData: Omit<EmployeeType, 'id'>): Promise<void> => {
  const employee = await Employee.findById({ _id: id });
  if (!employee) throw ApiError.notFound('Сотрудника с указанным id не существует');

  // const { imageUrl, name, age, yearsOfExperience, phoneNumber, email, salary } = employeeData;
  await employee.updateOne(employeeData);
};

const createEmployee = async (employeeData: Omit<EmployeeType, 'id' | 'imageUrl'>) => {
  const { name, age, yearsOfExperience, phoneNumber, email, salary } = employeeData;
  const chat = await Employee.create({ name, age, yearsOfExperience, phoneNumber, email, salary });
  return chat.toObject();
};

export default {
  search,
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  createEmployee,
};
