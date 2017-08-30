import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { City } from '../weather/city';
import { Forecast } from '../weather/forecast';
import { WeatherIcons } from '../weather/weather-icons';

@Component({
  selector: 'app-weather-forecast-wizard',
  templateUrl: './weather-forecast-wizard.component.html',
  styleUrls: ['./weather-forecast-wizard.component.scss']
})
export class WeatherForecastWizardComponent{
  
  cities:Array<City>;
  forecasts:Array<Forecast>;
  selectedCity:string;

  constructor(private _weatherService: WeatherService) { 
  }

  onCitySelected(option) {
    if(option && option.woeid){
      this.selectedCity = option.displayName;
      this._weatherService.getForecast(option.woeid).subscribe(
        forecasts=>{
          this.forecasts = forecasts;
        }
      )
    }
  }
  
  fetchCities(searchWord){
  	if(searchWord && searchWord.length > 2){
      this.selectedCity = null;
      this.forecasts = null;
  		this._weatherService.getCities(searchWord).subscribe(
    		cities=>{
    			this.cities = cities;
    		}
    	)
  	}
  }

  getIcon(code){
    return WeatherIcons.ICON_CLASS[code];
  }

}
