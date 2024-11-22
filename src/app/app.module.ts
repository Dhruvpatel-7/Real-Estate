import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesdetailsComponent } from './propertiesdetails/propertiesdetails.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { PropformComponent } from './propform/propform.component';
import { FormsModule } from '@angular/forms';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { TermsandconComponent } from './termsandcon/termsandcon.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    PropertiesComponent,
    PropertiesdetailsComponent,
    GalleryComponent,
    ContactComponent,
    DashboardComponent,
    AdminpanelComponent,
    PropformComponent,
    AdminpanelComponent,
    TermsandconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: tokenInterceptor,
    multi: true,
  },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
