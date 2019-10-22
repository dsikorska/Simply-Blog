using AutoMapper;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Models.DTOs;

namespace SimplyBlog.Website.Mapping
{
    public class DtosMappingProfile : Profile
    {
        public DtosMappingProfile()
        {
            CreateMap<Post, PostEditRequestDto>();
            CreateMap<Post, PostNewRequestDto>();

            CreateMap<PostEditRequestDto, Post>();
            CreateMap<PostNewRequestDto, Post>();
        }
    }
}
