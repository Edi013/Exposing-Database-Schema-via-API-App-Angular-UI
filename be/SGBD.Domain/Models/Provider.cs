namespace SGBD.Domain.Models
{
    public partial class Provider : BaseEntity
    {
        public Provider()
        {
            StorageLocations = new HashSet<StorageLocation>();
        }

        public decimal Id { get; set; }
        public string? ProviderName { get; set; }
        public decimal? ExecutionDuration { get; set; }

        public virtual ICollection<StorageLocation> StorageLocations { get; set; }
    }
}
