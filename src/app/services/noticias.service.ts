import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResTopHeadLines } from '../models/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.ApKey; 
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  numberPage = 0;
  currentCategory = '';
  categoryPage=0;

  constructor(private http:HttpClient) { }

  private Query<T>(query:string){
    
    query = apiUrl + query
    return this.http.get<T>(query,{headers})
  }

  getTopHeadLines(){
    this.numberPage++;
    return this.Query<ResTopHeadLines>(`/top-headlines?country=us&page=${this.numberPage}`);
  }

  getTopHeadLinesCategory(category:string){
    if(this.currentCategory === category){
      this.categoryPage++;
    }else{
      this.categoryPage = 1; 
      this.currentCategory = category;
    }
    return this.Query<ResTopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
  }
}
