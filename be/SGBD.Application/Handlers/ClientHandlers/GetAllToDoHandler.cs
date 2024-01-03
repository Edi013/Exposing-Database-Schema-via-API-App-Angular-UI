using SGBD.Application.Requests.ClientRequests;
using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;
using MediatR;

namespace SGBD.Application.Handlers.ClientHandlers
{
    public class GetAllClientHandler : IRequestHandler<GetAllClientRequest, IEnumerable<Client>>
    {
        IRepository<Client> repository;

        public GetAllClientHandler(IRepository<Client> repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<Client>> Handle(GetAllClientRequest request, CancellationToken cancellationToken)
        {
            var result = await repository.GetAll();
            return result;
        }
    }
}
