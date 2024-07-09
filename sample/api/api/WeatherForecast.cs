namespace api
{
    /// <summary>
    /// Данные о погоде.
    /// </summary>
    public class WeatherForecast
    {
        /// <summary>
        /// Дата.
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// Температура в градусах.
        /// </summary>
        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}