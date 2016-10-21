using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace DB.OAuth.Service.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        [Authorize]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("user")]
        public string GetUser()
        {
            return this.User.Identity.Name;
        }

      

    }

}