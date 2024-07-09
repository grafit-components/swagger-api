using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    /// <summary>
    /// Ежедневные новости.
    /// </summary>
    [Route("[controller]/[action]")]
    public class DailyNewsController : ControllerBase
    {
        /// <summary>
        /// Получить список новостей.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public NewsItem[] Get()
        {
            return new[]
            {
                new NewsItem(),
            };
        }
    }
public class NewsItem
{
    public int Id { get; set; }
    public string Title { get; set; }
}
}