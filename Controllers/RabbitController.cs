using Microsoft.AspNetCore.Mvc;
using RabbitMq;
using RabbitMQ.Client;
using System.Text;
using WebApplication2.Interfaces;

//we use a controller to exchange data between backend<->frontend 

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RabbitController : ControllerBase
    {

        private readonly ICredentialsAcces _LoginSvc;

        //create a service instance 
        public RabbitController(ICredentialsAcces LoginSvc)
        {
            _LoginSvc = LoginSvc;
        }




        //http request to frontend used to read the user message 

        [HttpGet("[action]")]
        public string GetMessage()
        {
            string stringMessage = "";

            BasicGetResult message = _LoginSvc.Recieve();

            if (message != null) {

                byte[] byteArrayMessage = message.Body.ToArray(); //byte array to string

                stringMessage += Encoding.Default.GetString(byteArrayMessage);
            }
            return stringMessage;
        }

        //http post that call the service for sending the message 

        [HttpPost("[action]")]
        public void SendMessage(SendData sendData)
        {
            _LoginSvc.Send(sendData);
        }

        //http post that call the service for creating connection 

        [HttpPost("[action]")]
        public void CreateConnection(LoginData LoginData)
        {
            _LoginSvc.Login(LoginData.UserName, LoginData.Password);

        }

        [HttpDelete("[action]")]
        public void AbortConnection()
        {
            _LoginSvc.Logout();
        }

    }
}