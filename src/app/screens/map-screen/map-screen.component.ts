import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from 'src/app/services/GeoJson';
import { HeliumApiService } from 'src/app/services/helium.service';
import { environment } from 'src/app/utils/environment';

import { Address, MapboxserviceService } from 'src/app/services/mapboxservice.service';

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
  loading:boolean = true;
  delay = (ms:number) => new Promise((res) => setTimeout(res, ms));

  constructor(private router:ActivatedRoute,private heliumApi:HeliumApiService,private cdr: ChangeDetectorRef, private mapBoxService: MapboxserviceService) {

   }

   createMarker(coords:Array<number>,name?:string){

    console.log(`createMarker: ${coords}`);

    const newMarker = new mapboxgl.Marker().setLngLat([coords[0],coords[1]]).addTo(this.map);

   }

   initMap():void {

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

  async ngOnInit(){

    await this.userAddress()
    await this.getHotspotLocations(this.searchLocation);
    await this.delay(3000);
    this.loading =false;
    this.cdr.detectChanges();
    this.initMap();
    await this.addHotspotMarkers();

      
  }

  async userAddress(){

    if(this.mapBoxService.selectedAddress.value.coords.length){
      this.searchLocation = this.mapBoxService.selectedAddress.value.coords
    }

    else {
      await this.getCoordinates();
      }
  }


  async getCoordinates(){
    const para = this.router.snapshot.queryParamMap.get('find');
    if(!para){
      this.searchLocation = new Array<number>();
    }else{
      const wtWeGt = JSON.parse(para);
      if(Array.isArray(wtWeGt)){
        this.searchLocation = wtWeGt;
      }else{
        try{
          const searchRes = await this.mapBoxService.searchWord(wtWeGt).toPromise();
          let result = new Address();
          result.postcode = searchRes[0].place_name;
          result.coords = searchRes[0].center;
          this.mapBoxService.selectedAddress.next(result);
          await this.userAddress();
        }catch(err){
          console.log(`done fked it: ${err}`)
        }
      }
    }
  }

  async getHotspotLocations(coords:Array<number>){
    let hotspots = await this.heliumApi.getBlockchainHotspots(coords[1],coords[0]);

    hotspots.subscribe((response:any) =>{
      this.hotspotList = response.data;
      console.log(this.hotspotList)
    })
  }

  async addHotspotMarkers(){
    this.hotspotList.forEach((element:any) => {
      this.createMarker([element.lng,element.lat])
    });

  }

}
