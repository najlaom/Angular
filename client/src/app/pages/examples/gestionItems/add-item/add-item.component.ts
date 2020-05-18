import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/shared/service/item.service';
import { Router } from '@angular/router';
import { Partner } from 'src/app/shared/model/partner';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy{
  intitule : string;
  description: string;
  image: string ;
  partner: Partner; 
  imageUrl : string ='assets/img/upload-iconimg.jpg'; 
  fileToUpload : File = null ;
  constructor(private itemService: ItemService,private router: Router) { }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onRegister(){
    if (!this.intitule || !this.description || !this.partner 
          || !this.fileToUpload){
      console.log('all fields');
     // this._flash.show('Failure!', { cssClass: 'alert-danger' } );
      return false;
    }
     const article = {
      intitule: this.intitule,
      description : this.description,
      image: this.image,
      partner: localStorage.getItem('_id')
     }
     this.itemService.addarticle(article).subscribe(
      response => {
        this.router.navigate(['/article']);
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
