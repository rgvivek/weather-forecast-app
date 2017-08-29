import { WeatherForecastAppPage } from './app.po';

describe('weather-forecast-app App', () => {
  let page: WeatherForecastAppPage;

  beforeEach(() => {
    page = new WeatherForecastAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
