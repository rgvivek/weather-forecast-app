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
  private _searchResults;
  private _currentListIndex:number = -1;
	
  searchWord:string;
	defaultOption:any = {displayName:"Searching..."};
	focus:boolean = false;

  /* Reset the selected index on change */
	ngOnChanges(){
		this._currentListIndex = -1;
	}

	onSearchWordTyped($event){
		switch($event.key){
  		case "ArrowDown":{
        /* Call the key press event with reseted selected index */
  			this.onKeyPress($event, -1);
  			break;
  		}
  		default:{
        /* Call the key typed callback event with the search word */
  			if(this.searchWord && this.searchWord.length > this.minimumSearchChars){
  				this.optionsList = [this.defaultOption];
  				this.onKeyTypeEvent.emit(this.searchWord);
  			}
  			break;
  		}
  	}
	}

	onOptionSelected(option){
    /* Call the key option selected event with the search word */
		this.onOptionSelectedEvent.emit(option);
		this.focus = false;
		this._lastSearchWord = this.searchWord;
		this.searchWord = option.displayName;
	}

	onFocusOut($event){
    /* Close the dropdown only when the focus is out of the component */
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
    /* Get the search results list DoM element */
		this._searchResults = this.inputElement.nativeElement.children[0].children[1];
		if(this._searchResults){
			this._currentListIndex = index;
	  	switch($event.key){
	  		case "ArrowDown":{
          /* Move to next element on key down */
	  			this.onKeyDown();
	  			break;
	  		}
	  		case "ArrowUp":{
          /* Move to previous element on key up */
	  			this.onKeyUp();
	  			break;
	  		}
	  		case "Enter":{
          /* Select option on enter */
	  			this.onOptionSelected(this.optionsList[index]);
	  			break;
	  		}
	  	}
  	}
  	return;
	}

	onKeyDown(){
    /* Set focus to next element on key down */
  	if(this._searchResults.children && this._searchResults.children.length>0){
			if(this._currentListIndex < this._searchResults.children.length-1){
				this._currentListIndex++;
			}
			this._searchResults.children[this._currentListIndex].focus();
		}
	}

	onKeyUp(){
    /* Set focus to previous element on key up */
		if(this._searchResults.children && this._searchResults.children.length>0){
			if(this._currentListIndex >0){
				this._currentListIndex--;
			}
			this._searchResults.children[this._currentListIndex].focus();		
		}
	}

}
