import { Component, OnInit, OnDestroy } from '@angular/core';
import { Partner } from 'src/app/shared/model/partner';
import { Router } from '@angular/router';
import { PublicityService } from 'src/app/shared/service/publicity.service';

@Component({
  selector: 'app-add-publicity',
  templateUrl: './add-publicity.component.html',
  styleUrls: ['./add-publicity.component.scss']
})
export class AddPublicityComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  
  namePublicity : string ;
  description: string;
  startDate: Date;
  endDate: Date;
  url:string;
  partner: Partner;
  constructor(private _pubService: PublicityService,private router: Router) { }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
  onRegister(){
    if (!this.namePublicity || !this.description || !this.url 
           || !this.startDate || !this.endDate){
      console.log('all fields');
     // this._flash.show('Failure!', { cssClass: 'alert-danger' } );
      return false;
    }
     const publicity = {
      namePublicity: this.namePublicity,
      description : this.description,
      url: this.url,
      startDate: this.startDate,
      endDate :this.endDate,
      partner: localStorage.getItem('_id')
      
     }
     this._pubService.addPublicities(publicity).subscribe(
      data => {
      console.log(data)
      console.log(localStorage)
        this.router.navigate(['/list-publicities']);
       }, (error) => {
         if(error.status == 403){
           console.log({error : error})
         }
         if(error.status == 500){
           console.log({error  })
         }

       });
      }


}
