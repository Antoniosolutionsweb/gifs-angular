import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

private apikey: string ='ZTC1w3eXhVY0UaJNC8Hud733SPME9fHC'
private serviceUrl: string ='https://api.giphy.com/v1/gifs'
private _historial: string[] = []

public resultado:Gif[]=[]

 get historial() {
  return [...this._historial];
 }

 constructor(private http: HttpClient){

  this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
 }
 buscarGifs(query:string =''){
  query = query.trim().toLocaleLowerCase();
  if(!this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10)
    localStorage.setItem('historial', JSON.stringify( this._historial )  );
  }

  const params = new HttpParams()
      .set('api_key',this.apikey)
      .set('limit', '9')
      .set('q', query)
  
  
  this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe((resp)=>{
          this.resultado = resp.data;
          localStorage.setItem('resultado', JSON.stringify( this.resultado ));
        })
  
 }  

}
