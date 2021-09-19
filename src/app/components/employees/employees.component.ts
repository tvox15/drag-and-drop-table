import { getEmployees, getNumSearchResults, getSortBy, getSortOrder, getSearchTerm } from './../../state/employees.selector';
import { updateSort } from './../../state/employees.actions';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Employee } from './../../models/models';
import { PageEvent } from '@angular/material/paginator';
import { loadEmployees, updateSearchTerm } from '../../state/employees.actions';
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
  columns: Array<string> = ['id', 'name', 'age', 'job'];

  // subscriptions
  // @ts-ignore
  employeeSubscription: Subscription;
  // @ts-ignore
  sortBySubscription: Subscription;
  // @ts-ignore
  sortOrderSubscription: Subscription;
  // @ts-ignore
  searchTermSubscription: Subscription;

  //@ts-ignore
  numSearchResultsSubscription: Subscription

  // observables
  // @ts-ignore
  employees: Observable<Employee[]>;
  // @ts-ignore
  numSearchResults: Observable<number>;
  // @ts-ignore
  sortBy: Observable<string>;
  // @ts-ignore
  sortOrder: Observable<string>;
  // @ts-ignore
  searchTerm: Observable<string>;
  // @ts-ignore
  currentPageIndex: Observable<number>;

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
  // @ts-ignore: string;
  pageIndexVal: number;

  // @ts-ignore
  numSearchResultsVal: number;

  // @ts-ignore
  initLoadComplete: boolean = false;


  // pagination
  // @ts-ignore
  pageEvent: PageEvent;
  // @ts-ignore
  pageSize: number = 5;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // init variables
    this.employees = this.store.select(getEmployees);
    this.numSearchResults = this.store.select(getNumSearchResults);
    this.sortBy = this.store.select(getSortBy);
    this.sortOrder = this.store.select(getSortOrder);
    this.searchTerm = this.store.select(getSearchTerm);

    // set up subscriptions
    this.employeeSubscription = this.employees.subscribe((x) => {
      this.employeeLoadedData = x;
      this.filteredEmployees = x;
    });

    this.numSearchResultsSubscription = this.numSearchResults.subscribe(x => {
      this.numSearchResultsVal = x;
    })


    this.sortBySubscription = this.sortBy.subscribe((x) => {
      this.sortByVal = x;
      if (this.initLoadComplete) {
        this.store.dispatch(loadEmployees({ page: 0, sortBy: x, sortOrder: "ascending", searchTerm: this.searchTermVal }));
      }
    });

    this.sortOrderSubscription = this.sortOrder.subscribe((x) => {
      this.sortOrderVal = x;
      if (this.initLoadComplete) {
        this.store.dispatch(loadEmployees({ page: 0, sortBy: this.sortByVal, sortOrder: x, searchTerm: this.searchTermVal }));
      }
    });

    this.searchTermSubscription = this.searchTerm.subscribe((x) => {
      this.searchTermVal = x;
    });


    // initial loading of employees
    this.store.dispatch(loadEmployees({ page: 0, sortBy: "id", sortOrder: "ascending", searchTerm: "" }));

    this.initLoadComplete = true;
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
  }

  searchFilter(event: any): void {
    // run every time search bar value is changed
    this.store.dispatch(updateSearchTerm({ searchTerm: event.target.value }));
    this.store.dispatch(loadEmployees({ page: 0, sortBy: this.sortByVal, sortOrder: this.sortOrderVal, searchTerm: event.target.value }));

  }

  paginateData(event: PageEvent): any {
    this.store.dispatch(loadEmployees({ page: event.pageIndex, sortBy: this.sortByVal, sortOrder: this.sortOrderVal, searchTerm: this.searchTermVal }));

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
    if (this.numSearchResultsSubscription) {
      this.numSearchResultsSubscription.unsubscribe();
    }

  }
}
