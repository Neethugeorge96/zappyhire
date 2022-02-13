import { Injectable } from '@angular/core';
import { DBSchema, openDB,IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db!: IDBPDatabase<newDB>;

  constructor() {
    this.connectDb();
  }
  async connectDb(){
   this.db = await openDB<newDB>('zappyhire-DB', 1,{

      upgrade(db){
        db.createObjectStore('User-Store');
      },
      })
    }


  addData(data:any){
    return this.db.put('User-Store',data,'data')
  }


  getData(){
    return this.db.get('User-Store','data')
  }


  setToken(token:any){
    return this.db.put('User-Store',token,'token')
  }

  getToken(){
    return this.db.get('User-Store','token')
  }

  logout(){
    this.db.delete('User-Store','token')
  }

  isLoggedIn(){

    return !!this.db.get('User-Store','token');

  }

}

interface newDB extends DBSchema{
  'User-Store':{
    key:string;
    value:string
  }
}
