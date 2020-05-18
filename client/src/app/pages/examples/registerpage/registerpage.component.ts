import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { PartnerService } from 'src/app/shared/service/partner.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit {
  name: string ;
  managerName: string;
  email: string;
  password: string;
  adress: string; 
  phoneNumber: number;
  


  
  
  constructor(
    private _adminService: PartnerService,
    private _router: Router) {}

    onRegister(){
      if (!this.name || !this.managerName || !this.email || !this.password || !this.adress || !this.phoneNumber){
        console.log('all fields');
       // this._flash.show('Failure!', { cssClass: 'alert-danger' } );
        return false;
      }
       const partner = {
        name: this.name,
        managerName : this.managerName,
        email: this.email,
        password: this.password,
        adress: this.adress,
        phoneNumber :this.phoneNumber
       }
       this._adminService.createAccount(partner).subscribe(
        response => {
          this._router.navigate(['/login']);
         }, (error) => {
           if(error.status == 403){
             console.log({error : error})
           }
           if(error.status == 500){
             console.log({error  })
           }
  
         });
        }
 /* @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }*/

  ngOnInit() {
    /*var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);*/
  }
 /* ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }*/
}