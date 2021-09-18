import { Employee } from './../models/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface EmployeesState extends EntityState<Employee> {
  count: number;
  sortBy: string;
  sortOrder: string;
  searchTerm: string;
}

export const employeesAdapter = createEntityAdapter<Employee>({
  sortComparer: sortEmployeesFunc,
});

export const initialState: EmployeesState = employeesAdapter.getInitialState({
  count: 0,
  sortBy: 'id',
  sortOrder: 'ascending',
  searchTerm: ''
});

export function sortEmployeesFunc(a: Employee, b: Employee): number {
    return a.id > b.id ? 1 : -1;
}