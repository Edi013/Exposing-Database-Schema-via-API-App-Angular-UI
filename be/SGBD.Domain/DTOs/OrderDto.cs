using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGBD.Domain.DTOs
{
    public class OrderDto
    {
        public decimal? Id { get; set; }
        public decimal? ClientId { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public DateTime? PayDate { get; set; }
    }
}
