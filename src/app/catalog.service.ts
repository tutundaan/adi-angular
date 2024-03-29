import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Catalog } from './request/catalog';
import { Advertise } from './response/advertise';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  protected base: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.base = 'http://adi-server.herokuapp.com/';
  }

  public index(guest: boolean = false) {
    let suffix = null;
    if (guest) {
      suffix = 'guest_catalogs.json';
      return this.http.get<Catalog[]>(this.base + suffix);
    } else {
      suffix = 'catalogs.json';
      const header = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'token': this.auth.currentUser().token
        })
      };
      return this.http.get<Catalog[]>(this.base + suffix, header);
    }
  }

  public show(slug: string, guest: boolean = false) {
    if (guest) {
      const suffix = `guest_catalogs/${slug}.json`;
      return this.http.get<Catalog>(this.base + suffix);
    } else {
      const suffix = `catalogs/${slug}.json`;
      const header = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'token': this.auth.currentUser().token
        })
      };
      return this.http.get<Catalog>(this.base + suffix, header);
    }
  }

  public create(request: Catalog) {
    const suffix = 'catalogs.json';
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.post<Catalog>(this.base + suffix, request, header);
  }

  public update(request: Catalog) {
    const suffix = `catalogs/${request.slug}.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.patch<Catalog>(this.base + suffix, request, header);
  }

  public destroy(catalog: Catalog) {
    const suffix = `catalogs/${catalog.slug}.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.delete<Catalog>(this.base + suffix, header);
  }

  public attach(catalog: Catalog, advertise: Advertise) {
    const suffix = `catalogs/${catalog.id}/advertises/${advertise.id}/attach.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.post<Catalog>(this.base + suffix, {}, header);
  }

  public detach(catalog: Catalog, advertise: Advertise) {
    const suffix = `catalogs/${catalog.id}/advertises/${advertise.id}/detach.json`;
    const header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.auth.currentUser().token
      })
    };
    return this.http.delete<Catalog>(this.base + suffix, header);
  }
}
