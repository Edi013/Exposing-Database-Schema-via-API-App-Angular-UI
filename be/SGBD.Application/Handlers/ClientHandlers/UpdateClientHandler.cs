using SGBD.Application.Requests.ClientRequests;
using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;
using MediatR;

namespace SGBD.Application.Handlers.ClientHandlers
{
    public class UpdateClientHandler : IRequestHandler<UpdateClientRequest, Client>
    {
        IRepository<Client> repository;

        public UpdateClientHandler(IRepository<Client> repository)
        {
            this.repository = repository;
        }

        public async Task<Client> Handle(UpdateClientRequest request, CancellationToken cancellationToken)
        {

            var newClient = new Client
            {
                Id = request.Id,
                LastName = request.Nume,
                FirstName = request.Prenume,
                City = request.Oras,
                PhoneNumber = request.Telefon,
                Company = request.Companie,
                PostalCode = request.Cod,
                Adress = request.Adresa,
            };

            var result = await repository.Update(newClient);
            return result;
        }
    }
}
