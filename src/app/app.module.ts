import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ExamplePageComponent } from './example-page/example-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    ExamplePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
