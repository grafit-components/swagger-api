using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.News
{
    /// <summary>
    /// Новость.
    /// </summary>
    public class NewsItem
    {
        /// <summary>
        /// Заголовок.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Текст.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public Summary Summary { get; set; }
    }
}
