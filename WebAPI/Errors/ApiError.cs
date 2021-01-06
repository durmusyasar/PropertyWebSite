using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebAPI.Errors
{
    public class ApiError
    {
        private int statusCode;
        private string message;

        public ApiError(int statusCode, string message)
        {
            this.statusCode = statusCode;
            this.message = message;
        }

        public ApiError(int errorCode, string errorMessage, string errorDetails)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            ErrorDetails = errorDetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
