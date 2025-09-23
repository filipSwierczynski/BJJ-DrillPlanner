import { Component, inject } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, shareReplay, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HabitsService } from '../habits';
const DUMMY_HABITS = [
  {
    id: 1,
    title: 'Brush Teeth',
    done: false,
  },
  {
    id: 2,
    title: 'Take Edgar Out',
    done: false,
  },
  {
    id: 3,
    title: 'Eat Breakfast',
    done: false,
  },
];
interface habitInterface {
  id: number;
  title: string;
  done: boolean;
}

type HabitStats = {
  completed: number;
  total: number;
  percent: number;
};

function computeStats(list: Array<{ done: boolean }>): HabitStats {
  const total = list.length;
  let completed = 0;
  for (const habit of list) {
    if (habit.done) {
      completed++;
    }
  }
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

@Component({
  selector: 'app-habits-list',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './habits-list.html',
  styleUrl: './habits-list.scss',
})
export class HabitsList {
  habitsService = inject(HabitsService);

  public habitList$ = new BehaviorSubject<habitInterface[]>(this.habitsService.getData());

  newHabit = new FormControl('');
  public stats$ = this.habitList$.pipe(
    map(computeStats),
    distinctUntilChanged(
      (a, b) => a.completed === b.completed && a.total === b.total && a.percent === b.percent
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public toggleDone(id: number) {
    const habits = this.habitList$.getValue();
    const next = habits.map((habit) => (habit.id === id ? { ...habit, done: !habit.done } : habit));
    this.habitList$.next(next);
    this.habitsService.save(next);
  }

  public addNewHabit() {
    const title = this.newHabit.value?.trim() || 'No habit title';
    const currentHabits = this.habitList$.getValue();
    const nextId = (currentHabits.length ? Math.max(...currentHabits.map((h) => h.id)) : 0) + 1;
    const next = [...currentHabits, { id: nextId, title, done: false }];
    this.habitList$.next(next);
    this.habitsService.save(next);
    this.newHabit.reset('');
  }

  public removeHabit(id: number) {
    const habits = this.habitList$.getValue();
    const next = habits.filter((habit) => habit.id !== id);
    this.habitList$.next(next);
    this.habitsService.save(next);
  }
}
