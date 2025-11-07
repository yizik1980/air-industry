import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    subjectInputEmmiter = new Subject<string>();

    getInputEmmiter(): Observable<string> {
        return this.subjectInputEmmiter.asObservable();
    }
    setInputEmmiter(value: string): void {
        this.subjectInputEmmiter.next(value);
    }
}