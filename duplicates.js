import * as fs from 'fs';

(async () => {
    const THEME = "minecraft";

    async function processLang(lang) {
        const texts = [];

        let index = 0;
        const questions = JSON.parse(fs.readFileSync(THEME+"/questions_"+lang+".json"));
        const output = [];
        for (const q of questions) {
            if (texts.includes(q.question+"-"+q.correct_answer)) {

                continue;
            }
            output.push(q);
            texts.push(q.question+"-"+q.correct_answer);
        }
        console.log(lang+" Removed " + (questions.length - output.length) + " duplicates");
        fs.writeFileSync(THEME+"/questions_"+lang+".json", JSON.stringify(output, null, 2));
    }

    await processLang("en");
    await processLang("ru");
    await processLang("es");
    await processLang("pt");
})();