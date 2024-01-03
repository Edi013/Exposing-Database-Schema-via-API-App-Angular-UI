using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;

namespace SGBD.Application.Handlers
{
    public class StorageLocationHandler
    {
        IRepository<StorageLocation> repository;

        public StorageLocationHandler(IRepository<StorageLocation> repository)
        {
            this.repository = repository;
        }

        public async Task<StorageLocation> Create(StorageLocation request)
        {
            var newStorageLocation = new StorageLocation
            {
                Id = request.Id,
                LocationDescription = request.LocationDescription,
                LocationName = request.LocationName,
                ProviderId = request.ProviderId,
                UnitPrice = request.UnitPrice,
            };

            var result = await repository.Add(newStorageLocation);
            return result;
        }

        public async Task<bool> Delete(decimal id)
        {
            var result = await repository.DeleteById(id);
            return result;
        }

        public async Task<IEnumerable<StorageLocation>> GetAll()
        {
            var result = await repository.GetAll();
            return result;
        }

        public async Task<StorageLocation> Update(StorageLocation request)
        {

            var newStorageLocation = new StorageLocation
            {
                Id = request.Id,
                LocationDescription = request.LocationDescription,
                LocationName = request.LocationName,
                ProviderId = request.ProviderId,
                UnitPrice = request.UnitPrice,
            };

            var result = await repository.Update(newStorageLocation);
            return result;
        }
    }
}
