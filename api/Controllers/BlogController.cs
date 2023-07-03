using Microsoft.AspNetCore.Mvc;
using Services.Domain;
using Services.Service;

namespace services.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IBlogService _service;

    public BlogController(ILogger<BlogController> logger, IBlogService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAllBlogs()
    {
        try
        {
            var owners = _service.getBlogList();
            return Ok(owners);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong inside GetAllBlogs action: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    [Route("Filter")]
    public IActionResult FilterBlogs([FromBody]Filters data)
    {
        try
        {
            var owners = _service.filterBlogList(data.Title, data.Description, data.Status, data.CreatedAt);
            return Ok(owners);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong inside FilterBlogs action: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetBlogById(Guid id)
    {
        try
        {
            Blog? blogEntity = _service.getBlog(id);
            if (blogEntity is null)
            {
                _logger.LogError($"Blog with id: {id}, hasn't been found.");
                return NotFound();
            }
            return Ok(blogEntity);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong inside GetBlogById action: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    [Route("Save")]
    public IActionResult Save([FromBody]Blog blog)
    {
        try
        {
            if (blog is null)
            {
                _logger.LogError("Blog object sent from client is null.");
                return BadRequest("Blog object is null");
            }
            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid blog object sent from client.");
                return BadRequest("Invalid blog model object");
            }
            _service.saveBlog(blog);
            return Ok(blog);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong inside GetBlogById action: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    [Route("Archive")]
    public IActionResult Archive(Guid id)
    {
        try
        {
            Blog? blogEntity = _service.getBlog(id);
            if (blogEntity is null)
            {
                _logger.LogError($"Blog with id: {id}, hasn't been found.");
                return NotFound();
            }
            _service.archiveBlog(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [Route("Post")]
    public IActionResult Post([FromBody]Post post)
    {
        try
        {
            if (post is null)
            {
                _logger.LogError("Post object sent from client is null.");
                return BadRequest("Post object is null");
            }
            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid post object sent from client.");
                return BadRequest("Invalid post model object");
            }
            Blog? blogEntity = _service.getBlog(post.BlogId);
            if (blogEntity is null)
            {
                _logger.LogError($"Blog with id: {post.BlogId}, hasn't been found.");
                return NotFound();
            }
            _service.postToBlog(post);
            return Ok(post);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong inside GetBlogById action: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
}
