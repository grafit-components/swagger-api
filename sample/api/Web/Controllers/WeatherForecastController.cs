using Library.Weather;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Прогноз погоды.
    /// </summary>
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        /// <summary>
        /// Получить прогноз погоды на пять дней.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<WeatherForecast> Get() => WeatherForecast.Generate();
    }
}