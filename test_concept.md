# Testkonzept für To-Do App

## 1. Software-Architektur (SW Architektur)
Die Anwendung besteht aus den folgenden Komponenten:
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS).
- **Backend**: Node.js mit dem Express-Framework.
- **Test-Frameworks**: Jest und Supertest für automatisierte Tests.

### Architekturdiagramm
```
Frontend (Browser)
   |
   |  HTTP-Anfragen (GET, POST, DELETE)
   v
Backend (Express-Server)
   |
   |  In-Memory-Datenspeicherung (Mocked Database)
   v
Aufgabendaten (Laufzeit-speicherte Daten)
```

---

## 2. Zu testende Features
Die folgenden Features werden getestet:
1. **Aufgabe hinzufügen**:
   - API-Endpunkt: `POST /tasks`
   - Gültige Eingaben erstellen eine neue Aufgabe und geben sie mit einer eindeutigen ID zurück.
   - Ungültige Eingaben (leere Aufgabe) geben einen Fehler zurück.
2. **Alle Aufgaben anzeigen**:
   - API-Endpunkt: `GET /tasks`
   - Soll die Liste aller Aufgaben zurückgeben.
3. **Aufgabe löschen**:
   - API-Endpunkt: `DELETE /tasks/:id`
   - Löscht eine Aufgabe anhand der ID.
   - Ungültige IDs sollen den Fehler "Aufgabe nicht gefunden" zurückgeben.

---

## 3. Nicht getestete Features
- **Frontend-Styling**: Visuelle Aspekte wie CSS werden nicht getestet.
- **Browser-Kompatibilität**: Die App wird nur in modernen Browsern (z. B. Chrome) getestet.
- **Persistente Datenspeicherung**: Aufgaben werden zur Laufzeit im Speicher gespeichert und nicht in einer Datenbank persistiert.

---

## 4. Gewählte Testumgebung
- **Frameworks**:
  - Jest für Unit-Tests.
  - Supertest für das Testen von HTTP-Anfragen an das Backend.
- **Mocking-Tools**:
  - Verwendung von In-Memory-Arrays, um eine Datenbank zu simulieren.
- **Plattform**:
  - Node.js-Laufzeitumgebung.
  - Tests werden in GitHub Actions (CI) auf Ubuntu ausgeführt.

---

## 5. Planung
1. **Testimplementierung**:
   - Schreiben von Unit-Tests für Backend-Endpunkte.
   - Verwendung von Supertest, um API-Aufrufe zu simulieren und Antworten zu validieren.
2. **Testautomatisierung**:
   - Einrichten von GitHub Actions für CI, um Tests automatisch bei jedem Push auszuführen.
3. **Iterative Tests**:
   - Hinzufügen neuer Testfälle während der Entwicklung von Features.
   - Regelmäßiges Ausführen von Tests lokal und in CI, um sicherzustellen, dass alle Funktionen korrekt funktionieren.

---

## Zusammenfassung
Dieses Testkonzept stellt sicher, dass kritische Features der To-Do App validiert werden und die CI-Integration kontinuierliche Codequalität garantiert. Durch den Einsatz von Jest und Supertest wird das Backend isoliert getestet, während nicht-kritische Aspekte (z. B. Styling) vom Testumfang ausgeschlossen werden.
