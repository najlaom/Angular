import { Component, OnInit, OnDestroy } from "@angular/core";
import Chart from "chart.js";
import { PartnerService } from 'src/app/shared/service/partner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-landingpage",
  templateUrl: "landingpage.component.html"
})
export class LandingpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  Event: any;
  constructor( private actRoute: ActivatedRoute,private eventService: PartnerService,) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.onDetails(id);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
  onDetails(id) : any {
    this.eventService.getEventByID(id)
      .subscribe((data) => {
      
      this.Event = data
       console.log(data); });
  }
 /* getEvent(id) {
    this.eventService.getEventByID(id).subscribe(data => {
      this.data = data});
  //console.log(data);
  
   }*/
}
