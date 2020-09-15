import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
<div>
      <div>
        <h1>Hello, welcome to the RabbitMQ interface</h1>
      </div>

          <p>Prossimi obbiettivi</p>
          <ul>
              
              
              <li>Cambio di navbar dopo Login, in modo da non poter loggare di nuovo, anche se passi per la home</li>
              <li>Send e recieve message con pagina a scomparsa (esempio da flo)</li>
              <li>Gestione errori di inserimento password, per evitare errore in caso di invio(nessuna connessione )</li>
              <li>Miglioramento struttura codice (??)</li>
                  <ul>
                  </ul>
              <li>Abbellimento generale del layout</li>
                  <ul>
                      <li>Limite di scorrimento dei messaggi in arrivo nella pagina recieve</li>
                      <li>Messaggio di avvenuto invio nella pagina invio messaggio e successiva cancelazione del messaggio appena scritto</li>
                      <li>Segnalazione in caso di non selezione di un utente</li>
                      <li>Pagina di login</li>
                  </ul>
          </ul>
   </div>
      );
  }
}
