import 'dotenv/config';
import axios from 'axios';
import cheerio from 'cheerio';


const BASE_URL = String(process.env.SITE_BASE_URL);

async function fetchHTML(url: string): Promise<string> {
    const { data } = await axios.get(url);
    return data;
}

async function scrape(): Promise<void> {
    const html = await fetchHTML(BASE_URL);

    const $ = cheerio.load(html);

    // For demonstration, let's scrape all the headers from the website
    $('h1, h2, h3, h4, h5, h6').each((_idx, el) => {
        const header = $(el).text();
        console.log(header);
    });
}

scrape()
    .then(() => {
        console.log("Scraping finished.");
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });