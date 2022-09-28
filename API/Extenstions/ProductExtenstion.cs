using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extenstions
{
    public static class ProductExtenstion
    {
        // context.product.where(p=>p.id == 1) to.list().ascending
        // context.product.Sort()
        // ถ้าอยากขยายให้เติม this
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
                // ถ้าไม่มีบรรทัด 19 กับ 20 มันจะไปทำบรรทัดที่ 21 ให้ตามชื่อ
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            // Trim ตัดช่องว่างทิ้ง
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }




        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

                // "a,b,c" = [a ,b, c]      brands.ToLower().Split(",").ToList()) เป็นการตัดคำ
            if (!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(types))
                typeList.AddRange(types.ToLower().Split(",").ToList());

            //กระบวนการวนลูปอยู่ภายใน
            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
            //brandList.Contains(p.Brand.ToLower()) ค้น brand ที่มีอยู่ภายใน brandList


            // abc("b")
            // brandList.Contains(p.Brand.ToLower()        
            return query;
        }


    }
}