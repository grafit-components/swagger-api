using api;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Xml.Linq;

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
        Description = "Для демонстации генерации контрактов.",
    });

    options.CustomSchemaIds(type => type.ToString()); 
    
    var currentAssembly = Assembly.GetExecutingAssembly();
    var xmlFiles = currentAssembly.GetReferencedAssemblies()
        .Union(new AssemblyName[] { currentAssembly.GetName() })
        .Select(a => Path.Combine(AppContext.BaseDirectory, $"{a.Name}.xml"))
        .Where(f => File.Exists(f)).ToArray();

    foreach (var f in xmlFiles)
    {
        options.IncludeXmlComments(f, includeControllerXmlComments: true);
        var doc = XDocument.Load(f);
        options.SchemaFilter<EnumsSchemaFilter>(doc);
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

////app.UseAuthorization();

//app.UseRouting();
//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllerRoute("api", "{controller}/{action?}/{id?}");
//});

app.MapControllers();
app.Run();
