import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, Feature, MapboxserviceService } from 'src/app/services/mapboxservice.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})



export class SearchScreenComponent implements OnInit {

  constructor(private router:Router, private mapboxService:MapboxserviceService) {

   }



  addresses:Feature[] = [];

  selectedAddress:any = this.mapboxService.selectedAddress;


  ngOnInit(): void {
  }

  findAddress(event:any){
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0){
      this.mapboxService.searchWord(searchTerm).subscribe((features:Feature[])=>{
     this.addresses = features;
      });
    } else {
      this.addresses = [];
    }
  }

  onAddressSelect(address:string,coord:[]){
    let selected = new Address();
    selected.postcode = address;
    selected.coords = coord;
    this.mapboxService.selectedAddress.next(selected)
    this.addresses = [];
    console.log(this.mapboxService.selectedAddress)
 
  }


  searchLocation(){
    if(this.mapboxService.selectedAddress.value.postcode.length){
        this.router.navigate(['search-results']);
    }
  }
}
