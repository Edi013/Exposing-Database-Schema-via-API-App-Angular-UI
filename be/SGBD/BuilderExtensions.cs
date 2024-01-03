using SGBD.Application.Requests.ClientRequests;
using SGBD.DataAccess;
using SGBD.DataAccess.Repositories;
using SGBD.Domain.Models;
using SGBD.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGBD
{
    public static class BuilderExtensions
    {
        public static void RegisterServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            builder.ConfigureCors();

            builder.RegisterSwaggerSettings();

            builder.Services.AddMediatR(
                 cfg => cfg.RegisterServicesFromAssemblies(typeof(GetAllClientRequest).Assembly));

            var connectionString = builder.Configuration.GetConnectionString("SGBD");
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseOracle(connectionString, p => {
                p.UseOracleSQLCompatibility("11");
            }));

            builder.Services.AddScoped<IRepository<Client>, ClientRepository>();

            builder.RegisterAppSettings();
        }
        
        private static void ConfigureCors(this WebApplicationBuilder builder)
        {
            var frontendAppUrl = builder.Configuration.GetSection("FrontendApp:Url");

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "CorsPolicy",
                                          policy =>
                                          {
                                              policy //.AllowAnyOrigin()
                                              .WithOrigins(frontendAppUrl.Value)
                                              .AllowAnyHeader()
                                              .AllowAnyMethod()
                                              .AllowCredentials();
                                          });
            });
        }

        private static void RegisterSwaggerSettings(this WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen();
        }
        
        private static void RegisterAppSettings(this WebApplicationBuilder builder)
        {
            var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
            builder.Services.AddSingleton(configuration);
        }
    }
}
