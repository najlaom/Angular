import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/shared/model/partner';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicityService } from 'src/app/shared/service/publicity.service';

@Component({
  selector: 'app-edit-publicity',
  templateUrl: './edit-publicity.component.html',
  styleUrls: ['./edit-publicity.component.scss']
})
export class EditPublicityComponent implements OnInit {
  isCollapsed = true;
  //Event: any = []; 
  namePublicity : string;
  description: string;
  partner: Partner; 
  data: any;
  constructor(private pubService: PublicityService ,
    private router: Router ,
     private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
       this.getPub(id);
  }
  onSubmit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    const pub = {
      namePublicity: this.namePublicity,
     description : this.description,
     partner: localStorage.getItem('_id')
    }
     this.pubService.updatePublicity(id, pub)
       .subscribe(res => {
         this.router.navigateByUrl('/list-article');
         console.log('Content updated successfully!')
       }, (error) => {
         console.log(error)
       })
   }
   getPub(id) {
    this.pubService.getPublicityById(id).subscribe(data => {
    //  this.data = data});
  console.log(data);
    
   });

}
}
