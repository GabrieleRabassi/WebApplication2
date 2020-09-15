using RabbitMq;
using RabbitMQ.Client;

namespace WebApplication2.Interfaces
{
    public interface ICredentialsAcces
    {
        void Login(string userName, string password);
        void Send(SendData sendData);
        void Logout();
        BasicGetResult Recieve();
    }
}
