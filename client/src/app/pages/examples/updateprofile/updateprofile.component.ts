import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/shared/service/partner.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {
  managerName: string;
  name: string;
  phoneNumber: number;
  adress: string;
  email: string;
  
  constructor(
    private eventService: PartnerService ,
    private router: Router ,
     private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  onSubmit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    const partner = {
     managerName: this.managerName,
     name : this.name,
     phoneNumber: this.phoneNumber,
     adress: this.adress,
     email: this.email,
     
    }
     this.eventService.updateProfile(id, partner)
       .subscribe(res => {
         this.router.navigateByUrl('/profile');
         console.log('Content updated successfully!')
       }, (error) => {
         console.log(error)
       })
   }
}
