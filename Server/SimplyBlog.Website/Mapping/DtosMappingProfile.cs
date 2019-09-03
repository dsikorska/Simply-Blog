using AutoMapper;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Models.DTOs;

namespace SimplyBlog.Website.Mapping
{
    public class DtosMappingProfile : Profile
    {
        public DtosMappingProfile()
        {
            CreateMap<Post, EditPostDto>();
            CreateMap<Post, NewPostDto>();

            CreateMap<EditPostDto, Post>();
            CreateMap<NewPostDto, Post>();
        }
    }
}
