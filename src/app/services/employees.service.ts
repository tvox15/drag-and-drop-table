import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Employee } from '../models/models';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})

export class EmployeesService {
    constructor(private http: HttpClient){ }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>('assets/data/employees.json').pipe(map((data) => {
            const employees: Employee[] = [];
            for (var i = 0; i < data.length; i++) {
                employees.push(data[i])
            }
            return employees;
        }))
    }
}