import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { WeatherService }  from './weather/weather.service';
import { FormsModule } from '@angular/forms';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { WeatherForecastWizardComponent } from './weather-forecast-wizard/weather-forecast-wizard.component';
import { TypeaheadComponent } from './common/typeahead/typeahead.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastWizardComponent,
    TypeaheadComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
