import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ClockComponent } from "./clock/clock.component";
import { Observable,Subscription,interval, map } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ClockComponent]
})

export class AppComponent {

    constructor() { }

    subscription!: Subscription;
    stockPrice$!: Observable<number>;

  ngOnInit() {
    this.stockPrice$ = interval(1000).pipe(map(() => Math.random() * 100)); 

    this.subscription = this.stockPrice$.subscribe(price =>
      console.log(`Stock price: $${price}`)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
}
