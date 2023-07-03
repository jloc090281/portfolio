using Services.Service;
using Services.Infrastructure;

var  customOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: customOrigins,
        policy => policy.WithOrigins("http://127.0.0.1:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddDbContext<BloggingContext>();

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using (var serviceScope = app.Services.CreateScope())
    {
        var db = serviceScope.ServiceProvider.GetService<BloggingContext>();
        db.EnsureSeedData();
    }
}

app.UseHttpsRedirection();

app.UseCors(customOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
