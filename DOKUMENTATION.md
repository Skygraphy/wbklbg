# Wimmelbuch Klosterneuburg – Dokumentation

## Überblick

Eine SvelteKit-Website für das handgezeichnete Wimmelbuch von Ines Wohlmuth über die Stadt Klosterneuburg. Die App besteht aus einer öffentlichen Website und einem passwortgeschützten Admin-Bereich.

**Tech-Stack:** SvelteKit 2 · Svelte 5 (Runes) · TypeScript · Tailwind CSS 3 · DaisyUI 4 · PostgreSQL (Neon) · Resend (E-Mail) · Vercel

---

## Dateistruktur

```
src/
├── app.css                        # Globale Styles, Tailwind-Layers, section-padding
├── app.html                       # HTML-Grundgerüst
├── lib/
│   ├── components/                # Seitenabschnitte der öffentlichen Website
│   │   ├── Hero.svelte            # Parallax-Banner mit Spotlight-Effekt, CTAs
│   │   ├── Bezugsmoeglichkeiten.svelte  # Bestellwege, Abholstellen, Popup-Stände
│   │   ├── Preise.svelte          # Standardpreis + aktive Aktion/Preisstaffel
│   │   ├── Besonderheiten.svelte  # 3 Feature-Cards + Monatskalender
│   │   ├── Entstehung.svelte      # 9-teiliger Prozessflow der Buchentwicklung
│   │   ├── UeberInes.svelte       # Biografie + Career-Timeline
│   │   └── Kontakt.svelte         # Kontaktinfo + Bestellformular mit Honeypot
│   ├── ui/                        # Wiederverwendbare UI-Bausteine
│   │   ├── BentoCard.svelte       # Card-Komponente mit Hover-Animation
│   │   ├── SectionWrapper.svelte  # Section-Container mit max-w-6xl
│   │   ├── SpotlightCursor.svelte # Radial-Gradient-Effekt über dem Hero
│   │   └── ThemeToggle.svelte     # Light/Dark/OS-Umschalter (localStorage)
│   ├── server/
│   │   └── db.ts                  # Alle Datenbankabfragen (Neon PostgreSQL)
│   └── types/
│       ├── popup-stand.ts
│       ├── pickup-location.ts
│       ├── promotion.ts
│       └── contact-submission.ts
└── routes/
    ├── +layout.svelte             # Root-Layout (ThemeToggle einbinden)
    ├── +layout.server.ts          # Lädt popupStands, pickupLocations, promotions für alle Seiten
    ├── +page.svelte               # Homepage (alle Sections zusammengesetzt)
    ├── api/
    │   └── contact/+server.ts     # POST /api/contact – Kontaktformular-Handler
    └── admin/
        ├── +layout.svelte         # Admin-Shell (Sidebar-Navigation)
        ├── +layout.server.ts      # Auth-Guard (Cookie-Prüfung)
        ├── +page.svelte           # Dashboard mit Statistiken
        ├── +page.server.ts        # Lädt Zählwerte für Dashboard
        ├── login/                 # Login-Seite + Passwort-Action
        ├── logout/                # Logout-Action (Cookie löschen)
        ├── popup-stands/          # Popup-Stand-Verwaltung
        ├── promotions/            # Aktions-/Preisverwaltung
        ├── locations/             # Abholstellen-Verwaltung
        └── orders/                # Bestellungs-Übersicht (read-only)
```

---

## Öffentliche Website

### Datenfluss

`+layout.server.ts` lädt beim ersten Seitenaufruf drei Datenbankabfragen parallel:

```
getPopupStands()       → aktive Stände, Datum >= heute
getPickupLocations()   → aktive Abholstellen
getActivePromotions()  → max. 1 aktive Aktion, Datum noch gültig
```

Diese Daten werden als `data`-Props an `+page.svelte` weitergegeben und von dort an die Komponenten `Bezugsmoeglichkeiten` und `Preise` übergeben.

### Sections (in Reihenfolge)

| Komponente | Inhalt |
|---|---|
| `Hero` | Parallax-Banner, Headline, CTA-Buttons, Trust-Signale |
| `Bezugsmoeglichkeiten` | Bento-Grid: Online-Bestellung, Abholstellen-Liste, Popup-Stände |
| `Preise` | Standardpreis 39 €, aktive Preisstaffel/Aktion, Geschenk-Callout |
| `Besonderheiten` | 3 Feature-Cards (handgezeichnet, lokal, Herzensprojekt) |
| `Entstehung` | Bildlicher Ablauf der Buchentstehung in 9 Schritten |
| `UeberInes` | Kurzbiografie + 5 Karriere-Meilensteine |
| `Kontakt` | Bestellformular (Name*, E-Mail*, Anzahl, Nachricht) |

### Kontaktformular (`POST /api/contact`)

1. Request-Body wird geparst und validiert (Name, E-Mail, Anzahl 1–10)
2. Honeypot-Feld `website` wird geprüft – Bots füllen es aus, echte Nutzer nicht
3. Kontaktdaten werden **non-blocking** in `contact_submissions` gespeichert (Fehler hier brechen den Request nicht ab)
4. HTML-E-Mail wird via Resend an `CONTACT_EMAIL` gesendet, mit `replyTo` der Absender-Adresse
5. Bei Fehler: deutsche Fehlermeldung, Status 400/500

---

## Admin-Bereich (`/admin`)

### Authentifizierung

`admin/+layout.server.ts` prüft bei jedem Aufruf das Cookie `admin_session`. Fehlt es oder ist es ungültig, wird zu `/admin/login` weitergeleitet.

**Login-Flow:**
1. POST-Action vergleicht Passwort mit `ADMIN_PASSWORD` (Umgebungsvariable)
2. Bei Erfolg: `admin_session`-Cookie setzen (httpOnly, Secure, 7 Tage)
3. Redirect zu `/admin`

**Logout:** Cookie wird gelöscht, Redirect zu `/admin/login`

### Admin-Layout

Festes Sidebar-Layout:
- Links: `w-56`-Sidebar mit Logo, Navigation, Abmelden-Button
- Rechts: `flex-1 overflow-auto p-8`-Hauptbereich

Aktiver Nav-Link wird per `$page.url.pathname` erkannt und orange hervorgehoben.

---

### Admin-Seiten im Detail

#### Dashboard (`/admin`)

Zeigt vier Statistik-Kacheln:
- Anzahl Popup-Stände (aktiv / gesamt)
- Anzahl Aktionen (aktiv / gesamt)
- Anzahl Abholstellen (aktiv / gesamt)
- Anzahl Bestellungen gesamt

Darunter: Tabelle der letzten 5 Bestellungen.

---

#### Popup-Stände (`/admin/popup-stands`)

Verwaltet Verkaufs-Events mit Datum und Ort.

**Datenbankfelder:** `id`, `name`, `date_from`, `date_to` (null = Einzeltag), `active`, `address`, `note`, `sort_order`

**Actions:**

| Action | Beschreibung |
|---|---|
| `create` | Neuen Stand anlegen, sort_order = MAX + 1 |
| `update` | Bestehenden Stand bearbeiten |
| `toggle` | active-Flag umschalten |
| `delete` | Eintrag löschen |
| `reorder` | Zwei Einträge in der Reihenfolge tauschen (sort_order-Swap) |

**Validierung:** `date_to` muss >= `date_from` sein (Client- und Server-seitig).

**Öffentliche Ansicht:** Nur aktive Stände mit `date_to >= heute` werden auf der Website angezeigt, sortiert nach `sort_order ASC, date_from ASC`.

---

#### Aktionen / Promotions (`/admin/promotions`)

Verwaltet zeitlich begrenzte Preisstaffeln (z. B. Vorverkauf, Mengenrabatt).

**Datenbankfelder:** `id`, `icon`, `valid_from`, `valid_to`, `name`, `active`, `price1_qty/amt`, `price2_qty/amt`, `price3_qty/amt`, `note`, `sort_order`

**Besonderheit – Exklusiv-Logik:** Beim Aktivieren einer Aktion werden automatisch alle anderen Aktionen deaktiviert (`deactivateAllPromotions(exceptId)`). Es kann immer nur **eine** Aktion gleichzeitig aktiv sein.

**Preisstaffeln:** Bis zu 3 Staffeln pro Aktion (z. B. „2 Stück" → 35 €, „3 Stück" → 32 €). Jede Staffel muss pro Buch günstiger sein als die vorherige (Client-seitige Validierung).

**Öffentliche Ansicht:** Die erste aktive Aktion mit `valid_to >= heute` wird in der `Preise`-Section angezeigt.

---

#### Abholstellen (`/admin/locations`)

Verwaltet stationäre Verkaufspunkte (Geschäfte, Einrichtungen).

**Datenbankfelder:** `id`, `name`, `active`, `address`, `email`, `phone`, `sort_order`

**Actions:** Identisches Muster wie Popup-Stände (create, update, toggle, delete, reorder).

**Öffentliche Ansicht:** Nur aktive Einträge, sortiert nach `sort_order`.

---

#### Bestellungen (`/admin/orders`)

Read-only Übersicht aller Kontaktformular-Einsendungen.

**Angezeigt:** Datum, Name, E-Mail (als `mailto:`-Link), Stückzahl, Nachricht – sortiert nach neuesten zuerst.

---

### Gemeinsames CRUD-Pattern

Alle drei Verwaltungsseiten folgen demselben Muster:

```
+page.server.ts          load()     → getAllX() aus db.ts
                         create     → createX()
                         update     → updateX()
                         toggle     → toggleX()
                         delete     → deleteX()
                         reorder    → swapSortOrder(table, idA, idB)

+page.svelte             editing    → $state<number|null>  (inline Edit-Formular)
                         showAdd    → $state<boolean>       (Neu-Formular oben)
                         use:enhance                        (SPA-Navigation ohne Reload)
```

Der `reorder`-Mechanismus tauscht die `sort_order`-Werte zweier Zeilen. Da Neon keine dynamischen Tabellennamen in Tagged Templates unterstützt, enthält `swapSortOrder()` explizite Queries für jede Tabelle.

---

## Validierungen

### Prinzip: zwei Ebenen

Alle Formulare werden auf zwei Ebenen geprüft:

- **Client** (`+page.svelte`): sofortiges Feedback ohne Seitenladung, verhindert unnötige Server-Anfragen
- **Server** (`+page.server.ts` / `+server.ts`): autoritative Prüfung, kann nicht umgangen werden

---

### Kontaktformular (`Kontakt.svelte` + `POST /api/contact`)

#### Client-seitig (`Kontakt.svelte`)

| Feld | Typ | Regel |
|---|---|---|
| `name` | Pflichtfeld | HTML `required`-Attribut |
| `email` | Pflichtfeld | HTML `required` + `type="email"` |
| `qty` | Optional | `type="number"`, `min="1"`, `max="10"` |
| `message` | Optional | keine Einschränkung |
| `website` | Honeypot | verstecktes Feld; wenn befüllt → `handleSubmit` bricht sofort ab (kein Server-Call) |

Das Formular nutzt `novalidate` und behandelt die Submission selbst via `handleSubmit`, damit die Fehlermeldungen auf Deutsch erscheinen und der Status (`idle` / `sending` / `success` / `error`) gesteuert werden kann.

#### Server-seitig (`/api/contact`)

| Prüfung | Bedingung | HTTP-Status | Fehlermeldung |
|---|---|---|---|
| JSON-Parsing | ungültiger Body | 400 | `'Ungültige Anfrage.'` |
| Honeypot | `website` ist befüllt | 200 (stille Antwort) | – |
| Pflichtfelder | `name` oder `email` leer nach `.trim()` | 400 | `'Bitte fülle alle Pflichtfelder aus.'` |
| E-Mail-Format | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` schlägt fehl | 400 | `'Bitte gib eine gültige E-Mail-Adresse ein.'` |
| Anzahl | `qty` angegeben, aber kein Integer oder < 1 oder > 10 | 400 | `'Ungültige Anzahl.'` |
| E-Mail-Versand | Resend gibt Fehler zurück | 500 | `'Die E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut.'` |

> Die DB-Speicherung ist **non-blocking**: Ein Fehler dort wird nur geloggt und bricht den Request nicht ab – der Nutzer bekommt trotzdem eine Erfolgsantwort, solange die E-Mail gesendet werden konnte.

---

### Popup-Stände (`/admin/popup-stands`)

#### Client-seitig (`+page.svelte`)

```typescript
function validateDates(dateFrom: string, dateTo: string): string {
    if (dateTo && dateTo < dateFrom) return 'Das Bis-Datum muss >= Von-Datum sein.';
    return '';
}
```

Wird vor dem `enhance`-Submit aufgerufen. Bei Fehler wird `cancel()` aufgerufen und die Fehlermeldung im Formular angezeigt (kein Server-Call).

HTML-`required`-Attribute: `name`, `date_from`

#### Server-seitig (`+page.server.ts`)

| Action | Prüfung | Fehlermeldung |
|---|---|---|
| `create` | `name` oder `date_from` fehlt | `'Name und Von-Datum sind Pflichtfelder.'` |
| `create` | `date_to` < `date_from` | `'Das Bis-Datum muss >= Von-Datum sein.'` |
| `update` | `id`, `name` oder `date_from` fehlt | `'Ungültige Daten.'` |
| `update` | `date_to` < `date_from` | `'Das Bis-Datum muss >= Von-Datum sein.'` |
| `toggle` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `delete` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `reorder` | `idA` oder `idB` fehlt/0 | `'Ungültige IDs.'` |

---

### Aktionen / Promotions (`/admin/promotions`)

#### Client-seitig (`+page.svelte`)

```typescript
function validateForm(formData: FormData): string | null {
    // 1. Datumsreihenfolge
    if (from && to && to < from)
        return 'Das Bis-Datum muss gleich oder nach dem Von-Datum liegen.';

    // 2. Preisstaffel-Logik: Preis pro Buch muss mit steigender Menge sinken
    const filled = [1, 2, 3]
        .map(n => ({ qty: QTY_MAP[price${n}_qty], amt: price${n}_amt }))
        .filter(o => o.qty > 0 && o.amt > 0)
        .sort((a, b) => a.qty - b.qty);

    for (let i = 1; i < filled.length; i++) {
        if (curr.amt / curr.qty >= prev.amt / prev.qty)
            return `Bei ${curr.qty} Büchern muss der Preis pro Buch niedriger sein als bei ${prev.qty} Büchern.`;
    }
    return null;
}
```

HTML-`required`-Attribute: `name`, `valid_from`, `valid_to`

#### Server-seitig (`+page.server.ts`)

| Action | Prüfung | Fehlermeldung |
|---|---|---|
| `create` | `name`, `valid_from` oder `valid_to` fehlt | `'Pflichtfelder fehlen.'` |
| `create` | (keine Datumslogik server-seitig) | – |
| `update` | `id`, `name`, `valid_from` oder `valid_to` fehlt | `'Ungültige Daten.'` |
| `toggle` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `delete` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `reorder` | `idA` oder `idB` fehlt/0 | `'Ungültige IDs.'` |

**Exklusiv-Logik (kein Fehler, aber implizite Regel):** Beim `create` werden immer zuerst alle Aktionen deaktiviert, dann die neue aktiv angelegt. Beim `update` oder `toggle` mit `active = true` werden alle anderen deaktiviert (`deactivateAllPromotions(exceptId)`).

---

### Abholstellen (`/admin/locations`)

#### Client-seitig (`+page.svelte`)

HTML-`required`-Attribut: `name`

Keine darüber hinausgehende client-seitige Logik (kein Datums- oder Formatcheck erforderlich).

#### Server-seitig (`+page.server.ts`)

| Action | Prüfung | Fehlermeldung |
|---|---|---|
| `create` | `name` fehlt oder leer | `'Name ist ein Pflichtfeld.'` |
| `update` | `id` fehlt/0 oder `name` leer | `'Ungültige Daten.'` |
| `toggle` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `delete` | `id` fehlt oder 0 | `'Ungültige ID.'` |
| `reorder` | `idA` oder `idB` fehlt/0 | `'Ungültige IDs.'` |

---

### Fehleranzeige im Admin

Server-Fehler (via `fail(400, { error: '...' })`) werden als `form?.error` zurückgegeben und oben auf der jeweiligen Seite als rotes Alert angezeigt:

```svelte
{#if form?.error}
    <div class="alert alert-error rounded-xl text-sm mb-4">{form.error}</div>
{/if}
```

Client-Fehler werden in einer lokalen `$state`-Variable (`addError` / `editError`) gespeichert und direkt im Formular angezeigt.

---

## Datenbankschema

```sql
CREATE TABLE popup_stands (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    date_from   DATE NOT NULL,
    date_to     DATE,
    active      BOOLEAN DEFAULT true,
    address     VARCHAR(255),
    note        TEXT,
    sort_order  INT
);

CREATE TABLE promotions (
    id          SERIAL PRIMARY KEY,
    icon        VARCHAR(100),
    valid_from  DATE NOT NULL,
    valid_to    DATE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    active      BOOLEAN DEFAULT true,
    price1_qty  VARCHAR(50),
    price1_amt  DECIMAL(10,2),
    price2_qty  VARCHAR(50),
    price2_amt  DECIMAL(10,2),
    price3_qty  VARCHAR(50),
    price3_amt  DECIMAL(10,2),
    note        TEXT,
    sort_order  INT
);

CREATE TABLE pickup_locations (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    active      BOOLEAN DEFAULT true,
    address     VARCHAR(255),
    email       VARCHAR(255),
    phone       VARCHAR(20),
    sort_order  INT
);

CREATE TABLE contact_submissions (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    qty          VARCHAR(10),
    message      TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Umgebungsvariablen

| Variable | Beschreibung |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL Connection String |
| `RESEND_API_KEY` | API-Key für den E-Mail-Dienst Resend |
| `CONTACT_EMAIL` | Empfänger-Adresse für Bestellungs-E-Mails |
| `ADMIN_PASSWORD` | Passwort für den Admin-Login |
| `ADMIN_SESSION_SECRET` | Geheimer Schlüssel für die Session-Validierung |

---

## Design-System

### Farben (DaisyUI-Theme `wimmelbuch`)

| Token | Light | Dark | Verwendung |
|---|---|---|---|
| `primary` | #D97706 (Amber) | #C47C20 | Buttons, aktive Nav-Links, Toggles |
| `secondary` | #C2714F (Terracotta) | #A85C3C | Akzente |
| `accent` | #7C9E7A (Sage) | #6A8C68 | Positive Signale |
| `base-100` | #FDF6EC (Cream) | #1A1108 | Seitenhintergrund, Cards |
| `base-200` | #F5E8D3 (Beige) | #231710 | Admin-Hintergrund |
| `base-300` | #EDD9BA (Tan) | #2E1F14 | Trennlinien |

### Typografie

- **Amatic SC** (cursive) – Sections-Überschriften (`.font-amatic`)
- **System UI** – Fließtext

### Deployment

- Adapter: `@sveltejs/adapter-vercel` mit Node.js 20.x
- Alle Umgebungsvariablen im Vercel Project Settings hinterlegen
