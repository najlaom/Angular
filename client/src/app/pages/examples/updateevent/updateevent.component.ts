import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartnerService } from 'src/app/shared/service/partner.service';
import { Event } from 'src/app/shared/model/event';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.scss']
})
export class UpdateeventComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  //Event: any = []; 
  title : string ;
  description: string;
  numberParticipants: number ;
  maxNumberParticipant: number ;
  startDate: Date;
  endDate: Date;
  address:string;
  data: any;
  constructor(
    private eventService: PartnerService ,
    private router: Router ,
     private actRoute: ActivatedRoute,
     ) { }
    
    
     ngOnInit() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.add("profile-page");
      let id = this.actRoute.snapshot.paramMap.get('id');
       this.getEvent(id);
   
    }
    // Getter to access form control
  
    ngOnDestroy() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("profile-page");
    }
  
      onSubmit() {
       let id = this.actRoute.snapshot.paramMap.get('id');
       const event = {
        title: this.title,
        description : this.description,
        numberParticipants: this.numberParticipants,
        maxNumberParticipant: this.maxNumberParticipant,
        startDate: this.startDate,
        endDate :this.endDate,
        address :this.address
       }
        this.eventService.updateEvent(id, event)
          .subscribe(res => {
            this.router.navigateByUrl('/list-event');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    
  
 
getEvent(id) {
  this.eventService.getEventByID(id).subscribe(data => {
  //  this.data = data});
console.log(data);
  
 });
}
 /*onSubmit() {
  
    if (window.confirm('Are you sure?')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.eventService.updateEvent(id, this.Event.value)
        .subscribe(res => {
          this.router.navigateByUrl('/list-event');
          console.log('Content updated successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }*/
  
  
 
}
