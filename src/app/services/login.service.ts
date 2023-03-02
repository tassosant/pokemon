import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Trainer } from '../models/trainer.module';


const {apiTrainers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Dependency injection
  // We mark this as readonly because we never reinstantiate it
  // We mark this as privatte because we don't want the component to have direct access to the httpClient
  constructor(private readonly http: HttpClient) { }

    //Models, HttpClient, Observables and RxJS operators
    public login(username:string): Observable<Trainer> {
      return this.checkUsername(username)
        .pipe(
          switchMap((trainer: Trainer | undefined)=>{
            if(trainer===undefined){
              return this.createTrainer(username);
          }
          return of(trainer);
        }),
        //In order to save the response to storage we need to use tap
        //The tap method cannot alter the observable
        // tap((trainer: Trainer)=>{
        //     StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer);
        // })
      )
    }
    //Login
    
    //Check if user exists
    private checkUsername(username:String): Observable<Trainer | undefined>{
      return  this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`).pipe(
        //RxJS Operators
        map((response:Trainer[])=>response.pop())
      )
    }

    private createTrainer(username: string): Observable<Trainer>{
      //trainer
      const trainer = {
        username,
        pokemon:[]
      };
      
      //headers->API key
      const headers = new HttpHeaders({
        "Content-type": "application/json",
        "x-api-key" : apiKey
      });


      //POST -Create items on the server
      return this.http.post<Trainer>(apiTrainers, trainer, {headers})
    }

    //If NOT user - Create a user

    //If User || Created User -> store user

  
}
