import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Habits } from './habits/habits';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Habits],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('BJJ-Drill');
}
