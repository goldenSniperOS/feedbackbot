import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/../../.env.local'  });
import clientPromise from '../lib/mongodb';

import { ChatResponse, MessageClassification, MessageClassificationType } from '../types/message';
import { fromDBResultsToClassifications, fromDBResultsToResponses } from '../utils/mappers';
import { promises as fs } from 'fs';

const { NlpManager } = require('node-nlp');

export const classify = (nlpAnalyze: any, date: Date) : (MessageClassification | null) => {
    const { nluAnswer = null, utterance = "" } = nlpAnalyze;

    if(nluAnswer === null) {
        return null;
    }
    
    const { classifications: nlpClassifications = []} = nluAnswer;

    let major = -Infinity;
    let nlpClassificationSelected: any = null; 

    for (let i = 0; i < nlpClassifications.length; i++) {
        const nlpClassification = nlpClassifications[i];
        if (nlpClassification.score > major) {
            major = nlpClassification.score;
            nlpClassificationSelected = nlpClassification;
        }
    }

    if(!nlpClassificationSelected)
        return null;

    return { 
        phrase: utterance,
        intent: nlpClassificationSelected?.intent,
        score: nlpClassificationSelected?.score,
        type: checkIfIsPositiveOrNegative(nlpClassificationSelected.intent),
        date
    };
}

const checkIfIsPositiveOrNegative = ( classificationIntent: string ): MessageClassificationType => {
    if(classificationIntent.indexOf('positive') !== -1 || classificationIntent.indexOf('good') !== -1) {
        return MessageClassificationType.positive;
    }
    return MessageClassificationType.negative;
}

(async () => {
    console.log(`- Connecting to MongoDB...`);
    const client = await clientPromise;
    const db = client.db("feedbackbot");
    let classificationsToBeSaved: MessageClassification[] = [];
    try {
        console.log(`- MongoDB successfully connected, Loading Responses...`);
        const responses : ChatResponse[] = fromDBResultsToResponses(await db
            .collection("responses")
            .find({ order: 2 })
            .sort({ order: 1 })
            .toArray());

        console.log(`- ${responses.length} responses founded successfully loaded, Loading previous classifications...`);
        const classifications: MessageClassification[] = fromDBResultsToClassifications(await db
            .collection("classifications")
            .find({})
            .toArray());
        
        console.log(`- ${classifications.length} classifications founded successfully loaded, filtering already classified responses...`);

        const responsesToBeClassified = responses.filter((r) => {
            const matchedClassification = classifications.find((c) => r.value === c.phrase);
            return matchedClassification === undefined;
        });

        console.log(`- Initializing NLP Manager and loading model.nlp file...`);
        const manager = new NlpManager({ languages: ['en', 'de'], forceNER: true });
        await manager.load(`model.nlp`);

        console.log(`- Start responses classification, processing ${responsesToBeClassified.length} responses...`);
        for (let i = 0; i < responsesToBeClassified.length; i++) {
            const { value, date } = responsesToBeClassified[i];
            const analyze = await manager.process('de', value);
            const classification: (MessageClassification | null) = classify(analyze, date);

            if (classification !== null)
                classificationsToBeSaved.push(classification);
        }
        console.log(`- Preparing ${classificationsToBeSaved.length} classifications to be saved...`);
        if(classificationsToBeSaved.length > 0) {
            await db
            .collection("classifications")
            .insertMany(classificationsToBeSaved);
            console.log(`- ${classificationsToBeSaved.length} classifications added.`);
        } else {
            console.log(`- No new classifications to be added.`);
        }

        client.close();
    } catch (error) {
        console.error(error);
    }
    
})();