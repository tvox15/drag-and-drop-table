import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Employee } from '../models/models';
import { map } from 'rxjs/operators';

import { APIParams } from '../models/models';
import { updateNumSearchResults } from '../state/employees.actions';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
@Injectable({
    providedIn: 'root',
})

export class EmployeesService {
    constructor(private http: HttpClient, private store: Store<AppState>) { }

    getEmployees(filters: APIParams): Observable<Employee[]> {
        return this.http.get<Employee[]>('assets/data/employees.json').pipe(map((data) => {
            const employees: Employee[] = [];
            const rowsPerPage = 5;
            const startIndex = filters.page * rowsPerPage || 0;

            for (var i = 0; i < data.length; i++) {
                employees.push(data[i])
            }

            // sort Data
            const sortedData =  this.sortData(employees, filters);

            // filter by search Term
            if(filters.searchTerm !== ""){
               const filteredData = sortedData.filter((row) => {
                    return row.name.toLowerCase().indexOf(filters.searchTerm) !== -1;
                })    
                this.store.dispatch(updateNumSearchResults({numSearchResults: filteredData.length}))
        
                return  filteredData.slice(startIndex, startIndex + rowsPerPage) ;
            }   

            this.store.dispatch(updateNumSearchResults({numSearchResults: sortedData.length}))
            return sortedData.slice(startIndex, startIndex + rowsPerPage)
        }))
    }

    sortData(employees: Employee[], filters: APIParams): Employee[] {

        employees.sort((a: Employee, b: Employee): number => {
            if (filters.sortOrder === 'ascending') {
                // @ts-ignore
                return a[filters.sortBy] > b[filters.sortBy] ? 1 : -1;
            } else {
                // @ts-ignore
                return a[filters.sortBy] < b[filters.sortBy] ? 1 : -1;
            }
        });
        return employees;
    }



}