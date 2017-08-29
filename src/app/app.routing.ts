import { Routes, RouterModule } from '@angular/router';
import { WeatherForecastWizardComponent } from './weather-forecast-wizard/weather-forecast-wizard.component';

const appRoutes: Routes = [
  	{
  		path: '',
  		redirectTo: "/wizard",
  		pathMatch:"full"
    },{
      path: 'wizard',
      component: WeatherForecastWizardComponent
    }
];

export const Routing = RouterModule.forRoot(appRoutes);