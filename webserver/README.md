###Update

```
quasar upgrade --install
```


Bauen für Entwicklung - Hotdeployment
==================================

Während des Entwicklungsprozesses wird ein separater Serverprozess für die Clientseitigen Bestandteile gestartet:

Absoluten Endpunkt für die JSON-API setzen:

```
cd enpasosai-gui/src/boot
edit axios.js 

...

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios

  // GUI integriert (gebaut mit: quasar build)
  // Vue.prototype.baseUrl = ''

  // GUI separat während Entwicklung (gebaut und gestartet mit: quasar dev)
  Vue.prototype.baseUrl = 'http://localhost:9000'
}
```


```
quasar dev
```

Jede Änderung im Client-Sourcecode wird automatisch (hot) deployt.

Um die Single-Origin-Policy im Browser für diese Entwicklungssituation auszuhebeln wird Chrome wie folgt gestartet:

```
chrome.exe --user-data-dir="C:/chromedev" --disable-web-security 
```
oder auf OS X

```
open /Applications/Google\ Chrome.app --new --args --user-data-dir="/var/tmp/Chrome_dev" --disable-web-security
```
chrome.exe --user-data-dir="C:/chromedev" --disable-web-security 
