import { getSortBy, getSortOrder } from './../../state/employees.selector';
import { updateSort } from './../../state/employees.actions';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Employee } from './../../models/models';
import { loadEmployees, updateSearchTerm } from '../../state/employees.actions';
import {
  getEmployees,
  getCount,
  getSearchTerm,
} from '../../state/employees.selector';
import { AppState } from 'src/app/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
   // @ts-ignore
  columns: Array<string>   = ['id', 'name', 'age', 'job']; 

  // subscriptions
  // @ts-ignore
  employeeSubscription: Subscription;
  // @ts-ignore
  sortBySubscription: Subscription;
  // @ts-ignore
  sortOrderSubscription: Subscription;
  // @ts-ignore
  searchTermSubscription: Subscription;

  // observables
  // @ts-ignore
  employees: Observable<Employee[]>;
  // @ts-ignore
  count: Observable<number>;
  // @ts-ignore
  sortBy: Observable<string>;
  // @ts-ignore
  sortOrder: Observable<string>;
  // @ts-ignore
  searchTerm: Observable<string>;

  // local variables read from observable
  // @ts-ignore
  employeeLoadedData: Employee[];
  // @ts-ignore
  filteredEmployees: Employee[];
  // @ts-ignore
  sortByVal: string;
  // @ts-ignore
  sortOrderVal: string;
  // @ts-ignore
  searchTermVal: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // init variables
    this.employees = this.store.select(getEmployees);
    this.count = this.store.select(getCount);
    this.sortBy = this.store.select(getSortBy);
    this.sortOrder = this.store.select(getSortOrder);
    this.searchTerm = this.store.select(getSearchTerm);
   

    // initial loading of employees
    this.store.dispatch(loadEmployees());

    // set up subscriptions
    this.employeeSubscription = this.employees.subscribe((x) => {
      this.employeeLoadedData = x;
      this.filteredEmployees = x;
    //  this.columns = x.keys();
      console.log('x', x)
    });

    this.sortBySubscription = this.sortBy.subscribe((x) => {
      this.sortByVal = x;
    });
    this.sortOrderSubscription = this.sortOrder.subscribe((x) => {
      this.sortOrderVal = x;
    });

    this.searchTermSubscription = this.searchTerm.subscribe((x) => {
      this.searchTermVal = x;
      this.filteredEmployees = this.employeeLoadedData.filter((employee) => {
        return employee.name.toLowerCase().indexOf(x) !== -1;
      });
    });
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  dropRow(event: CdkDragDrop<Employee[]>) {
    moveItemInArray(
      this.filteredEmployees,
      event.previousIndex,
      event.currentIndex
    );
  }

  // dispatch the update sort functions
  resortItems(selectedColumn: string, sortOrder: string): void {
    this.store.dispatch(
      updateSort({ sortBy: selectedColumn, sortOrder: sortOrder })
    );
    this.sortEmployees();
  }

  sortEmployees(): void {
    // set filteredEmployees 
    this.filteredEmployees.sort((a: Employee, b: Employee): number => {
      if (this.sortOrderVal === 'ascending') {
        // @ts-ignore
        return a[this.sortByVal] > b[this.sortByVal] ? 1 : -1;
      } else {
        // @ts-ignore
        return a[this.sortByVal] < b[this.sortByVal] ? 1 : -1;
      }
    });
  }

  searchFilter(event: any): void {
    // run every time search bar value is changed
    this.store.dispatch(updateSearchTerm({ searchTerm: event.target.value }));
  }

  ngOnDestroy(): void {
    // destroy subscriptions
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (this.sortBySubscription) {
      this.sortBySubscription.unsubscribe();
    }
    if (this.sortOrderSubscription) {
      this.sortOrderSubscription.unsubscribe();
    }
    if (this.searchTermSubscription) {
      this.searchTermSubscription.unsubscribe();
    }
  }
}
