import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/shared/service/map.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/shared/service/partner.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  Event: any = []; 

  constructor(private actRoute: ActivatedRoute,private eventService: PartnerService , private router: Router ,private map: MapService) { }
ngOnInit() {
//this.readEvent();
let id = this.actRoute.snapshot.paramMap.get('id');
 this.onDetails(id)

}
Onload(){
}
/*readEvent(){
  this.eventService.getEvents().subscribe(data => {
    this.Event = data
    console.log(this.Event)
    
    for (let i = 0; i < this.Event.length; i++) {
      console.log(this.Event[i]['zone']['coordinates'][1], ' + ',
        this.Event[i]['zone']['coordinates'][0])
        this.map.buildMap(this.Event[i]['zone']['coordinates'][1],
        this.Event[i]['zone']['coordinates'][0],
        
      )
    }
    
  });
}*/
onDetails(id)  {
  this.eventService.getEventByID(id)
    .subscribe((data) => {
    
    this.Event = data
     console.log(data)
    
      /*console.log(this.Event[i]['zone']['coordinates'][1], ' + ',
        this.Event[i]['zone']['coordinates'][0])*/
        this.map.buildMap(this.Event['zone']['coordinates'][1],
        this.Event['zone']['coordinates'][0],
        this.Event['title']
      )
    
   

    });
}
}
