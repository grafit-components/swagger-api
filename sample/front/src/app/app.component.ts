import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/web/api.service';
import { WeatherForecast } from '../api/web/library.weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly apiService = inject(ApiService);

  protected readonly weatherItems$: Observable<WeatherForecast[]> = this.apiService.weatherForecast.get();

  d = this.weatherItems$;
  constructor() {
    this.apiService.weatherForecast.get().subscribe((weatherItems) => console.log(weatherItems[0].date.getHours()));
    // output: 6
  }
  t = this.apiService.weatherForecast.get();
}
