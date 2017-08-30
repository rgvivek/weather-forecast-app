import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import { City } from './city';
import { Forecast } from './forecast';

@Injectable()
export class WeatherService {
	private _baseUrl:string = "https://query.yahooapis.com/v1/public/yql?q=";
	private _getCitiesQueryTemplate:string = "select woeid,country,name from geo.places where text = 'SEARCH_STRING*' and placetype='Town'&format=json";
	private _getForecastQueryTemplate:string ="select item from weather.forecast where woeid = WOEID_VALUE and u='c'&format=json";
	private _alphabetOnlyRegex = /^[a-z]+$/i;
  	constructor(private _http: Http) { }

  	getCities(searchWord:string):Observable<any>{
  		if(!!searchWord && searchWord.length > 2 && this._alphabetOnlyRegex.test(searchWord)){
  			let queryString = this._getCitiesQueryTemplate.replace('SEARCH_STRING', searchWord);
  			return this._http.get( `${this._baseUrl}${queryString}`).map(this._extractCities.bind(this))
                    .catch(this._handleError);
  		}
  		return Observable.empty();
  	}

  	getForecast(woeid:number):Observable<any>{
  		if(!!woeid){
  			let queryString = this._getForecastQueryTemplate.replace('WOEID_VALUE', woeid.toString());
  			return this._http.get( `${this._baseUrl}${queryString}`).map(this._extractForecast.bind(this))
                    .catch(this._handleError);
  		}
  		return Observable.empty();
  	}

  	private _extractCities(res: Response):Array<City> {
		let body = res.json();
		let cities:Array<City> = new Array<City>();
		if(this._isValidGetCitiesResponse(body)){
			let result = body.query.results.place;
			if(result instanceof Array){
				for(let city of result){
					cities.push(this._extractCity(city));
				}
			}else if(result instanceof Object){
				cities.push(this._extractCity(result));
			}
		}
		return cities;
	}

	private _isValidGetCitiesResponse(resBody:any):boolean{
		return !!resBody && !!resBody.query && !!resBody.query.results && !!resBody.query.results.place;
	}

	private _extractCity(rawCity:any):City{
		let city:City = new City();
		city.displayName = `${rawCity.name}, ${rawCity.country.content}`;
		city.woeid = rawCity.woeid;
		return city;
	}

	private _extractForecast(res: Response):Array<Forecast> {
		let body = res.json();
		let forecast:Array<Forecast> = new Array<Forecast>();
		if(this._isValidGetForecastResponse(body)){
			for(let item of body.query.results.channel.item.forecast){
				item.date = new Date(item.date);
				forecast.push(item);
			}
		}
		return forecast;
	}

	private _isValidGetForecastResponse(resBody:any):boolean{
		return !!resBody && !!resBody.query && !!resBody.query.results && !!resBody.query.results.channel && !!resBody.query.results.channel.item && !!resBody.query.results.channel.item.forecast;
	}

	private _handleError (error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
		  const body = error.json() || '';
		  const err = body.error || JSON.stringify(body);
		  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
		  errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw("Unexpected service failure. Please try again later.");
	}

}