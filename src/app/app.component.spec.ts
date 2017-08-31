import { TestBed, async } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, ResponseOptions, Response, Headers } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routing } from './app.routing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {APP_BASE_HREF} from '@angular/common';

import { WeatherService } from './weather/weather.service';

import { AppComponent } from './app.component';
import { TypeaheadComponent } from './common/typeahead/typeahead.component';
import { WeatherForecastWizardComponent } from './weather-forecast-wizard/weather-forecast-wizard.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TypeaheadComponent,
        WeatherForecastWizardComponent
      ],
      imports: [HttpModule, FormsModule, Routing],
      providers: [
        WeatherService,
        {provide: APP_BASE_HREF, useValue : '/' },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  
});
