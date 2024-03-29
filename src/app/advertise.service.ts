import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Advertise } from './response/advertise';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {
  protected base: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.base = 'http://adi-server.herokuapp.com/';
  }

  public index() {
    const suffix = 'advertises.json';
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.get<Advertise[]>(this.base + suffix, header);
  }

  public create(request: Advertise) {
    const suffix = 'advertises.json';
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.post<Advertise>(this.base + suffix, request, header);
  }

  public update(current: Advertise, request: Advertise) {
    const suffix = `advertises/${current.id}.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.patch<Advertise>(this.base + suffix, request, header);
  }

  public destroy(request: Advertise) {
    const suffix = `advertises/${request.id}.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.delete<Advertise>(this.base + suffix, header);
  }
}
