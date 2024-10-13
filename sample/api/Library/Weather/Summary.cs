namespace Library.Weather
{
    /// <summary>
    /// Описание погоды.
    /// </summary>
    public class Summary
    {
        /// <summary>
        /// Тип погоды.
        /// </summary>
        public SummaryType Type { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string? Description { get; set; }
    }
}
