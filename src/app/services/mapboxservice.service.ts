import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utils/environment';
import {map} from 'rxjs/operators';

export interface MapboxOutput{
  attribution:string;
  features:Feature[];
  query:[];
}

export interface Feature{
  place_name:string;
  center:[];

}

@Injectable({
  providedIn: 'root'
})
export class MapboxserviceService {

  constructor(private http:HttpClient) { }

  searchWord(query:string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get<MapboxOutput>(url + query+'.json?types=postcode&access_token='+environment.mapbox.accessToken).pipe(map((res:MapboxOutput) => {
      return res.features;
    }));
  }
}
