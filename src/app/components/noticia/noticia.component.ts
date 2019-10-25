import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() inFavs;

  constructor(private iab: InAppBrowser,
              public  actionSheetController: ActionSheetController,
              public socialSharing: SocialSharing,
              public dataLocalService: DataLocalService  
  ) { }

  ngOnInit() {
   
  }

  openNotice(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async launchActionS(){

    let saveDeleteBtn;

    if(this.inFavs){
      saveDeleteBtn = {
        text: 'Delete',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete clicked');
          this.dataLocalService.deletNotice(this.noticia);
        }
      } 
    }else{
      saveDeleteBtn = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNotice(this.noticia)
        }
      } 
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
      {
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      saveDeleteBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }

}
