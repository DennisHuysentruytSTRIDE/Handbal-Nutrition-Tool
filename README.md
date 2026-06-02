# Handbal Voedingstool

Een voedingstool voor handbalspelers (m/v, 18–25 jaar): bereken je energie- en
macrobehoefte en stel een weekmenu samen uit 400 recepten. Volledig in de
browser — geen account, geen server. Persoonlijke gegevens blijven lokaal op het
toestel (`localStorage`).

## Lokaal draaien

```bash
npm install
npm run dev        # ontwikkelserver, opent op http://localhost:5173
npm run build      # bouwt de website naar de map dist/
npm run preview    # bekijk de gebouwde versie lokaal
```

## Online zetten (GitHub Pages)

1. Push deze map naar een GitHub-repo (branch `main`).
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Elke push naar `main` bouwt en publiceert automatisch.
   De link verschijnt onder **Settings → Pages** en bij de Actions-run.

De tool wordt geserveerd op `https://<gebruikersnaam>.github.io/<repo-naam>/`.

## Updaten

Wijzig `src/HandbalVoedingstool.jsx`, commit en push naar `main`. De site werkt
zichzelf binnen ~1 minuut bij. Iedereen met de link ziet automatisch de nieuwe
versie.
