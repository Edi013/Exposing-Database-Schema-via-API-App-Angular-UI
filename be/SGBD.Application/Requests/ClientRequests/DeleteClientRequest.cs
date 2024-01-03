using MediatR;

namespace SGBD.Application.Requests.ClientRequests
{
    public class DeleteClientRequest : IRequest<bool>
    {
        public decimal Id;
    }
}
