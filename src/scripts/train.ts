import { promises as fs } from 'fs';
import path from "path";
const { NlpManager } = require('node-nlp');

(async () => {
    console.log(`- Starting NLP training...`);
    const manager = new NlpManager({ languages: ['en', 'de'], forceNER: true });

    // Load training JSON file.
    const jsonDirectory = path.join(process.cwd(), 'src', 'lib');
    console.log(`- Read src/lib/training.json file...`);
    const fileContents = await fs.readFile(`${jsonDirectory}/training.json`, 'utf8');
    console.log(`- Load training file into an object...`);
    const trainings = JSON.parse(fileContents);

    console.log(`- Adding training phrases...`);
    trainings.phrases.forEach((p) =>{
        manager.addDocument(trainings.language, p.phrase, p.category);
    });
    console.log(`- Training phrases into a model...`);
    await manager.train();
    console.log(`- Saving model file...`);
    await manager.save();
    console.log(`- Training Completed Succesfully...`);
})();
