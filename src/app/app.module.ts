import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AccueilComponent } from "./accueil/accueil.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProblemeComponent } from "./probleme/probleme.component";
import { ProblemeData } from "./probleme/probleme-data";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
