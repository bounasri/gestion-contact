import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../model/users';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + '/users';
  constructor(private  httpClient: HttpClient) { }
  public getAll(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.url );
  }
  public save(user: Users): Observable<any> {
    return this.httpClient.post(this.url, user);
  }
  public update(user: Users): Observable<any> {
    return this.httpClient.put(this.url, user);
  }

  public delete(id): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public findById(id): Observable<Users> {
    return this.httpClient.get<Users>(this.url + '/' + id);
  }
}
