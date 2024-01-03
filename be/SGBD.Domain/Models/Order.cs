using SGBD.Domain.entities;

namespace SGBD.Domain.Models
{
    public partial class Order : BaseEntity
    {
        public Order()
        {
            Items = new HashSet<Item>();
        }

        public decimal? ClientId { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public DateTime? PayDate { get; set; }

        public virtual Client? Client { get; set; }
        public virtual ICollection<Item> Items { get; set; }
    }
}
