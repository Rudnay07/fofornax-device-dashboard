# Fullstack Interjú Feladat – Eszközkezelő Dashboard (Angular + PrimeNG + Node.js)

## 🎯 Cél

Készíts egy fullstack alkalmazást, amely lehetővé teszi eszközök listázását, hozzáadását, törlését és azok státuszainak időbeli követését egy diagramon.
A feladatot egy saját github repora töltsd fel, az elkészült feladatot ott 

---

## 🧩 Funkcionális Követelmények

### Frontend (Angular)
- Angular 19 használata
- PrimeNG UI könyvtár
- Reactive Formok használata
- `p-table` komponens a lista megjelenítéséhez
- `p-chart` komponens statisztikai megjelenítéshez
- Frissítés 3-4 másodpercenként automatikusan

### Backend (Node.js + Express)
- REST API:
  - `GET /devices` – eszközök listázása
  - `POST /devices` – új eszköz hozzáadása
  - `DELETE /devices/:id` – eszköz törlése
- Mock adatkezelés memóriában (nem szükséges adatbázis)
- Minden státuszfrissítés új véletlenszerű állapotot adjon az eszközöknek

---

## 🧪 Feladatok

### 1. Eszközök megjelenítése táblázatban
- Angular `p-table` komponenssel
- Oszlopok: Name, Type, Status, Location
- Törlés gomb hozzáadása soronként
- Adatok lekérése automatikusan 4 másodpercenként

### 2. Új eszköz hozzáadása
- Angular form segítségével
- `POST` kérés backend felé
- Eszköz mezők: name, type, ip, location

### 3. Eszközök státuszainak követése
- Frissülő vonaldiagram (line chart)
- Megjeleníti, hogy hány eszköz volt `active`, `error`, `inactive` minden frissítéskor

### Bónusz feladatok
- Az adatkezelés adatbázisban történjen (pl. mssql vagy mongodb)
- Toggle button használata, amellyel ki-be kapcsolható a folyamatos diagramm frissítés

### Beadás menete
Készíts egy publikus/privát GitHub repository-t, amely tartalmazza a megoldás teljes forráskódját
A repo tartalmazzon egy rövid README.md-t is, hogyan hogyan lehet elindítani a frontendet és a backendet
A kész projekt GitHub repo linkjét küldd el nekünk emailben
---

### Példa adatszerkezet

```ts
interface Device {
  id: number;
  name: string;
  type: string;
  ip: string;
  status: 'active' | 'error' | 'inactive';
  location: string;
}