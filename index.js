const express = require('express');
const request = require('request-promise');
//dotenv req
require('dotenv').config();
const app = express();
const PORT=process.env.PORT || 3000;

const generateScrapperUrl =(apiKey)=>{
    return `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;
}



app.use(express.json());
app.get('/', (req, res)=>{
    res.send(`welcome to amazon scraper API`);
});


//get product details
app.get('/products/:productId?', async (req, res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

//get product reviews
app.get('/products/:productId/reviews', async (req, res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }

}
);

//get product offers
app.get('/products/:productId/offers', async (req, res)=>{
    const {productId} = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
}
);
// search query
app.get('/search/:searchQuery', async (req, res)=>{
    const {searchQuery} = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }

}
);
//start server on port 3000 or any other available port number of your choice


app.listen(PORT,()=>console.log(`hello`));

