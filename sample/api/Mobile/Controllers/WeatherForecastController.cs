using Library.Weather;
using Microsoft.AspNetCore.Mvc;

namespace Mobile.Controllers
{
    /// <summary>
    /// Прогноз погоды.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        /// <summary>
        /// Получить прогноз погоды на пять дней.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get() => WeatherForecast.Generate();
    }
}