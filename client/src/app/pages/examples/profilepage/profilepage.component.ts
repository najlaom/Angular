import { Component, OnInit, OnDestroy } from "@angular/core";
import { PartnerService } from 'src/app/shared/service/partner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/shared/service/map.service';
import { Partner } from 'src/app/shared/model/partner';
@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit ,OnDestroy  {
  isCollapsed = true;
  managerName =''
  name ='';
  address ='';
  phoneNumber ='';
  _id= '';
 
  constructor(private map: MapService ,
              private partnerService: PartnerService,
              private router: Router,
              private actRoute: ActivatedRoute) { }
 
  


 
 
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
  ngOnInit() {
    
    this.managerName = localStorage.getItem('partner.managerName')
    this.name = localStorage.getItem('partner.name')
    this.address = localStorage.getItem('partner.adress')
    this.phoneNumber = localStorage.getItem('partner.phoneNumber')
    this._id = localStorage.getItem('partner._id')
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    
  }
  logout(){
    localStorage.removeItem('partner._id');
    console.log(localStorage.getItem('partner._id'))
    this.router.navigate(['/login']);
  }
    
 
}
