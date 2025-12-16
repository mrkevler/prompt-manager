import React, { useState } from "react";
import logoLight from "../assets/logo/polybrand-bartosz-sergot-strony-www-light.png";
import logoDark from "../assets/logo/polybrand-bartosz-sergot-strony-www-dark.png";

function Settings({ settings, onSave, onClose, theme }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showLicense, setShowLicense] = useState(false);

  const handleThemeChange = (newTheme) => {
    setLocalSettings({ ...localSettings, theme: newTheme });
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleLogoClick = () => {
    if (window.electronAPI) {
      window.electronAPI.openExternalLink("https://polybrand.eu");
    } else {
      window.open("https://polybrand.eu", "_blank");
    }
  };

  const logoSrc = theme === "dark" ? logoLight : logoDark;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="modal settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="settings-title">Ustawienia</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Zamknij ustawienia"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="modal-content">
          <section className="settings-section">
            <h3>Motyw aplikacji</h3>
            <p className="settings-description">
              Wybierz preferowany motyw kolorystyczny
            </p>

            <div
              className="theme-options"
              role="radiogroup"
              aria-label="Wybór motywu"
            >
              <button
                className={`theme-option ${
                  localSettings.theme === "light" ? "selected" : ""
                }`}
                onClick={() => handleThemeChange("light")}
                role="radio"
                aria-checked={localSettings.theme === "light"}
              >
                <div className="theme-preview light">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 2V4M12 20V22M4 12H2M22 12H20M5.64 5.64L4.22 4.22M19.78 19.78L18.36 18.36M5.64 18.36L4.22 19.78M19.78 4.22L18.36 5.64"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span>Jasny</span>
              </button>

              <button
                className={`theme-option ${
                  localSettings.theme === "dark" ? "selected" : ""
                }`}
                onClick={() => handleThemeChange("dark")}
                role="radio"
                aria-checked={localSettings.theme === "dark"}
              >
                <div className="theme-preview dark">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Ciemny</span>
              </button>

              <button
                className={`theme-option ${
                  localSettings.theme === "system" ? "selected" : ""
                }`}
                onClick={() => handleThemeChange("system")}
                role="radio"
                aria-checked={localSettings.theme === "system"}
              >
                <div className="theme-preview system">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 21H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 17V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span>Systemowy</span>
              </button>
            </div>
          </section>

          <section className="settings-section version-section">
            <div className="version-info">
              <span className="version-name">Prompt Manager by mrKevler</span>
              <span className="version-number">V Beta 1.02</span>
              <button
                className="license-link"
                onClick={() => setShowLicense(!showLicense)}
              >
                {showLicense ? "Ukryj licencję" : "Pokaż licencję"}
              </button>
            </div>

            {showLicense && (
              <div className="license-content">
                <div className="license-scroll">
                  <h4>UMOWA LICENCYJNA UŻYTKOWNIKA KOŃCOWEGO (EULA)</h4>
                  <p>
                    <strong>
                      Prompt Manager by mrKevler – Wersja V Beta 1.02
                    </strong>
                  </p>

                  <p className="license-important">
                    WAŻNE: W przypadku jakichkolwiek rozbieżności pomiędzy
                    wersją polską a angielską niniejszej umowy, wersja polska ma
                    pierwszeństwo i jest wiążąca.
                  </p>

                  <h5>WERSJA POLSKA (WIĄŻĄCA)</h5>
                  <p>
                    Dla aplikacji: Prompt Manager by mrKevler
                    <br />
                    Wersja: V Beta 1.02 (WERSJA TESTOWA / BETA)
                    <br />
                    Platformy: Windows / macOS
                  </p>

                  <p>
                    <strong>Autor i właściciel praw autorskich:</strong> Bartosz
                    Sergot (mrKevler)
                    <br />
                    <strong>Data:</strong> grudzień 2025 r.
                  </p>

                  <p>
                    WAŻNE – PRZECZYTAJ UWAŻNIE: Niniejsza Umowa Licencyjna
                    Użytkownika Końcowego ("EULA") jest prawnie wiążącą umową
                    pomiędzy Tobą (osobą fizyczną lub prawną) a Bartoszem
                    Sergotem (mrKevler), autorem i właścicielem praw autorskich
                    do aplikacji Prompt Manager by mrKevler ("Oprogramowanie").
                  </p>

                  <p>
                    Oprogramowanie w wersji V Beta 1.02 jest wersją testową
                    (beta), dostarczaną wyłącznie w celu oceny i testowania.
                    Użytkownik przyjmuje do wiadomości, że wersja beta może
                    zawierać błędy, niekompletne funkcje oraz inne problemy i
                    używa jej wyłącznie na własne ryzyko.
                  </p>

                  <p>
                    Instalując, kopiując lub w jakikolwiek inny sposób używając
                    Oprogramowania, akceptujesz wszystkie warunki niniejszej
                    EULA. Jeśli nie zgadzasz się z warunkami tej umowy, nie
                    instaluj ani nie używaj Oprogramowania i usuń wszystkie jego
                    kopie.
                  </p>

                  <h5>1. UDZIELENIE LICENCJI</h5>
                  <p>
                    Autor udziela Ci ograniczonej, niewyłącznej,
                    nieprzenoszalnej i nieodwołalnej licencji na używanie
                    Oprogramowania wyłącznie do osobistych, niekomercyjnych
                    celów na jednym urządzeniu (komputerze). Licencja jest
                    udzielana na czas nieokreślony, pod warunkiem przestrzegania
                    niniejszej EULA.
                  </p>

                  <h5>2. ZAKAZY I OGRANICZENIA</h5>
                  <p>Nie wolno Ci:</p>
                  <ul>
                    <li>
                      Kopiować, modyfikować, dekompilować, dezasemblować,
                      dokonywać inżynierii wstecznej ani w jakikolwiek sposób
                      odtwarzać kodu źródłowego Oprogramowania.
                    </li>
                    <li>
                      Rozpowszechniać, sprzedawać, wynajmować, wypożyczać,
                      sublicencjonować ani udostępniać Oprogramowania osobom
                      trzecim bez wyraźnej pisemnej zgody Autora.
                    </li>
                    <li>
                      Usuwać lub modyfikować informacji o prawach autorskich,
                      znakach towarowych lub innych oznaczeniach własności w
                      Oprogramowaniu.
                    </li>
                    <li>
                      Używać Oprogramowania w sposób naruszający prawo, w tym do
                      celów komercyjnych bez odrębnej zgody Autora.
                    </li>
                  </ul>
                  <p>
                    Wszelkie prawa nieprzyznane expressis verbis w niniejszej
                    EULA pozostają zastrzeżone dla Autora.
                  </p>

                  <h5>3. PRAWA AUTORSKIE</h5>
                  <p>
                    Oprogramowanie jest chronione prawem autorskim i innymi
                    przepisami dotyczącymi własności intelektualnej. Wszystkie
                    prawa autorskie, tytuły i własność intelektualna do
                    Oprogramowania należą wyłącznie do Bartosza Sergota
                    (mrKevler). Oprogramowanie jest licencjonowane, a nie
                    sprzedawane.
                  </p>

                  <h5>4. BRAK GWARANCJI</h5>
                  <p>
                    OPROGRAMOWANIE, W TYM WERSJA BETA, JEST DOSTARCZANE "TAKIE,
                    JAKIE JEST" (AS IS), BEZ JAKIEJKOLWIEK GWARANCJI, WYRAŻONEJ
                    LUB DOROZUMIANEJ, W TYM MIĘDZY INNYMI GWARANCJI PRZYDATNOŚCI
                    HANDLOWEJ, PRZYDATNOŚCI DO OKREŚLONEGO CELU,
                    NIENARUSZALNOŚCI PRAW OSÓB TRZECICH ORAZ BRAKU BŁĘDÓW.
                  </p>
                  <p>
                    Autor nie gwarantuje, że Oprogramowanie będzie działać
                    bezbłędnie, nieprzerwanie lub że spełni Twoje oczekiwania.
                    Jako że jest to wersja beta, może zawierać liczne błędy,
                    niestabilności i niekompletne funkcje. Całe ryzyko związane
                    z jakością i działaniem Oprogramowania ponosisz Ty. Używasz
                    wersji beta wyłącznie na własne ryzyko.
                  </p>

                  <h5>5. OGRANICZENIE ODPOWIEDZIALNOŚCI</h5>
                  <p>
                    W NAJWIĘKSZYM ZAKRESIE DOPUSZCZALNYM PRZEZ OBOWIĄZUJĄCE
                    PRAWO, AUTOR NIE PONOSI ODPOWIEDZIALNOŚCI ZA JAKIEKOLWIEK
                    SZKODY (BEZPOŚREDNIE, POŚREDNIE, PRZYPADKOWE, WTÓRNE,
                    SPECJALNE LUB KARNE), W TYM MIĘDZY INNYMI ZA UTRATĘ DANYCH,
                    ZYSKÓW, DOCHODÓW, OSZCZĘDNOŚCI, MOŻLIWOŚCI BIZNESOWYCH LUB
                    INNE STRATY, NAWET JEŚLI ZOSTAŁ POINFORMOWANY O MOŻLIWOŚCI
                    ICH POWSTANIA.
                  </p>
                  <p>
                    Autor nie odpowiada za jakiekolwiek szkody powstałe w wyniku
                    używania lub niemożności używania Oprogramowania, w tym
                    spowodowane przez wirusy, błędy, awarie lub inne problemy,
                    zwłaszcza w wersji beta, która jest dostarczana w stanie
                    eksperymentalnym.
                  </p>

                  <h5>6. ROZWIĄZANIE UMOWY</h5>
                  <p>
                    Licencja wygasa automatycznie w przypadku naruszenia
                    któregokolwiek postanowienia niniejszej EULA. W takim
                    przypadku musisz niezwłocznie zaprzestać używania
                    Oprogramowania i zniszczyć wszystkie jego kopie.
                  </p>

                  <h5>7. PRAWO WŁAŚCIWE</h5>
                  <p>
                    Niniejsza EULA podlega prawu polskiemu. Wszelkie spory będą
                    rozstrzygane przez właściwe sądy w Polsce.
                  </p>

                  <h5>8. POSTANOWIENIA KOŃCOWE</h5>
                  <p>
                    Niniejsza EULA stanowi całość umowy pomiędzy Tobą a Autorem
                    w sprawie Oprogramowania. Autor może modyfikować EULA w
                    przyszłych wersjach Oprogramowania.
                  </p>
                  <p>
                    Jeśli masz pytania, skontaktuj się z Autorem:
                    kontakt@polybrand.eu
                  </p>
                  <p>
                    Akceptując niniejszą EULA, potwierdzasz, że przeczytałeś,
                    zrozumiałeś i zgadzasz się na wszystkie jej warunki, w tym
                    że używasz wersji beta na własne ryzyko.
                  </p>

                  <hr />

                  <h5>ENGLISH VERSION (TRANSLATION)</h5>
                  <p>
                    For the application: Prompt Manager by mrKevler
                    <br />
                    Version: V Beta 1.02 (BETA / TESTING VERSION)
                    <br />
                    Platforms: Windows / macOS
                  </p>

                  <p>
                    <strong>Author and copyright owner:</strong> Bartosz Sergot
                    (mrKevler)
                    <br />
                    <strong>Date:</strong> December 2025
                  </p>

                  <p>
                    IMPORTANT – READ CAREFULLY: This End User License Agreement
                    ("EULA") is a legally binding agreement between You (either
                    an individual or an entity) and Bartosz Sergot (mrKevler),
                    the author and copyright owner of the Prompt Manager by
                    mrKevler application ("Software").
                  </p>

                  <p>
                    The Software in version V Beta 1.02 is a beta/testing
                    version provided solely for evaluation and testing purposes.
                    The User acknowledges that the beta version may contain
                    bugs, incomplete features, and other issues, and uses it
                    entirely at their own risk.
                  </p>

                  <p>
                    By installing, copying, or otherwise using the Software, You
                    accept all terms of this EULA. If You do not agree to the
                    terms of this agreement, do not install or use the Software
                    and delete all copies.
                  </p>

                  <h5>1. GRANT OF LICENSE</h5>
                  <p>
                    The Author grants You a limited, non-exclusive,
                    non-transferable, and non-revocable license to use the
                    Software solely for personal, non-commercial purposes on a
                    single device (computer). The license is granted for an
                    indefinite period, subject to compliance with this EULA.
                  </p>

                  <h5>2. PROHIBITIONS AND RESTRICTIONS</h5>
                  <p>You may not:</p>
                  <ul>
                    <li>
                      Copy, modify, decompile, disassemble, reverse engineer, or
                      in any way reproduce the source code of the Software.
                    </li>
                    <li>
                      Distribute, sell, rent, lease, sublicense, or make the
                      Software available to third parties without the Author's
                      express written consent.
                    </li>
                    <li>
                      Remove or alter copyright notices, trademarks, or other
                      proprietary designations in the Software.
                    </li>
                    <li>
                      Use the Software in a manner that violates the law,
                      including for commercial purposes without separate consent
                      from the Author.
                    </li>
                  </ul>
                  <p>
                    All rights not expressly granted in this EULA are reserved
                    by the Author.
                  </p>

                  <h5>3. COPYRIGHT</h5>
                  <p>
                    The Software is protected by copyright and other
                    intellectual property laws. All copyrights, titles, and
                    intellectual property rights in the Software belong
                    exclusively to Bartosz Sergot (mrKevler). The Software is
                    licensed, not sold.
                  </p>

                  <h5>4. NO WARRANTY</h5>
                  <p>
                    THE SOFTWARE, INCLUDING THE BETA VERSION, IS PROVIDED "AS
                    IS", WITHOUT ANY WARRANTY, EXPRESS OR IMPLIED, INCLUDING BUT
                    NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE, NON-INFRINGEMENT OF THIRD-PARTY RIGHTS,
                    OR ABSENCE OF DEFECTS.
                  </p>
                  <p>
                    The Author does not warrant that the Software will operate
                    error-free, uninterrupted, or meet Your expectations. As
                    this is a beta version, it may contain numerous bugs,
                    instabilities, and incomplete features. You bear the entire
                    risk as to the quality and performance of the Software. You
                    use the beta version entirely at your own risk.
                  </p>

                  <h5>5. LIMITATION OF LIABILITY</h5>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE
                    AUTHOR SHALL NOT BE LIABLE FOR ANY DAMAGES (DIRECT,
                    INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE),
                    INCLUDING BUT NOT LIMITED TO LOSS OF DATA, PROFITS, REVENUE,
                    SAVINGS, BUSINESS OPPORTUNITIES, OR OTHER LOSSES, EVEN IF
                    ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                  <p>
                    The Author is not liable for any damages arising from the
                    use or inability to use the Software, including those caused
                    by viruses, errors, failures, or other issues, especially in
                    the beta version, which is provided in an experimental
                    state.
                  </p>

                  <h5>6. TERMINATION</h5>
                  <p>
                    The license terminates automatically upon breach of any
                    provision of this EULA. In such case, You must immediately
                    cease using the Software and destroy all copies.
                  </p>

                  <h5>7. GOVERNING LAW</h5>
                  <p>
                    This EULA is governed by Polish law. Any disputes shall be
                    resolved by the competent courts in Poland.
                  </p>

                  <h5>8. FINAL PROVISIONS</h5>
                  <p>
                    This EULA constitutes the entire agreement between You and
                    the Author regarding the Software. The Author may modify the
                    EULA in future versions of the Software.
                  </p>
                  <p>
                    If You have any questions, please contact the Author:
                    kontakt@polybrand.eu
                  </p>
                  <p>
                    By accepting this EULA, You confirm that You have read,
                    understood, and agree to all its terms, including that You
                    use the beta version at your own risk.
                  </p>

                  <p className="license-copyright">
                    © 2025 Bartosz Sergot (mrKevler). Wszystkie prawa
                    zastrzeżone / All rights reserved.
                  </p>
                </div>
              </div>
            )}
          </section>

          <section className="settings-section author-section">
            <h3>Autor</h3>
            <div className="author-info">
              <button
                className="author-logo"
                onClick={handleLogoClick}
                aria-label="Odwiedź stronę autora"
              >
                <img src={logoSrc} alt="PolyBrand" />
              </button>
              <span className="author-name">Bartosz Sergot</span>
            </div>
          </section>
        </div>

        <footer className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Anuluj
          </button>
          <button className="btn primary" onClick={handleSave}>
            Zapisz ustawienia
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Settings;
