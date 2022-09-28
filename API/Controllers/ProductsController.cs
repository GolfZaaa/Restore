using System.Linq;
using API.Data;
using API.Entities;
using API.Extenstions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }
        // get post push
        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                        .Sort(productParams.OrderBy)
                        .Search(productParams.SearchTerm)
                        .Filter(productParams.Brands, productParams.Types)
                        .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,
                           productParams.PageNumber, productParams.PageSize);

            //เพื่อส่งค่าการแบ่งหน้าไปให้ Axios Interceptor นำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);

            return Ok(products);
        }


        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่านค่าที่ซ้ำกันมาเพียงค่าเดียว
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        // แบบย่อใช้งานง่าย
        // [HttpGet("[action]")]
        // public async Task<IActionResult> TestGetProducts()
        // {
        //     return Ok(await _context.Products.ToListAsync());
        // }
    }
}