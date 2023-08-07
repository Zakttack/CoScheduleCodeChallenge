using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GitHubCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GitHubController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public GitHubController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("api/GitHub/auth")]
        public async Task<IActionResult> AuthenticateAsync(string code)
        {
            HttpClient client = new();
            FormUrlEncodedContent requestContent = new(new[]
            {
                new KeyValuePair<string, string>("client_id", configuration["GitHub:ClientId"]),
                new KeyValuePair<string, string>("client_secret", configuration["GitHub:ClientSecret"]),
                new KeyValuePair<string, string>("code", code)
            });

            HttpResponseMessage response = await client.PostAsync("https://github.com/login/oauth/access_token", requestContent);
            string content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }

        [HttpGet]
        [Route("api/GitHub/repos")]
        public async Task<IActionResult> GetReposAsync([FromHeader] string authorization)
        {
            string accessToken = authorization["Bearer ".Length..].Trim();
            using HttpClient client = new()
            {
                DefaultRequestHeaders =
                {
                    Authorization = new AuthenticationHeaderValue("Bearer", accessToken)
                }
            };
            HttpResponseMessage response = await client.GetAsync("https://api.github.com/user/repos");
            string content = await response.Content.ReadAsStringAsync();
            return Ok(content);
        }
    }
}