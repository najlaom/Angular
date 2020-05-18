import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PartnerService } from 'src/app/shared/service/partner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Partner } from 'src/app/shared/model/partner';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  email: string;
  password: string;
  Partner: any = []; 
 
   
    constructor(
      private router: Router,
      private apiService: PartnerService,
      private actRoute: ActivatedRoute
      ) 
      {}

     

    ngOnInit() {
     
      //let id = this.actRoute.snapshot.paramMap.get('id');
    
    }
   
    onLogin(){
      const partner = {
        
        email: this.email,
        password: this.password
        
      }
      this.apiService.auth(partner).subscribe(      
        data => {
         console.log(data);
         localStorage.setItem('partner.managerName', data['body']['managerName'].toString());
         localStorage.setItem('partner.name', data['body']['name'].toString());
         localStorage.setItem('partner.adress', data['body']['adress'].toString());
         localStorage.setItem('partner.phoneNumber', data['body']['phoneNumber'].toString());
         localStorage.setItem('partner._id', data['body']['_id'].toString());
         this.router.navigate(['/profile'])

       },
       (error) => {
         if(error.status == 403){
           console.log({error : error})
         }
         if(error.status == 500){
           console.log({error  })
         }
         
       } 
         
         
   );
  }
}