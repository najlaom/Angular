import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/shared/service/partner.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/shared/model/event';

@Component({
  selector: 'app-listeventpage',
  templateUrl: './listeventpage.component.html',
  styleUrls: ['./listeventpage.component.scss']
})
export class ListeventpageComponent implements OnInit {
  Event: any = []; 
  constructor(private eventService: PartnerService,private router: Router) { }
  readEvent(){
    this.eventService.getEvents().subscribe((data) => 
     this.Event = data);
    console.log (this.Event);    
  }
  onDelete(event,index): any{
    if(window.confirm('Are you sure?')) {
      this.eventService.deleteEvent(event._id).subscribe((data) =>{
        this.router.navigateByUrl('/list-event');
        this.Event.splice(index,1);
      });
    }
  }
   

  ngOnInit() {
    this.readEvent();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }


}
