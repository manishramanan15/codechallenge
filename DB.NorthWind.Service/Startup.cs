using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(DB.NorthWind.Service.Startup))]

namespace DB.NorthWind.Service
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            HttpConfiguration httpConfig = new HttpConfiguration();

            ConfigureAuth(app);

            WebApiConfig.Register(httpConfig);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(httpConfig);
         
        }
    }
}
