using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Xml.Linq;
using System.Xml.XPath;

namespace api
{
    /// <summary>
    /// Фильтр для корректной генерации enum-контрактов.
    /// </summary>
    public class EnumsSchemaFilter : ISchemaFilter
    {
        private readonly XDocument mXmlComments;
        private const string XEnumNamesKey = "x-enumNames";
        private const string XEnumSummariesKey = "x-enumSummaries";

        /// <summary>
        /// Initialize schema filter.
        /// </summary>
        /// <param name="argXmlComments">Document containing XML docs for enum members.</param>
        public EnumsSchemaFilter(XDocument argXmlComments) => mXmlComments = argXmlComments;

        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            // изменяем только Enum
            if (!context.Type.IsEnum)
            {
                return;
            }

            ApplyKeys(schema, context);
            ApplyNames(schema, context);
            ApplySummaries(schema, context);
        }

        /// <summary>
        /// Генерация ключей.
        /// Реализована кастомная логика из-за того, что в C# возможны перечисления с дублирующимися ключами,
        /// но при стандартной генерации они пропускаются.
        /// </summary>
        private void ApplyKeys(OpenApiSchema schema, SchemaFilterContext context)
        {
            // если количество полей в схеме равно количеству полей в типе, то схему не меняем
            if (schema.Enum == null || schema.Enum.Count == Enum.GetValues(context.Type).Length)
            {
                return;
            }

            schema.Enum.Clear();

            switch (Enum.GetUnderlyingType(context.Type).Name)
            {
                case nameof(Int32):
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiInteger((int)i));
                        }

                        break;
                    }
                case nameof(Int64):
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiLong((long)i));
                        }

                        break;
                    }
                case nameof(Byte):
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiByte((byte)i));
                        }

                        break;
                    }
                case nameof(Int16):
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiInteger((short)i));
                        }

                        break;
                    }

                case nameof(String):
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiString((string)i));
                        }

                        break;
                    }

                default:
                    {
                        foreach (var i in Enum.GetValues(context.Type))
                        {
                            schema.Enum.Add(new OpenApiInteger((int)i));
                        }

                        break;
                    }
            }
        }

        /// <summary>
        /// Генерация имен.
        /// </summary>
        private void ApplyNames(OpenApiSchema schema, SchemaFilterContext context)
        {
            // добавляем имена только один раз.
            if (schema.Extensions.ContainsKey(XEnumNamesKey))
            {
                return;
            }

            var valuesArr = new OpenApiArray();
            valuesArr.AddRange(Enum.GetNames(context.Type)
                .Select(value => new OpenApiString(value)));

            schema.Extensions.Add(XEnumNamesKey, valuesArr);
        }

        /// <summary>
        /// Генерация описания.
        /// </summary>
        private void ApplySummaries(OpenApiSchema schema, SchemaFilterContext context)
        {
            var enumType = context.Type;

            // метод применяется для всех файлов XmlComments, выполняем только для сборки текущего типа
            var assemblyName = mXmlComments.XPathEvaluate($"normalize-space(/doc/assembly/name/text())") as string;
            if (assemblyName != enumType.Assembly.GetName().Name)
            {
                return;
            }

            var valuesArr = new OpenApiArray();
            valuesArr.AddRange(Enum.GetNames(context.Type)
                .Select(enumMemberName =>
                {
                    var fullEnumMemberName = $"F:{enumType.FullName}.{enumMemberName}";

                    var enumMemberDescription = mXmlComments.XPathEvaluate(
                        $"normalize-space(//member[@name = '{fullEnumMemberName}']/summary/text())"
                    ) as string;

                    return new OpenApiString(enumMemberDescription);
                }));

            schema.Extensions.Add(XEnumSummariesKey, valuesArr);
        }
    }
}
