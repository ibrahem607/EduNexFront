import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [fadeInOut]
})
export class AppComponent implements OnInit {
  loading: boolean = true

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    // document.addEventListener('contextmenu', function (event) {
    //   event.preventDefault();
    // });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      event.preventDefault();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.onKeyDown(event);
  }
}
