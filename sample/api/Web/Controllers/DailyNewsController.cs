using Library.News;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
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
        public NewsItem[] Get() => Array.Empty<NewsItem>();
    }
}