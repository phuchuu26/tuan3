import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { QuanlyuserComponent } from './pages/quanlyuser/quanlyuser.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
// import { CustomFormsModule } from 'ngx-custom-validators';
import {NgxPaginationModule} from 'ngx-pagination';

// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonModule } from '@angular/material/button';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatInputModule } from '@angular/material/input';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

//A-material
import { MatCardModule } from '@angular/material/card';
//Flexbox
import { FlexLayoutModule } from '@angular/flex-layout';
//G-Mpas
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";

// rxJS store :
import { StoreModule } from '@ngrx/store';
import {  customerReducer } from './store/reducers/user.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './store/effects/user.effects';
// stripe

import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    // CustomFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    FlexLayoutModule,
    GooglePlaceModule,
    MatCardModule,
    // MatSliderModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatBadgeModule,
    // MatInputModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SnotifyModule,
    // StoreModule,
    // CustomFormsModule,

    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCL436G6FzMqnMpWjJjV60pTWBHqDa-QgI',
      // AIzaSyCUDMoEVgLbPnLLhNw4MTis5UpTfYhpuXM
      // AIzaSyD1t5PzKJxjMfMwhJFly6cgiTEALh4pE2Y
      libraries : ['places']
    }),
    // ReactiveFormComponent
    // ReactiveFormsModule,
    // StoreModule.forRoot({
    //   customers: customerReducer
    // }),
    // EffectsModule.forRoot([ShoppingEffects]),
    // StoreModule.forRoot("customers", customerReducer),
    // RouterModule.forChild(customerRoutes),
    // StoreModule.forFeature("customers", customerReducer),
    // StoreModule.forRoot({
      //   customers: customerReducer
      // }),
      StoreModule.forRoot({customers : customerReducer}),
      EffectsModule.forRoot([CustomerEffect]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      NgxStripeModule.forRoot('pk_test_52DU0HNaT3yQjlK5Mg5H6SER00DJsQHl0U')
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    QuanlyuserComponent,
    AdduserComponent,

  ],
  providers: [ { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  SnotifyService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
