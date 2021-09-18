import { EmployeesState } from './employees.state';
import { EMPLOYEE_STATE_NAME } from './employees.selector';
import { Employee } from "../models/models";
import { employeesReducer } from "./employees.reducer";

export interface AppState {
  [EMPLOYEE_STATE_NAME]: EmployeesState
  }

  export const appReducer = {
   [EMPLOYEE_STATE_NAME]: employeesReducer
 }