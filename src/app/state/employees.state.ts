import { Employee } from './../models/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface EmployeesState extends EntityState<Employee> {
  sortBy: string;
  sortOrder: string;
  searchTerm: string;
  numSearchResults: number;
}

export const employeesAdapter = createEntityAdapter<Employee>();

export const initialState: EmployeesState = employeesAdapter.getInitialState({
  sortBy: 'id',
  sortOrder: 'ascending',
  searchTerm: '',
  numSearchResults: 5,
});
