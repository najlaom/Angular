import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/shared/service/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, OnDestroy {

  Article: any = []; 
  constructor(private eventService: ItemService,private router: Router) { }
  readEvent(){
    this.eventService.getarticle().subscribe((data) => 
     this.Article = data);
    console.log (this.Article);    
  }
  onDelete(event,index): any{
    if(window.confirm('Are you sure?')) {
      this.eventService.deletearticle(event._id).subscribe((data) =>{
        this.router.navigateByUrl('/list-article');
        this.Article.splice(index,1);
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
