import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from 'src/app/services/GeoJson';
import { HeliumApiService } from 'src/app/services/helium.service';
import { environment } from 'src/app/utils/environment';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

  searchLocation:Array<number> = [];

  map!:mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  markers:any;
  hotspotList:any;

  constructor(private router:ActivatedRoute,private heliumApi:HeliumApiService,private cdr: ChangeDetectorRef) {

    const coords = this.router.snapshot.queryParamMap.get('coord');

    if(!coords){
      this.searchLocation = new Array<number>();
    } else {
      this.searchLocation = JSON.parse(coords);

    }

   }

   createMarker(coords:Array<number>,name?:string){

    console.log(coords);

    const newMarker = new mapboxgl.Marker().setLngLat([coords[0],coords[1]]).addTo(this.map);

    //  const newMarker = new GeoJson(coords,{message:'location'});
    //  console.log(newMarker)
    //  this.markers.push(newMarker);
   }

  async ngOnInit(){

    await this.getHotspotLocations(this.searchLocation);




      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.searchLocation[0], this.searchLocation[1]]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.createMarker(this.searchLocation);
  }

  async getHotspotLocations(coords:Array<number>){
    let hotspots = await this.heliumApi.getBlockchainHotspots(coords[1],coords[0]);

    hotspots.subscribe((response:any) =>{
      this.hotspotList = response.data;
      console.log(this.hotspotList)
      this.hotspotList.forEach((element:any) => {
        this.createMarker([element.lng,element.lat])
      });

      this.cdr.detectChanges();
    })
  }

}
