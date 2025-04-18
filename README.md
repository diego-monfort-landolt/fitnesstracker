# 🏋️‍♂️ Fitness Tracker

Ein einfacher, moderner Fitness Tracker, gebaut mit **React + Vite + TypeScript**, um deine täglichen Aktivitäten zu tracken:

- 💪 Workouts (Minuten)
- 🔥 Kalorienverbrauch
- 😴 Schlafdauer (Stunden)

### https://diego-monfort-landolt.github.io/fitnesstracker/

---

## 🚀 Features

- 📊 **Interaktive Diagramme** mit Chart.js
- 🌙 **Dark Mode** Toggle (mit Icon)
- 📲 **PWA (offlinefähig)** via Vite Plugin
- 🔔 **Benachrichtigung**, wenn du dein Workout-Ziel erreichst (z. B. 30min)
- 💾 **Datenpersistenz** via `localStorage`
- 🎯 **Tägliche Ziele** in der Übersicht

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chart.js](https://www.chartjs.org/) + `react-chartjs-2`
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📦 Installation

```bash
# Projekt klonen
git clone https://github.com/diego-monfort-landolt/fitnesstracker.git
cd fitnesstracker

# Abhängigkeiten installieren
npm install

# Lokalen Dev-Server starten
npm run dev
```

## 📈 Diagramm-Vorschau
Die Fortschrittsdiagramme zeigen:

Workout-Zeit (grün)

Kalorien (orange)

Schlaf (blau)

📍Daten werden automatisch gespeichert (localStorage).

🌐 PWA Support
Dieses Projekt ist als Progressive Web App (PWA) konfiguriert:

vite-plugin-pwa inkludiert

manifest.json wird automatisch generiert

App kann auf Homescreen installiert werden

🌓 Dark Mode
Klick auf das 🌙 Icon oben rechts, um den Dark Mode zu aktivieren.

🔔 Benachrichtigungen
Wenn dein Workout-Ziel ≥ 30 Minuten erreicht ist, bekommst du eine Browser-Benachrichtigung.

⚠️ Du musst beim ersten Besuch die Erlaubnis zum Senden von Benachrichtigungen erteilen

# 🧩 Coming Soon: Backend + VIP-Funktion
In Planung ist ein Backend, um Daten auch geräteübergreifend zu speichern.
Zusätzlich soll es eine VIP-Funktion geben, z. B. mit erweiterten Statistiken, Wochen-Reports oder personalisierten Zielen.

> 📣 **Mithelfen erwünscht!**  
> Du hast Ideen oder willst dich beteiligen?  
> **Feel free to contribute** oder schreib mir einfach direkt. Jede Unterstützung ist willkommen!
