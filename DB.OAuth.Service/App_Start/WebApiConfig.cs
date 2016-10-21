using DB.OAuth.Service.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;

namespace DB.OAuth.Service
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            RegisterOdata(config);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }


        public static void RegisterOdata(HttpConfiguration config)
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Product>("Products");
            builder.EntitySet<Category>("Categories");
            builder.EntitySet<Order_Detail>("Order_Details");
            builder.EntitySet<Supplier>("Suppliers");
            builder.EntitySet<Region>("Regions");
            builder.EntitySet<Territory>("Territories");

            //builder.Namespace = "ProductService";

            //builder.EntityType<Product>().Collection
            //    .Function("MostExpensive")
            //    .Returns<ProductDetail>();

            //builder.ComplexType<ProductDetail>();


            config.Routes.MapODataServiceRoute(routeName: "odata", routePrefix: "odata", model: builder.GetEdmModel());
        }

    }
}
