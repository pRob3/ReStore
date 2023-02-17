using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {

      [HttpGet("notfound")]
      public ActionResult GetNotFound()
      {
        return NotFound();
      }

      [HttpGet("bad-request")]
      public ActionResult GetBadRequest()
      {
        return BadRequest(new ProblemDetails{Title = "This is a bad request"});
      }


      [HttpGet("unauthorized")]
      public ActionResult GetUnauthorized()
      {
        return Unauthorized();
      }

      [HttpGet("validation-error")]
      public ActionResult GetValidationError()
      {
        ModelState.AddModelError("Problem1", "This is the first test error");
        ModelState.AddModelError("Problem2", "This is the second test error");

        return ValidationProblem();
      }

      [HttpGet("server-error")]
      public ActionResult GetServerError()
      {
        throw new Exception("This is a server exception");
      }

    }
}