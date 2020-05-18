import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartnerService } from 'src/app/shared/service/partner.service';
import { Router } from '@angular/router';
import { Partner } from 'src/app/shared/model/partner';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.scss']
})
export class EventpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  
  title : string ;
  description: string;
  numberParticipants: number ;
  maxNumberParticipant: number ;
  startDate: Date;
  endDate: Date;
  address:string;
  partner : Partner;
  constructor  (private eventService: PartnerService,private router: Router){}
  
  
  onRegister(){
    if (!this.title || !this.description || !this.numberParticipants 
          || !this.maxNumberParticipant || !this.startDate || !this.endDate){
      console.log('all fields');
     // this._flash.show('Failure!', { cssClass: 'alert-danger' } );
      return false;
    }
     const event = {
      title: this.title,
      description : this.description,
      numberParticipants: this.numberParticipants,
      maxNumberParticipant: this.maxNumberParticipant,
      startDate: this.startDate,
      endDate :this.endDate,
      address :this.address,
      partner: localStorage.getItem('partner._id')
     }
     this.eventService.addEvents(event).subscribe(
      response => {
        this.router.navigate(['/profile']);
       }, (error) => {
         if(error.status == 403){
           console.log({error : error})
         }
         if(error.status == 500){
           console.log({error  })
         }

       });
      }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

}
