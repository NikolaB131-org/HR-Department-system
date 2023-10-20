import express from 'express';
import employeesController from '../modules/employees/employees.controller';

const employeesRouter = express.Router();

employeesRouter.get('/search', employeesController.search);

employeesRouter.route('/:id')
  .get(employeesController.getEmployee)
  .delete(employeesController.deleteEmployee)
  .patch(employeesController.updateEmployee)

employeesRouter.route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee)

export default employeesRouter;
