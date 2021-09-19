import { initialState, employeesAdapter } from './employees.state';
import { createReducer, on } from '@ngrx/store';
import { loadEmployeesSuccess, updateSort, updateSearchTerm, updateNumSearchResults } from './employees.actions';

  const _employeesReducer = createReducer(
    initialState,
    on(loadEmployeesSuccess, (state, action) => {
        return employeesAdapter.setAll(action.employees, {
            ...state,
        })
    }),
     on(updateSort, (state, action) => {        
       return {
            ...state,
            sortBy: action.sortBy,
            sortOrder: (action.sortBy !== state.sortBy || action.sortOrder === 'ascending') ? 'ascending' : 'descending'
        }
    }),
    on(updateSearchTerm, (state, action) => {
        return {
            ...state,
            searchTerm: action.searchTerm,
        }
    }),
    on(updateNumSearchResults, (state, action) => {
        return {
            ...state,
            numSearchResults: action.numSearchResults
        }
    })
)  


// @ts-ignore
export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}