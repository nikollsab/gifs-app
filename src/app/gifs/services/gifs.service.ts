import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Gt5L5ORIET5NiBXFuYc43YPXvHb3xscY';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados : Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor( private http : HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query)){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);


      localStorage.setItem('historial', JSON.stringify(this.historial));
     
    }

    const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('q', query)
                      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
              .subscribe( (resp ) => {
                this.resultados = resp.data;
                localStorage.setItem('resultados', JSON.stringify(this.resultados));
              } );
  }


  
}
