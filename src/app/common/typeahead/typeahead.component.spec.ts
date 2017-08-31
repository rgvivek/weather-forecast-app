import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TypeaheadComponent } from './typeahead.component';

describe('TypeaheadComponent', () => {
  let component: TypeaheadComponent;
  let fixture: ComponentFixture<TypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadComponent ],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call key typed call back on search box typed', () => {
    component.searchWord = 'sydn'
    const $event = {key:'S'};
    spyOn(component.onKeyTypeEvent, 'emit')
    component.onSearchWordTyped($event);
    expect(component.optionsList).toEqual([{displayName:"Searching..."}]);
    expect(component.onKeyTypeEvent.emit).toHaveBeenCalledWith(component.searchWord);
  });

  it('should call key presses event on down arrow press', () => {
    component.searchWord = 'sydn'
    const $event = {key:'ArrowDown'};
    spyOn(component, 'onKeyPress')
    component.onSearchWordTyped($event);
    expect(component.onKeyPress).toHaveBeenCalledWith($event, -1);
  });

  it('should call the call back option selected event', () => {
    component.searchWord = 'sydn'
    const option = {displayName:'sydney',woeid:1234};
    spyOn(component.onOptionSelectedEvent, 'emit')
    component.onOptionSelected(option);
    expect(component.onOptionSelectedEvent.emit).toHaveBeenCalledWith(option);
    expect(component.searchWord).toEqual(option.displayName);
    expect(component.focus).toBeFalsy();
  });


});
