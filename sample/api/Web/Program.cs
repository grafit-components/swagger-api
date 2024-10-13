using Web;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Xml.Linq;
using Web.EnumSchemaFilters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Sample API",
    });

    options.CustomSchemaIds(type => type.ToString()); 
    
    options.SchemaFilter<EnumNameSchemaFilter>();
    
    var currentAssembly = Assembly.GetExecutingAssembly();
    var xmlFiles = currentAssembly.GetReferencedAssemblies()
        .Union(new [] { currentAssembly.GetName() })
        .Select(a => Path.Combine(AppContext.BaseDirectory, $"{a.Name}.xml"))
        .Where(f => File.Exists(f));

    foreach (var f in xmlFiles)
    {
        options.IncludeXmlComments(f, includeControllerXmlComments: true);
        var doc = XDocument.Load(f);
        options.SchemaFilter<EnumSummarySchemaFilter>(doc);
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
