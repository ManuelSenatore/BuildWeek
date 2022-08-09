import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse, SignUp, user, UserLogin } from './post';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url =  "http://localhost:3000/api/";

  logged = false;


  helper = new JwtHelperService();


  authSub = new BehaviorSubject<false | UserLogin>(false);
  authObs = this.authSub.asObservable();

  constructor(private http: HttpClient) {
    this.authObs.subscribe((res)=> {
      this.logged = res ? true : false
    })
    // if(localStorage.getItem("token"){
    //     this.logged = true //per rimanere loggati se un token è prsente
    // }
  }

  login(user: UserLogin) {
    this.http.post<AuthResponse>(this.url + "login", user).subscribe((res) => {
      console.log("login OK");
      localStorage.setItem("token", res.accessToken);
      this.authSub.next(res.user);
    })
  }

  signUp(user: SignUp) {
    this.http.post<AuthResponse>(this.url + 'signup', user).subscribe((res) => {
      console.log('signup OK');
      localStorage.setItem('token', res.accessToken);
      this.authSub.next(res.user);
    });
  }

  logout() { // revisionare
    localStorage.removeItem('token');
    this.authSub.next(false);
  }

  whoIsLogged(){
    if(localStorage.getItem("token")){
      let token = localStorage.getItem("token")
      return this.http.get<AuthResponse>(this.url + "user/" + this.helper.decodeToken(token!).email)
    }else{ return console.log("nessun token trovato")}
  }

  isAuth(): boolean {
    let t = localStorage.getItem('token');
    if (t) {
      return true;
    }
    return false;
  }
}
