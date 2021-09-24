import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/environment';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MapboxOutput{
  attribution:string;
  features:Feature[];
  query:[];
}

export interface Feature{
  place_name:string;
  center:[];
}

export class Address {
  postcode:string='';
  coords:any[]=[]
}



@Injectable({
  providedIn: 'root'
})
export class MapboxserviceService {

  selectedAddress = new BehaviorSubject<Address>({postcode:'',coords:[]})

  // _selectedAddress:any = {
  //   postcode:'',
  //   coords: []

  // };

  constructor(private http:HttpClient) { }

  searchWord(query:string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get<MapboxOutput>(url + query+'.json?types=postcode&access_token='+environment.mapbox.accessToken).pipe(map((res:MapboxOutput) => {
      return res.features;
    }));
  }


}
