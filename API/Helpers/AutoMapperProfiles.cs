using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            /*
            Pasamos de AppUser a MemberDto para reducir los parametros que pedimos a la API
            Y para no hacer un ciclo de peticiones ya que "AppUser" contiene "Photo" contiene
            un "AppUser" por lo tanto se hace un ciclo y explota. Por lo tanto creamos un
            Dto para cada uno en los cuales solo el member guarde las fotos pero las fotos no
            guarden al member
            */

            CreateMap<AppUser, MemberDto>()
            //Primero se le dice donde vas a guardar lo que encuentres, 
            //luego le dices que vas a hacer (mapFrom en este caso) y dentro de esto lo que
            //vas a mappear, en este caso la URL de la mainphoto
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                //FirOrDefault busca el que tenga IsMain en true, y pasa la URL de este
                src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
        }
    }
}