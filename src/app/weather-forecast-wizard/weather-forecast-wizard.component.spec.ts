import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, ResponseOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { WeatherForecastWizardComponent } from './weather-forecast-wizard.component';
import { TypeaheadComponent } from '../common/typeahead/typeahead.component';
import { WeatherService } from '../weather/weather.service';
import { City } from '../weather/city';
import { Forecast } from '../weather/forecast';
import 'rxjs/add/observable/of';

describe('WeatherForecastWizardComponent', () => {
  let component: WeatherForecastWizardComponent;
  let fixture: ComponentFixture<WeatherForecastWizardComponent>;
  let weatherService:WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherForecastWizardComponent, TypeaheadComponent ],
      imports: [FormsModule, HttpModule],
      providers: [
        WeatherService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastWizardComponent);
    weatherService = TestBed.get(WeatherService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cities', () => {
    let city = new City();
    city.displayName = 'Sydney, Australia';
    city.woeid =1105779;
    const cities = [city];
    spyOn(weatherService, "getCities").and.returnValue(Observable.of(cities));
    component.fetchCities('sydn');
    expect(component.selectedCity).toBe(null);
    expect(component.forecasts).toBe(null);
    expect(weatherService.getCities).toHaveBeenCalled();
    expect(component.cities).toBe(cities);
  });

  it('should not fetch cities if string is lessthan 3 digits', () => {
    let city = new City();
    city.displayName = 'Sydney, Australia';
    city.woeid =1105779;
    const cities = [city];
    spyOn(weatherService, "getCities").and.returnValue(Observable.of(cities));
    component.fetchCities('sy');
    expect(weatherService.getCities).not.toHaveBeenCalled();
    expect(component.cities).toBeUndefined();
  });

  it('should fetch forecast for woeid', () => {
    let forecast:Forecast = new Forecast();
    const forecasts = [forecast];
    spyOn(weatherService, "getForecast").and.returnValue(Observable.of(forecasts));
    component.onCitySelected({displayName:'Sydney', woeid:12345});
    expect(weatherService.getForecast).toHaveBeenCalled();
    expect(component.selectedCity).toBe('Sydney');
    expect(component.forecasts).toEqual(forecasts);
  });

  it('should get weather icon', () => {
    let result = component.getIcon(23);
    expect(result).toBe('wi-windy');
  });

});