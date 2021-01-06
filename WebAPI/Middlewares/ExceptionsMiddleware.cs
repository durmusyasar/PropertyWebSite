using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionsMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionsMiddleware> logger;
        private readonly IHostEnvironment env;

        public ExceptionsMiddleware(RequestDelegate next, ILogger<ExceptionsMiddleware> logger, IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                ApiError response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                String message;
                var exceptionType = e.GetType();
                if (exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Some unknown error occured";
                }
                if (env.IsDevelopment())
                {
                    response = new ApiError((int)statusCode, e.Message, e.StackTrace.ToString());
                }
                else
                {
                    response = new ApiError((int)statusCode, e.Message);
                }
                logger.LogError(e, e.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(e.Message);
            }
        }
    }
}
