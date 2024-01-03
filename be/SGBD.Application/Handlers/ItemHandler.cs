using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;

namespace SGBD.Application.Handlers
{
    public class ItemHandler
    {
        IRepository<Item> repository;

        public ItemHandler(IRepository<Item> repository)
        {
            this.repository = repository;
        }

        public async Task<Item> Create(Item request)
        {
            var newItem = new Item
            {
                Id = request.Id,
                OrderId = request.OrderId,
                StorageLocationId = request.StorageLocationId,
                StorageLocation = request.StorageLocation,
                Quantity = request.Quantity,
                TotalPrice = request.TotalPrice,
            };

            var result = await repository.Add(newItem);
            return result;
        }

        public async Task<bool> Delete(decimal id)
        {
            var result = await repository.DeleteById(id);
            return result;
        }

        public async Task<IEnumerable<Item>> GetAll()
        {
            var result = await repository.GetAll();
            return result;
        }

        public async Task<Item> Update(Item request)
        {

            var newItem = new Item
            {
               Id = request.Id,
               OrderId = request.OrderId,
               StorageLocationId = request.StorageLocationId,
               StorageLocation = request.StorageLocation,
               Quantity = request.Quantity,
               TotalPrice = request.TotalPrice,
            };

            var result = await repository.Update(newItem);
            return result;
        }
    }
}
