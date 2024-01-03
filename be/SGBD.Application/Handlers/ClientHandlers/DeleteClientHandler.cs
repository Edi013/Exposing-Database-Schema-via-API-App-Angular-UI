using SGBD.Application.Requests.ClientRequests;
using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;
using MediatR;

namespace SGBD.Application.Handlers.ClientHandlers
{
    public class DeleteClientHandler : IRequestHandler<DeleteClientRequest, bool>
    {
        IRepository<Client> repository;

        public DeleteClientHandler(IRepository<Client> repository)
        {
            this.repository = repository;
        }

        public async Task<bool> Handle(DeleteClientRequest request, CancellationToken cancellationToken)
        {
            var result = await repository.DeleteById(request.Id);
            return result;
        }
    }
}
