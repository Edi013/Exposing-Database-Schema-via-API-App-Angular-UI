using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;

namespace SGBD.DataAccess.Repositories
{
    public class OrderRepository : RepositoryBase<Order>
    {
        public OrderRepository(AppDbContext context)
            : base(context)
        { }
    }
}
