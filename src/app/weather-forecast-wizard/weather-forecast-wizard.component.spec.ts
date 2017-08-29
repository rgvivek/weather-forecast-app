import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastWizardComponent } from './weather-forecast-wizard.component';

describe('WeatherForecastWizardComponent', () => {
  let component: WeatherForecastWizardComponent;
  let fixture: ComponentFixture<WeatherForecastWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherForecastWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
