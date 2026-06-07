import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoaderService } from './../../services/loader.service';
import { LoaderInterceptorService } from './../../interceptors/loader-interceptor.service';

import { SelectDropDownModule } from 'ngx-select-dropdown';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,

    SelectDropDownModule,
  ],
  exports: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
