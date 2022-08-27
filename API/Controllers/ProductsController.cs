using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]  //Validate แจ้งเตือน สามารถลบได้
    [Route("api/[controller]")]  //เส้นทาง
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]   //ใช้ 2 ตัวพร้อมกันไม่ได้ ถ้าจะใช้ต้องใช้แบบตัวอย่างล่าง
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        // [HttpGet("[action]")]
        //   public async Task<ActionResult<List<Product>>> TestGetProducts() แบบนี้ก็ได้
        //          public async Task<IActionResult> TestGetProducts()
        //  {
        //      return await _context.Products.ToListAsync();
        //  }

        // public async Task<IActionResult> TestGetProducts()
        // {
        //     return Ok( await _context.Products.ToListAsync());
        // }
        // Get Post Put 



    }
}