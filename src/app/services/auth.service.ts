import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //'http://localhost:5208/api/'

  private apiUrl = "";

  constructor(
    private http: HttpClient,
    @Inject("API_BASE_URL") private apiBaseUrl: string
  ) {
    this.apiUrl = this.apiBaseUrl + "Auth/";
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}login`, body).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }
      })
    );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
