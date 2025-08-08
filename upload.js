// upload.js
import fs from 'fs';
import fetch from 'node-fetch'; // para Node.js

const API_URL = 'https://689632ca039a1a2b2891bdd1.mockapi.io/api/events';

// Leer el archivo db.json
const rawData = fs.readFileSync('./db.json', 'utf-8');
const jsonData = JSON.parse(rawData);

// Subir cada evento
async function uploadData() {
  for (const event of jsonData.events) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!res.ok) {
        console.error(`❌ Error subiendo evento ${event.id}: ${res.statusText}`);
      } else {
        console.log(`✅ Evento ${event.id} subido correctamente`);
      }
    } catch (err) {
      console.error(`⚠️ Fallo con evento ${event.id}:`, err.message);
    }
  }
}

uploadData();
