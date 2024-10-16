using Library.Weather;
using Microsoft.AspNetCore.Mvc;

namespace Mobile.Controllers
{
    /// <summary>
    /// ������� ������.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        /// <summary>
        /// �������� ������� ������ �� ���� ����.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get() => WeatherForecast.Generate();
    }
}