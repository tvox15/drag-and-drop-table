import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clickup-final-test';
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    
  }
}
