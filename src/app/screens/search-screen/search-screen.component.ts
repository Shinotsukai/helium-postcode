import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature, MapboxserviceService } from 'src/app/services/mapboxservice.service';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})



export class SearchScreenComponent implements OnInit {

  constructor(private router:Router, private mapboxService:MapboxserviceService) { }

  // addresses: string[] = [];
  // coords:any[] =[];

  addresses:Feature[] = [];


  selectedAddress:any = {
    postcode:'',
    coords: []

  };



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
    this.selectedAddress.postcode = address;
    this.selectedAddress.coords = coord;
    this.addresses = [];
    console.log(this.selectedAddress)
 
  }


  searchLocation(){
    if(this.selectedAddress.postcode.length){
        const actuallyThePostcode = this.selectedAddress.postcode.split(',')[0].replace(' ','').toLowerCase();
        this.router.navigate(['search-results'], {queryParams:{find:JSON.stringify(actuallyThePostcode)}});
    }
  }
}
