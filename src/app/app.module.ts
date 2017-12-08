import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainNavbarComponent } from './shared/components/main-navbar/main-navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CoinComponent } from './shared/components/coin/coin.component';
import { CoinFormComponent } from './shared/components/coin-form/coin-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    FooterComponent,
    CoinFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
