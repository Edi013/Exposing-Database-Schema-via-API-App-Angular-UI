using SGBD.Application.Requests.ClientRequests;
using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;
using MediatR;

namespace SGBD.Application.Handlers.ClientHandlers
{
    public class CreateClientHandler : IRequestHandler<CreateClientRequest, Client>
    {
        IRepository<Client> repository;

        public CreateClientHandler(IRepository<Client> repository)
        {
            this.repository = repository;
        }

        public async Task<Client> Handle(CreateClientRequest request, CancellationToken cancellationToken)
        {
            var newClient = new Client
            {
                Id = 0,
                LastName = request.Nume,
                FirstName = request.Prenume,
                City = request.Oras,
                PhoneNumber = request.Telefon,
                Company = request.Companie,
                PostalCode = request.Cod,
                Adress = request.Adresa,
            };
    
            var result = await repository.Add(newClient);
            return result;
        }
    }
}
