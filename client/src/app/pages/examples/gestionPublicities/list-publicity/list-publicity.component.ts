import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicityService } from 'src/app/shared/service/publicity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-publicity',
  templateUrl: './list-publicity.component.html',
  styleUrls: ['./list-publicity.component.scss']
})
export class ListPublicityComponent implements OnInit, OnDestroy{
  publicityList: any = []; 
  constructor(private pubService:PublicityService,private router: Router) { }

  readPublicity(){
    this.pubService.getPublicities().subscribe((data) => {
      this.publicityList = data;
      console.log (this.publicityList);
    })
    
        
  }
  onDelete(pub,index): any{
    if(window.confirm('Are you sure?')) {
      this.pubService.deletePublicity(pub._id).subscribe((data) =>{
        this.router.navigateByUrl('list-publicities');
        this.publicityList.splice(index,1);
      });
    }
  }
  ngOnInit(): void {
    this.readPublicity();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

}
