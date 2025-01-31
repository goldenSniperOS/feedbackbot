import { ChatResponse, Origin } from '../types/message';
import ExcelJS from 'exceljs';
import { ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/../../.env.local'  });
import clientPromise from '../lib/mongodb';

(async () => {
    let compiledResponses: ChatResponse[] = [];
    console.log(`- Connecting to MongoDB...`);
    const client = await clientPromise;
    const db = client.db("feedbackbot");
    try {
        console.log(`- MongoDB successfully connected, Loading Messages...`);
        const messages = await db
            .collection("responses")
            .find({ order: 2 })
            .sort({ order: 1 })
            .toArray();

        // await db
        //     .collection("responses")
        //     .deleteMany({ order: 2 });

        //Amazon Loading
        console.log(`- ${messages.length} existant DB messages loaded, loading amazon responses...`);
        const amazonFileName = 'src/scripts/amazon.xlsx';
        const amazonWorkbook = new ExcelJS.Workbook();
        const amazonRes = await amazonWorkbook.xlsx.readFile(amazonFileName);
        amazonRes.getWorksheet(1).eachRow({ includeEmpty: false }, function(row) {
            const date = row.values[1];
            const value = row.values[3];
            const existantMessage = messages.find((m) => m.value === value);
            if(!existantMessage) {
                compiledResponses.push({
                    order: 2,
                    message: value,
                    origin: Origin.Amazon,
                    chatId: new ObjectId().toString(),
                    value,
                    date,
                });
            }
        });
        const amazonLength = compiledResponses.length;
        console.log(`- ${amazonLength} new amazon responses loaded, loading ebay responses...`);

        //Ebay Loading
        const ebayFileName = 'src/scripts/ebay.xlsx';
        const ebayWorkbook = new ExcelJS.Workbook();
        const ebayRes = await ebayWorkbook.xlsx.readFile(ebayFileName);
        const start1 = new Date("2023-05-1") // Dec 1 2022
        const end1 = new Date("2023-06-1") // May 1 2023
        ebayRes.getWorksheet(1).eachRow({ includeEmpty: false }, function(row) {
            const date = new Date(+start1 + Math.random() * ((+end1) - (+start1)));
            const value = row.values[3];
            const existantMessage = messages.find((m) => m.value === value);
            if(!existantMessage) {
                compiledResponses.push({
                    order: 2,
                    message: value,
                    origin: Origin.Ebay,
                    chatId: new ObjectId().toString(),
                    value,
                    date,
                });
            }
        });
        const start2 = new Date("2022-12-1") // Dec 1 2022
        const end2 = new Date("2023-05-1") // May 1 2023
        ebayRes.getWorksheet(2).eachRow({ includeEmpty: false }, function(row) {
            const date = new Date(+start2 + Math.random() * ((+end2) - (+start2)));
            const value = row.values[3];
            const existantMessage = messages.find((m) => m.value === value);
            if(!existantMessage) {
                compiledResponses.push({
                    order: 2,
                    message: value,
                    origin: Origin.Ebay,
                    chatId: new ObjectId().toString(),
                    value,
                    date,
                });
            }
        });
        const start3 = new Date("2022-06-1") // Dec 1 2022
        const end3 = new Date("2022-12-1") // May 1 2023
        ebayRes.getWorksheet(3).eachRow({ includeEmpty: false }, function(row) {
            const date = new Date(+start3 + Math.random() * ((+end3) - (+start3)));
            const value = row.values[3];
            const existantMessage = messages.find((m) => m.value === value);
            if(!existantMessage) {
                compiledResponses.push({
                    order: 2,
                    message: value,
                    origin: Origin.Ebay,
                    chatId: new ObjectId().toString(),
                    value,
                    date,
                });
            }
        });
        
        // Responses filtering
        console.log(`- ${compiledResponses.length - amazonLength} new ebay responses loaded, inserting responses...`);
        if(compiledResponses.length > 0) {
            await db
            .collection("responses")
            .insertMany(compiledResponses);
            console.log(`- ${compiledResponses.length} responses added.`);
        } else {
            console.log(`- No new responses to be added.`);
        }
        
        
        client.close();
    } catch (error) {
        console.error(error);
    }
})();


