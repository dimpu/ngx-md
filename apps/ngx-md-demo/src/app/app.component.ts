import { Component } from '@angular/core';

@Component({
  selector: 'md-demo',
  templateUrl: './app.component.html',
})
export class AppComponent {
  links = [
    { path: '/home', title: 'Home' },
    { path: '/tables', title: 'Tables' },
    { path: '/path', title: 'Path' },
    { path: '/live', title: 'Live' },
    { path: '/todo', title: 'Todo' },
  ];
}
