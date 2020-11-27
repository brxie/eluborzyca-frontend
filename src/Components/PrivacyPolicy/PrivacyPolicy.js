import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// This component shows the items user checked out from the cart.
class ConnectedPrivacyPolicy extends Component {

  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>Polityka Prywatoności</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>
          

          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center"><strong>Dane osobowe, które przetwarzamy</strong></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center"></p>
          <ol style={{textAlign: "left"}}>
            <li>
              <p style={{marginBottom: "0cm"}} align="left"><strong>Do realizacji umowy w celu korzystania ze świadczonych przez nas Usług możemy zbierać następujące informacje:</strong></p>
            </li>
          </ol>
          <ul style={{textAlign: "left"}}>
            <li>
              <p style={{marginBottom: "0cm"}}>
                jeśli rejestrujesz się z wykorzystaniem konta Facebook: gromadzimy imię i nazwisko w formie w jakiej występują na Twoim koncie Facebook oraz numer identyfikacyjny (Facebook ID).              </p>
            </li>
            <li>
              <p>jeśli rejestrujesz się z wykorzystaniem Twojego adresu e-mail: adres e-mail.</p>
            </li>
          </ul>
          <p style={{textAlign: "left"}} align="left"><strong>Podanie powyższych danych jest niezbędne do korzystania z usług oferowanych w ramach Konta.</strong></p>
          <ol style={{textAlign: "left"}}>
            <li>
              <p align="left">Ponadto użytkownik może podać dobrowolnie inne dane osobowe i adresowe.</p>
            </li>
            <li>
              <p style={{marginBottom: "0cm"}}>
                Jeśli nie ukończysz procesu Rejestracji, tj. nie dokonasz aktywacji Konta poprzez kliknięcie w link przesłany na wskazany przez Ciebie adres e-mail, zbieramy podane przez Ciebie do tego momentu dane osobowe:
              </p>
            </li>
          </ol>
          <ul style={{textAlign: "left"}}>
            <li>
              <p style={{marginBottom: "0cm"}} align="left">adres e-mail;</p>
            </li>
          </ul>
          <ol style={{textAlign: "left"}} start="4">
            <li>
              <p style={{marginBottom: "0cm"}} align="left">Dodatkowo, jeśli użytkownik wyrazi zgodę, dane gromadzone są w plikach cookies oraz zapisywane w ustawieniach przeglądarki.</p>
            </li>
            <li>
              <p style={{marginBottom: "0cm"}} align="left">
                <span style={{fontWeight: "normal"}}>
                  Dane osobowe są zbierane wyłącznie w związku z aktywnością na Platformie e-bazarek.pl.
                </span>
              </p>
            </li>
          </ol>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center"><strong>Cel przetwarzania danych</strong></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center"></p>
          <ol style={{textAlign: "left"}} start="6">
            <li>
              <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="center">Dane osobowe Użytkowników przetwarzane są przez Administratora w celu wykonania zawartej umowy, w szczególności:</p>
            </li>
          </ol>
          <ul style={{textAlign: "left"}}>
            <ul>
              <ul>
                <li>
                  <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">Świadczenia usług droga elektroniczną.</p>
                  <ul>
                    <li>
                      <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">Rejestracji konta użytkownika.</p>
                    </li>
                    <li>
                      <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">Zamieszczenia ogłoszenia.</p>
                    </li>
                    <li>
                      <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">
                        Kontakt z e-bazarek.pl w zakresie: obsługa zgłoszeń, reklamacje, rozwiązywanie problemów technicznych, monitorowanie aktywności, obejmującej np. wyszukiwanie słów kluczowych, zamieszczanie ofert oraz zarządzanie aktywnością,
                        dopasowania reklam zgodnie z uprzednio przeglądanymi treściami, dostosowywania kategorii ofert lub poszczególnych ofert w ustawieniach Administratora lub ustawieniach usług podmiotów zewnętrznych na podstawie aktywności
                        użytkownika, d<strong><span style={{fontWeight: "normal"}}>anych dotyczących logowania.</span></strong>
                      </p>
                    </li>
                    <li>
                      <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">
                        <strong>
                          <span style={{fontWeight: "normal"}}>
                            Gromadzimy szczegóły techniczne, w tym adres protokołu internetowego (adres IP) Twojego urządzenia, informacje o strefie czasowej i systemie operacyjnym. Przechowujemy również informacje na temat Twojego logowania (data
                            Rejestracji, data ostatniej zmiany hasła, data ostatniego udanego logowania) oraz typu i rodzaju Twojej przeglądarki internetowej.
                          </span>
                        </strong>
                      </p>
                      <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left"></p>
                      <p style={{marginBottom: "0cm"}} align="center">
                        <strong><strong>Przekazywanie danych osobowych </strong></strong>
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </ul>
          <ol style={{textAlign: "left"}} start="7">
            <li>
              <p style={{marginBottom: "0cm"}} align="left">
                <strong><strong>Dane osobowe będą przetwarzane wyłącznie przez e-bazarek.pl</strong></strong>
              </p>
            </li>
            <li>
              <p style={{marginBottom: "0cm"}} align="left">
                Dane osobowe mogą zostać przekazane organom publicznym uprawnionym do ich pozyskania również na podstawie odrębnych przepisów (np. Policji, Prokuraturze, Urzędom Celnym i Skarbowym etc.).
              </p>
            </li>
            <li>
              <p style={{marginBottom: "0cm"}} align="left">Użytkownik może na własną odpowiedzialność za pośrednictwem Platformy e-bazarek.pl udostępnić swoje dane osobowe innym Użytkownikom np. w celu realizacji wysyłki.</p>
            </li>
          </ol>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center"><strong>Czas przetwarzania danych osobowych</strong></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="center"></p>
          <ol style={{textAlign: "left"}} start="10">
            <li>
              <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">Dane osobowe będą przetwarzane do momentu odwołania zgody na przetwarzanie danych osobowych.</p>
            </li>
          </ol>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="center">
            <strong><strong>Przetwarzanie automatyczne i profilowanie </strong></strong>
          </p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <ol style={{textAlign: "left"}} start="11">
            <li>
              <p style={{marginBottom: "0cm", fontWeight: "normal"}} align="left">
                <strong>
                  <span style={{fontWeight: "normal"}}>
                    Dane osobowe są przetwarzane w sposób zautomatyzowany w tym poprzez profilowanie w celu dopasowania zawartości strony do osobistych preferencji i zainteresowań. Zautomatyzowane przetwarzanie ani profilowanie nie będzie wywoływać
                    żadnych skutków prawnych ani w istotny sposób wpływać na sytuację użytkownika.
                  </span>
                </strong>
              </p>
            </li>
          </ol>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="center">
            <strong><strong>Zmiany w polityce prywatności</strong></strong>
          </p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left">
            <strong><span style={{fontWeight: "normal"}}>Polityka Prywatności może być przez nas zmieniana lub aktualizowana. Wszelkie zmiany zostaną zamieszczone na tej stronie </span></strong>
            <strong>
              <span style={{fontWeight: "normal"}}><span >https://www.e-bazarek.pl/</span></span>
            </strong>
            <strong>
              <span style={{fontWeight: "normal"}}>
                , a dodatkowo poinformujemy Cię o nich za pośrednictwem wiadomości e-mail lub naszej Platformy.
              </span>
            </strong>
          </p>
          <p style={{textAlign: "left"}}></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", fontWeight: "normal", textAlign: "left"}} align="left"></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="center">
            <strong><strong>Prawa użytkownika. </strong></strong>
          </p>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="left">
            <strong><strong>12. Każdy użytkownik ma prawo do: </strong></strong>
          </p>
          <ol style={{textAlign: "left"}}>
            <ol>
              <ol>
                <ol>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Dostępu do danych osobowych które jej dotyczą, w tym uzyskania kopii danych osobowych podlegających przetwarzaniu.</p>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Poprawiania i uzupełniania danych w przypadku stwierdzenia ich nieprawidłowości lub nieaktualności.</p>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Usunięcia danych.</p>
                    <ul>
                      <li>
                        <p style={{marginBottom: "0cm"}}>Jeśli żądanie usunięcia danych dotyczy danych niezbędnych do realizacji umowy może się wiązać z rozwiązaniem umowy.</p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Ograniczenia ich przetwarzania w następujących przypadkach:</p>
                    <ul>
                      <li>
                        <p style={{marginBottom: "0cm"}}>Osoba, której dane dotyczą, kwestionuje prawidłowość danych osobowych – na okres pozwalający administratorowi sprawdzić prawidłowość tych danych.</p>
                      </li>
                      <li>
                        <p style={{marginBottom: "0cm"}}>Przetwarzanie jest niezgodne z prawem, a osoba, której dane dotyczą, sprzeciwia się usunięciu danych osobowych, żądając w zamian ograniczenia ich wykorzystywania.</p>
                      </li>
                      <li>
                        <p style={{marginBottom: "0cm"}}>Administrator nie potrzebuje już danych osobowych do celów przetwarzania, ale są one potrzebne osobie, której dane dotyczą, do ustalenia, dochodzenia lub obrony roszczeń.</p>
                      </li>
                      <li>
                        <p style={{marginBottom: "0cm"}}>
                          Osoba, której dane dotyczą, wniosła sprzeciw na mocy art. 21 ust. 1 wobec przetwarzania – do czasu stwierdzenia, czy prawnie uzasadnione podstawy po stronie administratora są nadrzędne wobec podstaw sprzeciwu osoby, której
                          dane dotyczą.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>
                      Przenoszenia danych - osoba, której dane dotyczą, ma prawo otrzymać w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego dane osobowe jej dotyczące, które dostarczyła administratorowi, oraz ma
                      prawo przesłać te dane osobowe innemu administratorowi bez przeszkód ze strony administratora, któremu dostarczono te dane osobowe.
                    </p>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Niepodlegania zautomatyzowanemu podejmowaniu decyzji (w tym profilowaniu).</p>
                  </li>
                  <li>
                    <p style={{marginBottom: "0cm"}}>Prawo do sprzeciwu wobec przetwarzania danych osobowych.</p>
                    <ul>
                      <li>
                        <p style={{marginBottom: "0cm"}}>
                          W przypadku, gdy przetwarzanie dotyczy celów statystycznych lub jest realizowane na podstawie uzasadnionego interesu prawnego Administratora, a sprzeciw jest uzasadniony przez szczególna sytuację osoby.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ol>
              </ol>
            </ol>
          </ol>
          <p style={{marginBottom: "0cm", textAlign: "left"}} align="left"></p>
          <p style={{textAlign: "left"}} align="center"><strong>Administrator danych osobowych</strong></p>
          <p style={{marginBottom: "0cm", textAlign: "left"}}>Kontakt w sprawach związanych z Przetwarzaniem danych osobowych</p>
          <ul style={{textAlign: "left"}}>
            <ul>
              <li>
                <p style={{marginBottom: "0cm"}}>E-mail: <a href="mailto:admin@e-bazarek.pl">kontakt@e-bazarek.pl</a></p>
              </li>
              <li>
                <p style={{marginBottom: "0cm"}}>
                  Administrator udziela informacji o podjętych działaniach bez zbędnej zwłoki, w terminie do miesiąca od otrzymania żądania. Ze względu na istotne okoliczności (m.in. ilość żądań lub stopień skomplikowania wniosku) termin może zostać
                  przedłużony o kolejne 2 miesiące. Przy czym w terminie miesiąca Administrator poinformuje osobę, której dane dotyczą o przyczynach opóźnienia i przedłużeniu terminu. Na odmowę podjęcia działań oraz opłatę przysługuje skarga do
                  organu nadzorczego.
                </p>
              </li>
            </ul>
          </ul>
          <p style={{marginBottom: "0cm", textAlign: "left"}}>Organ nadzorczy i Skargi</p>
          <ul style={{textAlign: "left"}}>
            <ul>
              <li>
                <p>
                  W związku przetwarzaniem danych osobowych każdej osobie przysługuje prawo do wniesienia skargi na działanie lub zaniechanie Administratora do organu nadzorczego, którym jest:<br />
                  <br />
                  Prezes Urzędu Ochrony Danych Osobowych<br />
                  ul. Stawki 2<br />
                  00-193 Warszawa
                </p>
              </li>
            </ul>
          </ul>

        </div>
      </div>
      
    );
  }
}
const PrivacyPolicy = withRouter(connect()(ConnectedPrivacyPolicy));

export default PrivacyPolicy;
