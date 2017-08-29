import { Component } from '@angular/core';
import { WeatherService } from './weather/weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  constructor(private _weatherService: WeatherService) { 
  	_weatherService.getCities("syd1").subscribe(
  		cities=>{
  			alert(JSON.stringify(cities));
  		}
  	)

  	_weatherService.getForecast(1105779).subscribe(
  		forecast=>{
  			alert(JSON.stringify(forecast));
  		}
  	)

  	
  }

}
