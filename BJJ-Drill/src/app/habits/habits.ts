import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HabitsList } from '../habits-list/habits-list';

@Component({
  selector: 'app-habits',
  imports: [HabitsList],
  templateUrl: './habits.html',
  styleUrl: './habits.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Habits {

  public greetMe(){
    console.log('Hello!');
  }
}
