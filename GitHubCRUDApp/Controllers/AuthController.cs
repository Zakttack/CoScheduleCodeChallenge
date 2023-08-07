using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GitHubCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public AuthController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("api/auth/login")]
        public IActionResult Login()
        {
            string clientId = configuration["GitHub:ClientId"];
            string redirectUri = configuration["GitHub:RedirectUri"];
            string url = $"https://github.com/login/oauth/authorize?client_id={clientId}&redirect_uri={redirectUri}";
            return Redirect(url);
        }
    }
}