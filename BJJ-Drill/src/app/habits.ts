import { Injectable } from '@angular/core';

const STORAGE_KEY = 'HABITS_V1';
type Habit = { id: number; title: string; done: boolean };

const DUMMY_HABITS: Habit[] = [
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
@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  getData(): Habit[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as Habit[];
      } catch {}
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_HABITS));
    return [...DUMMY_HABITS];
  }

  save(data: Habit[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}
