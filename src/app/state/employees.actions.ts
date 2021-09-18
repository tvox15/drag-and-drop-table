import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/models';

export const LOAD_EMPLOYEES = '[employees] load employees';
export const LOAD_EMPLOYEES_SUCCESS = '[employees] load employees success';
export const UPDATE_SORT = '[employees] update sort';
export const UPDATE_SEARCH_TERM = '[employees] update search term';


export const loadEmployees = createAction(LOAD_EMPLOYEES);
export const loadEmployeesSuccess = createAction(
  LOAD_EMPLOYEES_SUCCESS,
  props<{ employees: Employee[] }>()
);

export const updateSort = createAction(
  UPDATE_SORT,
  props<{
    sortBy: string;
    sortOrder: string;
  }>()
);

export const updateSearchTerm = createAction(UPDATE_SEARCH_TERM, props<{searchTerm: string}>());
