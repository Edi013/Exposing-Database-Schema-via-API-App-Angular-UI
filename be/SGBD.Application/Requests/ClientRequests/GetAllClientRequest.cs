using SGBD.Domain.Models;
using MediatR;

namespace SGBD.Application.Requests.ClientRequests
{
    public class GetAllClientRequest : IRequest<IEnumerable<Client>>
    {
    }
}
