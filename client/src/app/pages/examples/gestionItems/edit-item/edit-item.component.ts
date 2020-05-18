import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/shared/model/partner';
import { ItemService } from 'src/app/shared/service/item.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  isCollapsed = true;
  //Event: any = []; 
  intitule : string;
  description: string;
  image: string ;
  isActive: Boolean;
  partner: Partner; 
  data: any;
  constructor(
    private eventService: ItemService ,
    private router: Router ,
     private actRoute: ActivatedRoute,
     ) { }
    
     imageUrl : string ='assets/img/default-img.jpeg'; 
     fileToUpload : File = null ;
     
     handleFileInput(file : FileList){
       this.fileToUpload = file.item(0);
       var reader = new FileReader();
       reader.onload = (event: any) => {
         this.imageUrl = event.target.result;
       }
       reader.readAsDataURL(this.fileToUpload);
     }
  
     
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
        intitule: this.intitule,
        description : this.description,
        image: this.image,
        isActive: this.isActive,
        partner: localStorage.getItem('_id')
       }
        this.eventService.updatearticle(id, event)
          .subscribe(res => {
            this.router.navigateByUrl('/list-article');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    
  
 
getEvent(id) {
  this.eventService.getarticleByID(id).subscribe(data => {
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
