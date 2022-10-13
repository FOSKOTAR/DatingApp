using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        public PhotoRepository(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<Photo> GetPhotoById(int id)
        {
            return await context.Photos
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos()
        {
            return await context.Photos
                .IgnoreQueryFilters()
                .Where(p => p.IsApproved == false)
                .Select(p => new PhotoForApprovalDto
                    {
                        Id = p.Id,
                        Username = p.AppUser.UserName,
                        Url = p.Url,
                        IsApproved = p.IsApproved
                    })
                .ToListAsync();
        }

        public void RemovePhoto(Photo photo)
        {
            context.Photos.Remove(photo);
        }
    }
}