import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// This component shows the items user checked out from the cart.
class ConnectedCookiePolicy extends Component {

  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>Polityka Cookie</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>
          <ol start="1">
            <li>Serwis nie zbiera w sposób automatyczny żadnych informacji, z wyjątkiem informacji zawartych w plikach cookies.</li>
            <li>
              Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies
              zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.
            </li>
            <li>Pliki cookies wykorzystywane są w celu:</li>
          </ol>
          <p>
            a) dostosowania zawartości stron internetowych Serwisu do preferencji Użytkownika oraz optymalizacji korzystania ze stron internetowych; w szczególności pliki te pozwalają rozpoznać urządzenie Użytkownika Serwisu i odpowiednio wyświetlić
            stronę internetową, dostosowaną do jego indywidualnych potrzeb;
          </p>
          <p>b) tworzenia statystyk, które pomagają zrozumieć, w jaki sposób Użytkownicy Serwisu korzystają ze stron internetowych, co umożliwia ulepszanie ich struktury i zawartości;</p>
          <p>c) utrzymanie sesji Użytkownika Serwisu (po zalogowaniu), dzięki której Użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</p>
          <ol start="5">
            <li>
              W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (<em>session cookies</em>) oraz „stałe” (<em>persistent cookies</em>). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu
              końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w
              parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.
            </li>
            <li>W ramach Serwisu stosowane są następujące rodzaje plików cookies:</li>
          </ol>
          <p>a) „niezbędne” pliki cookies, umożliwiające korzystanie z usług dostępnych w ramach Serwisu, np. uwierzytelniające pliki cookies wykorzystywane do usług wymagających uwierzytelniania w ramach Serwisu;</p>
          <p>b) pliki cookies służące do zapewnienia bezpieczeństwa, np. wykorzystywane do wykrywania nadużyć w zakresie uwierzytelniania w ramach Serwisu;</p>
          <p>
            c) „funkcjonalne” pliki cookies, umożliwiające „zapamiętanie” wybranych przez Użytkownika ustawień i personalizację interfejsu Użytkownika, np. w zakresie wybranego języka lub regionu, z którego pochodzi Użytkownik, rozmiaru czcionki,
            wyglądu strony internetowej itp.;
          </p>
          <p>e) „reklamowe” pliki cookies, umożliwiające dostarczanie Użytkownikom treści reklamowych bardziej dostosowanych do ich zainteresowań.</p>
          <ol start="7">
            <li>
              W wielu przypadkach oprogramowanie służące do przeglądania stron internetowych (przeglądarka internetowa) domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać w każdym
              czasie zmiany ustawień dotyczących plików cookies. Ustawienia te mogą zostać zmienione w szczególności w taki sposób, aby blokować automatyczną obsługę plików cookies w ustawieniach przeglądarki internetowej bądź informować o ich
              każdorazowym zamieszczeniu w urządzeniu Użytkownika Serwisu. Szczegółowe informacje o możliwości i sposobach obsługi plików cookies dostępne są w ustawieniach oprogramowania (przeglądarki internetowej).
            </li>
            <li>Operator Serwisu informuje, że ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
            <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu i wykorzystywane mogą być również przez współpracujących z operatorem Serwisu reklamodawców oraz partnerów.</li>
          </ol>
          
        </div>
      </div>
      
    );
  }
}
const CookiePolicy = withRouter(connect()(ConnectedCookiePolicy));

export default CookiePolicy;
