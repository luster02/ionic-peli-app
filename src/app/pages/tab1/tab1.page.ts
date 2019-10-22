import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
   
  noticias: Article[] = [];

  constructor(public noticiasServices: NoticiasService) {}

  ngOnInit(){
    this.loadNews();
  }

  loadData(event){
    this.loadNews(event);
  }

  loadNews(event?){
    this.noticiasServices.getTopHeadLines()
      .subscribe(res => {
        if(res.articles.length===0){
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push(...res.articles);

        if(event){
          event.target.complete();
        }

      });
  }

}
