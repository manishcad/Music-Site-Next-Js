import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    try {
        // Replace this with the URL of the website you want to scrape

        
        
        const albums = [];

        for(let i=1;i<4;i++){
        const URL = `https://www7.hiphopkit.com/music/album/page/${+i}/`;  
        
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        // Adjust the selector based on the website's structure
        $('.myfile').each((index, element) => {
            const image = $(element).find('.image img').attr("data-src") || "https://png.pngtree.com/png-vector/20221217/ourmid/pngtree-vinyl-disc-png-image_6527519.png"
            console.log(image)
            const link = $(element).find('.infohome h3 a').attr('href');
            const title = $(element).find('.infohome h3 a').text().trim();

            if (link && image) {
                albums.push({ link, title,image });
            }
        });
        }
        

        res.status(200).json(albums);
    } catch (error) {
        console.error('Error scraping albums:', error);
        res.status(500).json({ error: 'Failed to scrape albums' });
    }
}
