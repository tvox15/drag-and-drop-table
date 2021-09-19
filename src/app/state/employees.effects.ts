import { getEmployees } from './employees.selector';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { loadEmployeesSuccess, updateNumSearchResults } from './employees.actions';
import { EmployeesService } from './../services/employees.service';
import { Injectable } from '@angular/core';
import { loadEmployees } from './employees.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private store: Store<AppState>
  ) {}

  loadEmployees$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadEmployees),
        withLatestFrom(this.store.select(getEmployees)),
        mergeMap((action) => {
          return this.employeesService.getEmployees(action[0]).pipe( 
            map((employees) => {
              return this.store.dispatch(loadEmployeesSuccess({employees}));
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
