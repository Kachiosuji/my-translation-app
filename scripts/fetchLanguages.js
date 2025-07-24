import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const key = process.env.VITE_GOOGLE_API_KEY;
    const res = await axios.get(
        'https://translation.googleapis.com/language/translate/v2/languages',
        { params: { key, target: 'en' } }
    );
    const langs = res.data.data.languages;
    const fileContent =
        'export default ' + JSON.stringify(langs, null, 2) + ';';
    fs.writeFileSync('src/constants/googleLanguages.js', fileContent);
    console.log('✅ src/constants/googleLanguages.js generated');
})();