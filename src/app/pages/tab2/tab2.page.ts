import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment:IonSegment;


  category=['business','entertainment','general','health','science','sports','technology'];

  noticias: Article[]=[];

  constructor(public noticiasService: NoticiasService) {} 

  ngOnInit(){
    this.segment.value = this.category[0];
    this.chargeNotice(this.category[0]);
  }

  segmentChanged(event){
    this.noticias = [];
    this.chargeNotice(event.detail.value);
  }

  chargeNotice(category:string, event?){
    this.noticiasService.getTopHeadLinesCategory(category)
    .subscribe(res => {
      this.noticias.push(...res.articles);

      if(event){
        event.target.complete();
      }
    })
  }

  loadData(event){
    this.chargeNotice( this.segment.value, event );
  }

}
