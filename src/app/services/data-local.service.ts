import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../models/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias:Article[]=[];

  constructor(private storage: Storage, public toastController: ToastController) { 
    this.getNotice();
  }

  async saveNotice(noticia:Article){

    const exist = this.noticias.find( noti => noti.title === noticia.title);
    if(!exist){
      this.noticias.unshift(noticia);
      this.storage.set('favs', this.noticias);
      const toast = await this.toastController.create({
        message: 'Saved',
        duration: 2000
      });
      toast.present();
    }
    
  }

  async getNotice(){
    const favs = await this.storage.get('favs');
    if(favs){
      this.noticias = favs;
      
    }
  }

  async deletNotice( noticia:Article ){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favs', this.noticias);
    const toast = await this.toastController.create({
      message: 'Deleted',
      duration: 2000
    });
    toast.present();
  }

}
