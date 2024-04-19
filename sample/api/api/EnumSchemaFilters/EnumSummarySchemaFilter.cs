using System.Xml.Linq;
using System.Xml.XPath;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace api.EnumSchemaFilters
{
    /// <summary>
    /// Фильтр для корректной генерации описания enum-контрактов.
    /// </summary>
    public class EnumSummarySchemaFilter : ISchemaFilter
    {
        private readonly XDocument mXmlComments;
        private const string XEnumSummariesKey = "x-enumSummaries";

        /// <summary>
        /// Initialize schema filter.
        /// </summary>
        /// <param name="argXmlComments">Document containing XML docs for enum members.</param>
        public EnumSummarySchemaFilter(XDocument argXmlComments) => mXmlComments = argXmlComments;

        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            var enumType = context.Type;

            if (!enumType.IsEnum)
            {
                return;
            }

            if (!XmlCommentsContainsType(enumType))
            {
                return;
            }

            ApplySummaries(enumType, schema);
        }

        /// <summary>
        /// Содержит ли текущий XmlComments описание для типа
        /// </summary>
        private bool XmlCommentsContainsType(Type type)
        {
            var assemblyName = mXmlComments.XPathEvaluate($"normalize-space(/doc/assembly/name/text())") as string;
            return assemblyName == type.Assembly.GetName().Name;
        }

        /// <summary>
        /// Генерация описания.
        /// </summary>
        private void ApplySummaries(Type type, OpenApiSchema schema)
        {
            var valuesArr = new OpenApiArray();
            valuesArr.AddRange(Enum.GetNames(type)
                .Select(enumMemberName =>
                {
                    var fullEnumMemberName = $"F:{type}.{enumMemberName}";

                    var enumMemberDescription = mXmlComments.XPathEvaluate(
                        $"normalize-space(//member[@name = '{fullEnumMemberName}']/summary/text())"
                    ) as string;

                    return new OpenApiString(enumMemberDescription);
                }));

            schema.Extensions.Add(XEnumSummariesKey, valuesArr);
        }
    }
}