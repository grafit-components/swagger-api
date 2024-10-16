using Library.Weather;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// ������� ������.
    /// </summary>
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        /// <summary>
        /// �������� ������� ������ �� ���� ����.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<WeatherForecast> Get() => WeatherForecast.Generate();
    }
}