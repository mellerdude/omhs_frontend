import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Task {
  id: string;
  title: string;
}

export interface BoardList {
  id: string;
  title: string;   
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  lists: BoardList[];
}

export interface Kanban {
  boards: Board[];
}


@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private baseUrl = `${environment.apiUrl}/kanban`;

  constructor(private http: HttpClient) {}

  getKanban(): Observable<Kanban> {
    return this.http.get<Kanban>(this.baseUrl);
  }

  updateKanban(data: Kanban): Observable<any> {
  return this.http.put(this.baseUrl, {
    data
  });
}
}
