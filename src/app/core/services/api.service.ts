import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getBoards() {
    return this.http.get(`${this.base}/boards`);
  }

  getTasks(boardId: string) {
    return this.http.get(`${this.base}/boards/${boardId}/tasks`);
  }
}
