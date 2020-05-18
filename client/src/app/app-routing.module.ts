import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { LoginpageComponent } from "./pages/examples/loginpage/loginpage.component";
import { EventpageComponent } from "./pages/examples/eventpage/eventpage.component";
import { ListeventpageComponent } from './pages/examples/listeventpage/listeventpage.component';
import { MapComponent } from './pages/examples/map/map.component';
import { UpdateeventComponent } from './pages/examples/updateevent/updateevent.component';
import { UpdateprofileComponent } from './pages/examples/updateprofile/updateprofile.component';
import { AddItemComponent } from './pages/examples/gestionItems/add-item/add-item.component';
import { ListItemComponent } from './pages/examples/gestionItems/list-item/list-item.component';
import { AddPublicityComponent } from './pages/examples/gestionPublicities/add-publicity/add-publicity.component';
import { ListPublicityComponent } from './pages/examples/gestionPublicities/list-publicity/list-publicity.component';
import { EditPublicityComponent } from './pages/examples/gestionPublicities/edit-publicity/edit-publicity.component';
import { EditItemComponent } from './pages/examples/gestionItems/edit-item/edit-item.component';



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing/:id", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "event", component: EventpageComponent },
  { path: "list-event", component: ListeventpageComponent },
  {path: "maplist/:id", component: MapComponent},
  {path: "update-event/:id", component: UpdateeventComponent},
  {path: "updateprofile/:id", component: UpdateprofileComponent},
  {path: "item", component: AddItemComponent},
  {path: "list-items", component: ListItemComponent},
  {path: "update-item/:id", component: EditItemComponent},
  {path: "publicity", component: AddPublicityComponent},
  {path: "list-publicities", component: ListPublicityComponent},
  {path: "update-publicity/:id",component: EditPublicityComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
