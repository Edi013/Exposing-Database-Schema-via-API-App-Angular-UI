﻿using SGBD.Domain.Interfaces;
using SGBD.Domain.Models;

namespace SGBD.DataAccess.Repositories
{
    public class ClientRepository : RepositoryBase<Client>, IClientRepository
    {
        public ClientRepository(ApplicationDbContext context)
            : base(context)
        { }
    }
}
