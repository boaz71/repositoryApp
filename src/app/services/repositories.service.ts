import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  private apiUrl = '' ; //'http://localhost:5208/api/Repository/'; 

  token:string='';

  constructor(private http: HttpClient,@Inject('API_BASE_URL') private apiBaseUrl: string) {
    this.apiUrl=this.apiBaseUrl+'Repository/';
  }


  

  searchRepositories(keyword: string): Observable<any> {
    let token=localStorage.getItem("token")?.toString();
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    debugger;

    return this.http.get<any>(`${this.apiUrl}search?keyword=${keyword}`, { headers });
  }
}
