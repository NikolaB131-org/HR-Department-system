import { Request, Response, NextFunction } from 'express';
import ApiError from '../../middlewares/error/ApiError';
import employeesService from './employees.service';

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const text = req.query.text?.toString() ?? '';
    const data = await employeesService.search(text);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw ApiError.badRequest('Employee id are required');

    const data = await employeesService.getEmployee(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await employeesService.getAllEmployees();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw ApiError.badRequest('Employee id are required');

    await employeesService.deleteEmployee(id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employeeNewData = req.body; // ПРОВЕРИТЬ НА ОШИБКИ
    if (!id) throw ApiError.badRequest('Employee id are required');
    if (!employeeNewData) throw ApiError.badRequest('Employee new data are required');

    await employeesService.updateEmployee(id, employeeNewData);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeData = req.body; // ПРОВЕРИТЬ НА ОШИБКИ
    console.log(employeeData);
    if (!employeeData) throw ApiError.badRequest('Employee data are required');

    const data = await employeesService.createEmployee(employeeData);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default {
  search,
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  createEmployee,
};
