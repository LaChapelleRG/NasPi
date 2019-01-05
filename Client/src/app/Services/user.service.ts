import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../Models/Users';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `http://localhost:3000/users`;

  constructor(
    private http: HttpClient,
    private _messageService: MessageService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(p => this.log(`${p.length} user fetched`)),
        catchError(this.handleError('get user', []))
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((user: User) => this.log(`added user ${user.name} id=${user._id}`)),
        catchError(this.handleError<User>('add user'))
      );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user, httpOptions)
      .pipe(
        tap(_ => this.log(`updated user id=${user._id}`)),
        catchError(this.handleError<any>('update user'))
      );
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user._id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user ${user.name} id=${user._id}`)),
      catchError(this.handleError<User>('delete user'))
    );
  }

  private log(message: string) {
    this._messageService.add('HeroService: ' + message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }
}
