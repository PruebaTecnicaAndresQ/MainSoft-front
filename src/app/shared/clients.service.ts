import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ClientsDto } from './Models/ClientsDto';
import { Observable } from 'rxjs';
import { AdvancedSearchDto } from './Models/AdvancedSearchDto';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  _apiServer = environment.serverApi;
  _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  constructor(private http: HttpClient) { }


  getAll(): Observable<HttpResponse<ClientsDto[]>> {
    return this.http.get<ClientsDto[]>(`${this._apiServer}clients/getAll`,
      { headers: this._headers, observe: 'response' })
  }
  getByshared(SharedKey: string): Observable<HttpResponse<ClientsDto[]>> {
    return this.http.get<ClientsDto[]>(`${this._apiServer}clients/findBySharedKey?sharedKey=${SharedKey}`,
      { headers: this._headers, observe: 'response' })
  }
  advanceSearch(request:AdvancedSearchDto): Observable<HttpResponse<ClientsDto[]>> {
    return this.http.post<ClientsDto[]>(`${this._apiServer}clients/advanteSearch`,
      JSON.stringify(request),{ headers: this._headers, observe: 'response' })
  }
  createClient(request:ClientsDto){
    return this.http.post<ClientsDto>(`${this._apiServer}clients/saveClient`,
      JSON.stringify(request),{ headers: this._headers, observe: 'response' })
  }
}
