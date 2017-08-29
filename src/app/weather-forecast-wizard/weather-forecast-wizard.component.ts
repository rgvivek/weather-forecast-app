import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service'
import { City } from '../weather/city'

@Component({
  selector: 'app-weather-forecast-wizard',
  templateUrl: './weather-forecast-wizard.component.html',
  styleUrls: ['./weather-forecast-wizard.component.scss']
})
export class WeatherForecastWizardComponent{
  
  cities:Array<City>;
  constructor(private _weatherService: WeatherService) { 
  }

  onCitySelected(option) {
    console.log("fousss");
  }
  
  fetchCities(searchWord){
  	if(searchWord && searchWord.length > 2){
  		this._weatherService.getCities(searchWord).subscribe(
    		cities=>{
    			this.cities = cities;
    		}
    	)
  	}
  }

}
