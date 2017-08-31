import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, ResponseOptions, Response, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { City } from './city';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  	beforeEach(() => {
    	TestBed.configureTestingModule({
    		imports: [HttpModule],
      		providers: [
      			WeatherService,
            	{ provide: XHRBackend, useClass: MockBackend }
        	]
    	});
  	});

  	it('should be created', inject([WeatherService], (service: WeatherService) => {
    	expect(service).toBeTruthy();
  	}));

	it('should fetch cities', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {
		const mockResponse = {
			"query":{
				"results":{
					"place":[ 
						{"name":"Sydney","country":{"code":"AU","type":"Country","woeid":"23424748","content":"Australia"},"woeid":1105779}
					]
				}
			}
		};
		let city = new City();
		city.displayName = 'Sydney, Australia';
		city.woeid =1105779;
		const expectedResult = [city];

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockRespond(new Response(new ResponseOptions({
	        	body: JSON.stringify(mockResponse)
	    	})));
		});

		weatherService.getCities("syd").subscribe(
			cities=>{
				expect(cities).toEqual(expectedResult);
			}
		)
	}));

	it('should not fetch cities for invalid search word', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {

		let response = weatherService.getCities("syd1")
		expect(response).toEqual(Observable.empty());
			
	}));

	it('should return empty list on success response  on fetch cities but unexpected json', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {

		const mockResponse = {
			"query":{
				"item":{
					"place":[ 
						{"name":"Sydney","country":{"code":"AU","type":"Country","woeid":"23424748","content":"Australia"},"woeid":"1105779"}
					]
				}
			}
		};

		const expectedResult = [];

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockRespond(new Response(new ResponseOptions({
	        	body: JSON.stringify(mockResponse)
	    	})));
		});

		weatherService.getCities("syd").subscribe(
			cities=>{
				expect(cities).toEqual(expectedResult);
			}
		)
			
	}));

	it('should log the error and throw exception on error on fetch cities', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {

		const expectedResult = "Unexpected service failure. Please try again later.";

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockError(new Error('some unexpected error'));
		});

		weatherService.getCities("syd").subscribe(
			cities=>{},
			error => {
				expect(error).toEqual(expectedResult);
			} 
		)
			
	}));

	it('should fetch forecast', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {
		const mockResponse = {
			"query":{
				"results":{ 
					"channel":{
						"item":{
							"forecast":[ 
								{"code":"30","date":"30 Aug 2017","day":"Wed","high":"63","low":"40","text":"Partly Cloudy"},
								{"code":"34","date":"31 Aug 2017","day":"Thu","high":"65","low":"43","text":"Mostly Sunny"}
							]
						}
					}
				}
			}
		};

		const expectedResult = [{"code":"30","date":new Date("30 Aug 2017"),"day":"Wed","high":"63","low":"40","text":"Partly Cloudy"},
								{"code":"34","date":new Date("31 Aug 2017"),"day":"Thu","high":"65","low":"43","text":"Mostly Sunny"}];

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockRespond(new Response(new ResponseOptions({
	        	body: JSON.stringify(mockResponse)
	    	})));
		});

		weatherService.getForecast(1105779).subscribe(
			forecast=>{
				expect(forecast).toEqual(expectedResult);
			}
		)
	}));

	it('should not fetch forecast for invalid woeid', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {
		let woeid:number;
		let response = weatherService.getForecast(woeid)
		expect(response).toEqual(Observable.empty());
	}));

	it('should return empty list on fetch forecast success response but unexpected json', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {

		const mockResponse = {
			"query":{
				"results":{ 
					"channel":{
						"item":[ 
							{"code":"30","date":"30 Aug 2017","day":"Wed","high":"63","low":"40","text":"Partly Cloudy"},
							{"code":"34","date":"31 Aug 2017","day":"Thu","high":"65","low":"43","text":"Mostly Sunny"}
						]
					}
				}
			}
		};

		const expectedResult = [];

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockRespond(new Response(new ResponseOptions({
	        	body: JSON.stringify(mockResponse)
	    	})));
		});

		weatherService.getForecast(1105779).subscribe(
			forecast=>{
				expect(forecast).toEqual(expectedResult);
			}
		)
			
	}));

	it('should log the error and throw exception on error of fetch forecast', inject([WeatherService, XHRBackend], (weatherService: WeatherService, mockBackend: MockBackend) => {

		const expectedResult = "Unexpected service failure. Please try again later.";

		mockBackend.connections.subscribe((connection) => {
	    	connection.mockError(new Error('some unexpected error'));
		});

		weatherService.getForecast(1105779).subscribe(
			forecast=>{},
			error => {
				expect(error).toEqual(expectedResult);
			} 
		)
			
	}));

});