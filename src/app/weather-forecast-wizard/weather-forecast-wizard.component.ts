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
  count:number = 5;

  constructor(private _weatherService: WeatherService) { 
  }
  
  /* Method to get cities list on key press */
  fetchCities(searchWord:string){
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

  /* Method to get forecast for a city on user select */
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

  /* Method to get icon class names based on forecast code */
  getIcon(code:number){
    return WeatherIcons.ICON_CLASS[code];
  }

}
