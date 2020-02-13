import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public getToken() {
    return localStorage.getItem("token");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public deleteToken() {
    localStorage.removeItem("token");
  }
}
