import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/api';

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
    }

    post<T, B = unknown>(endpoint: string, body: B): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
    }

    delete<T>(id: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${id}`);
    }
}