import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface StudyItem {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private readonly studiesInToleranceSubject = new BehaviorSubject<StudyItem[]>(
    [],
  );

  private readonly iranianStudiesSubject = new BehaviorSubject<StudyItem[]>([]);

  readonly studiesInTolerance$: Observable<StudyItem[]> =
    this.studiesInToleranceSubject.asObservable();

  readonly iranianStudies$: Observable<StudyItem[]> =
    this.iranianStudiesSubject.asObservable();

  setStudiesInTolerance(data: StudyItem[]): void {
    this.studiesInToleranceSubject.next([...data]);
  }

  setIranianStudies(data: StudyItem[]): void {
    this.iranianStudiesSubject.next([...data]);
  }

  getStudiesInTolerance(): StudyItem[] {
    return [...this.studiesInToleranceSubject.value];
  }

  getIranianStudies(): StudyItem[] {
    return [...this.iranianStudiesSubject.value];
  }

  clearStudiesInTolerance(): void {
    this.studiesInToleranceSubject.next([]);
  }

  clearIranianStudies(): void {
    this.iranianStudiesSubject.next([]);
  }

  clearAll(): void {
    this.clearStudiesInTolerance();
    this.clearIranianStudies();
  }
}
