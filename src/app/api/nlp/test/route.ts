import { NextResponse } from 'next/server';
const { NlpManager } = require('node-nlp');

export async function POST() {
    const manager = new NlpManager({ languages: ['en', 'de'], forceNER: true });
    await manager.load('model.nlp');
    const analyze = await manager.process('de', "Gute Ware und gute Verpackung. Wenn UPS weiterhin den Versand übernimmt werde ich nicht mehr bestellen. 1.Tag Der Zusteller war so schnell weg das ich so schnell nicht aus dem Garten an die Haustüre kam. 2.Tag Zustellfenster 12:30-16:30 ich hatte Urlaub, jedoch kam kein Paket, neuer Termin am 3.Tag wieder 12:30-16:30. Der UPS Fahrer war sehr unfreundlich und knallte mir das Rohr an die Hauswand mit dummen Kommentaren. Nie mehr UPS.");
    return NextResponse.json(analyze);
}