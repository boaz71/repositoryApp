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

  logout() {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getString(): Observable<any> {
    return this.http.get(`${this.apiUrl}GetString`);
  }
}
