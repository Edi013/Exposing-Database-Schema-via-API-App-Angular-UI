using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;

namespace SGBD.Application.Handlers
{
    public class OrderHandler
    {
        IRepository<Order> repository;

        public OrderHandler(IRepository<Order> repository)
        {
            this.repository = repository;
        }

        public async Task<Order> Create(Order request)
        {
            var newOrder = new Order
            {
                Id = 0,
                ClientId = request.ClientId,
                DeliveryDate = request.DeliveryDate,
                OrderDate = request.OrderDate,
                PayDate = request.PayDate,
            };

            var result = await repository.Add(newOrder);
            return result;
        }

        public async Task<bool> Delete(decimal id)
        {
            var result = await repository.DeleteById(id);
            return result;
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            var result = await repository.GetAll();
            return result;
        }

        public async Task<Order> Update(Order request)
        {

            var newOrder = new Order
            {
                Id = 0,
                ClientId = request.ClientId,
                DeliveryDate = request.DeliveryDate,
                OrderDate = request.OrderDate,
                PayDate = request.PayDate,
            };

            var result = await repository.Update(newOrder);
            return result;
        }
    }
}
