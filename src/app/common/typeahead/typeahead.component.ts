import { Component, ElementRef, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent{

  	constructor(private inputElement: ElementRef) { }

  	@Output('onKeyTypeEvent') onKeyTypeEvent: EventEmitter<any> = new EventEmitter();
  	@Output('onOptionSelectedEvent') onOptionSelectedEvent: EventEmitter<any> = new EventEmitter();
  	@Input() optionsList:Array<any>;
  	@Input() minimumSearchChars:number = 2;

  	private _lastSearchWord:string;
  	searchWord:string;

  	defaultOption:any = {displayName:"Searching..."};
	private searchResults;// = this.inputElement.nativeElement.children[0].firstElementChild.children[2];
  	private currentListIndex:number = -1;
  	public focus:boolean = false;
  	ngOnChanges(changes){
  		this.currentListIndex = -1;
  	}

  	onSearchWordTyped($event){
  		switch($event.key){
	  		case "ArrowDown":{
	  			this.onKeyPress($event, -1);
	  			break;
	  		}
	  		default:{
	  			if(this.searchWord && this.searchWord.length > this.minimumSearchChars){
	  				this.optionsList = [this.defaultOption];
	  				this.onKeyTypeEvent.emit(this.searchWord);
	  			}
	  			break;
	  		}
	  	}
  	}

  	onOptionSelected(option){
  		this.onOptionSelectedEvent.emit(option);
  		this.focus = false;
  		this._lastSearchWord = this.searchWord;
  		this.searchWord = option.displayName;
  	}

  	onFocusOut($event){
  		if($event.target && $event.target.parentElement && $event.target.parentElement.classList){
  			if(!$event.target.parentElement.classList.contains('type-ahead-container')){
  				this.focus = false;
  				this._lastSearchWord = this.searchWord;
  			}
  		}else{
  			this.focus = false;
  			this._lastSearchWord = this.searchWord;
  		}
  		$event.preventDefault();
  	}

  	onFocusIn($event){
  		this.searchWord = this._lastSearchWord;
  		this.focus = true;
  	}

  	onKeyPress($event, index){
  		this.searchResults = this.inputElement.nativeElement.children[0].children[1];
  		if(this.searchResults){
  			this.currentListIndex = index;
		  	switch($event.key){
		  		case "ArrowDown":{
		  			this.onKeyDown();
		  			break;
		  		}
		  		case "ArrowUp":{
		  			this.onKeyUp();
		  			break;
		  		}
		  		case "Enter":{
		  			this.onOptionSelected(this.optionsList[index]);
		  			break;
		  		}
		  	}
	  	}
	  	return;
  	}

  	onKeyDown(){
	  	if(this.searchResults.children && this.searchResults.children.length>0){
  			if(this.currentListIndex < this.searchResults.children.length-1){
  				this.currentListIndex++;
  			}
  			this.searchResults.children[this.currentListIndex].focus();
  		}
  	}

  	onKeyUp(){
  		if(this.searchResults.children && this.searchResults.children.length>0){
  			if(this.currentListIndex >0){
  				this.currentListIndex--;
  			}
  			this.searchResults.children[this.currentListIndex].focus();		
  		}
  	}

}
