namespace Library.Weather
{
    /// <summary>
    /// ������ � ������.
    /// </summary>
    public class WeatherForecast
    {
        /// <summary>
        /// ����.
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// ����������� � ��������.
        /// </summary>
        public int TemperatureC { get; set; }

        /// <summary>
        /// ����������� �� ����� ����������.
        /// </summary>
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        /// <summary>
        /// ��������.
        /// </summary>
        public Summary Summary { get; set; }


        public static IEnumerable<WeatherForecast> Generate()
        {

            return Enumerable
                .Range(1, 5)
                .Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = GenerateSummary(),
                })
                .ToArray();
        }

        private static Summary GenerateSummary()
        {
            string[] Summaries = new[]
            {
                "Freezing", "Cool", "Mild", "Warm", "Hot"
            };
            var i = Random.Shared.Next(Summaries.Length);
            return new Summary()
            {
                Type = (SummaryType)i,
                Description = Summaries[i]
            };
        }
    }
}