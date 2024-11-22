import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesdetailsComponent } from './propertiesdetails/propertiesdetails.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PropformComponent } from './propform/propform.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { TermsandconComponent } from './termsandcon/termsandcon.component';

const routes: Routes = [
  { path:'', component: IndexComponent ,},
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'prop', component: PropertiesComponent},
  { path:'propdet', component: PropertiesdetailsComponent },
  { path:'gallery', component: GalleryComponent},
  { path:'contact', component: ContactComponent},
  { path:'dashboard', component: DashboardComponent},
  { path:'ad1', component: AdminpanelComponent},
  { path:'propform', component: PropformComponent},
  { path:'t&c', component: TermsandconComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
