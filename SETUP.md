# Setup

## Prerequisites
- Node.js v18+
- Angular CLI (`npm i -g @angular/cli`)

## Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
CURRENCY_API_KEY=your_api_key_here
PORT=3000
```

Get your free API key from https://freecurrencyapi.com

```bash
npm run start:dev
```

Backend runs on `http://localhost:3000`

## Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`
