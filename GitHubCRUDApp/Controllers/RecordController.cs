using GitHubCRUDApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace GitHubCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IList<Record<string>> collection;

        public RecordController(IConfiguration configuration)
        {
            this.configuration = configuration;
            collection = new List<Record<string>>();
        }

        [HttpPost("{value}/{rating}/{comment}")]
        public IActionResult Create(string value, int rating, string comment)
        {
            Record<string> record = new()
            {
                Value = value,
                Rating = rating,
                Comment = comment
            };
            collection.Add(record);
            return Ok();
        }

        [HttpGet("")]
        public ActionResult<Record<string>> Read()
        {
            return Ok(collection);
        }

        [HttpPost("{index}/{value}/{rating}/{comment}")]
        public IActionResult Update(int index, string value, int rating, string comment)
        {
            collection[index].Comment = comment;
            collection[index].Rating = rating;
            collection[index].Value = value;
            return Ok();
        }

        [HttpPost("{index}")]
        public IActionResult Delete(int index)
        {
            collection.RemoveAt(index);
            return Ok();
        }

        [HttpGet("{content}")]
        public ActionResult<IEnumerable<Record<string>>> Search(string content)
        {
            ICollection<Record<string>> records = new List<Record<string>>();
            foreach (Record<string> record in collection)
            {
                if (record.Value.Contains(content))
                {
                    records.Add(record);
                }
            }
            return Ok(records);
        }
    }
}