import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class HeliumApiService {

    API_KEY = 'mfsF6sdyQB/6oPJY7eECZGeFnQOEsKRc2bnaiXV7R5g';
    blockchain_base = 'https://api.helium.io/v1/';
    org_base = 'https://console.helium.com/api/v1/';
    stats:any;
    hotspots:any;
  
  constructor(private http:HttpClient) {
  }


  public async  getBlockchainHotspots(lat:number,lng:number){
      return await this.http.get(`${this.blockchain_base}hotspots/location/distance?lat=${lat}&lon=${lng}&distance=500`);
  }

 
}
