import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeesState, employeesAdapter } from './employees.state';

export const EMPLOYEE_STATE_NAME = 'employees';
const getEmployeesState =
  createFeatureSelector<EmployeesState>(EMPLOYEE_STATE_NAME);
export const employeesSelectors = employeesAdapter.getSelectors();

export const getEmployees = createSelector(
  getEmployeesState,
  employeesSelectors.selectAll
);

export const getEmployeesEntities = createSelector(
  getEmployeesState,
  employeesSelectors.selectEntities
);

export const getCount = createSelector(
  getEmployeesState,
  (state) => state.count
);

export const getSortBy = createSelector(
  getEmployeesState,
  (state) => state.sortBy
);

export const getSortOrder = createSelector(
  getEmployeesState,
  (state) => state.sortOrder
);

export const getSearchTerm = createSelector(
  getEmployeesState,
  (state) => state.searchTerm,
);
