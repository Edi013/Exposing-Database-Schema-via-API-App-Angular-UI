namespace SGBD.Domain.Models
{
    public partial class StorageLocation : BaseEntity
    {
        public StorageLocation()
        {
            Items = new HashSet<Item>();
        }

        public decimal? ProviderId { get; set; }
        public decimal? UnitPrice { get; set; }
        public string? LocationName { get; set; }
        public string? LocationDescription { get; set; }

        public virtual Provider? Provider { get; set; }
        public virtual ICollection<Item> Items { get; set; }
    }
}
