using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    {

        //จะสร้างตาราง UserAddress ให้เองอัตโนมัติ
        public UserAddress Address { get; set; }

    }
}