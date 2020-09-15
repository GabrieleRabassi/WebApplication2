using RabbitMq;
using RabbitMQ.Client;
using System.Text;
using WebApplication2.Interfaces;


//we use the service to keep the connection alive, the class LoginService refers to the ICredentialsAcces interFace (??) 

namespace WebApplication2
{
    public class RabbitUtilitiesService : ICredentialsAcces
    {

        //attributes initialization 

        private IConnection _connection;
        private IModel _channel;
        private string _userName = "";



        //create a continous conncetion and communication channel to the server 

        void ICredentialsAcces.Login(string userName, string password)
        {
            var factory = new ConnectionFactory() { HostName = "LocalHost", AutomaticRecoveryEnabled = true }; //AutomaticRecoveryEnabled is used to handle when servers goes down

            factory.UserName = userName;

            factory.Password = password;

            factory.VirtualHost = "VHProva";

            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();
                _userName = userName;
            }
            catch// ? cosa fare in casodi errore di battitura ?
            {

            }
        }

        //send message using the channel previously created, we use the credentials attribute to save the content of the message 

        void ICredentialsAcces.Send(SendData SendData)
        {
            var messageWithSender = SendData.Body;

            messageWithSender += $" da {_userName}"; //messaggio + mittente, per sapere da chi arriva, per ora... 

            var body = Encoding.UTF8.GetBytes(messageWithSender); //string to byte array

            var routingKey = SendData.Destinatario + "_key"; //automatic routing key set, nel server tutte le routing key sono nome.utente_key

            _channel.BasicPublish(exchange: "gruppo", routingKey: routingKey, basicProperties: null, body: body);

        }

        //receive the message, we use the private username attribute to decide the queue where read the messages 

        BasicGetResult ICredentialsAcces.Recieve()
        {   
            bool noAck = true;

            BasicGetResult result = _channel.BasicGet(_userName, noAck);

            return result;
        }

        void ICredentialsAcces.Logout()
        {
            _connection.Abort();

            _connection = null;

            _channel = null;

            _userName = null;
        }
    }
}
