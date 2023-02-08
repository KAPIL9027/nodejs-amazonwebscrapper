const url = "https://www.amazon.in/GALAX-GeForce-1-Click-192-bit-Graphics/dp/B092CNSSV5/ref=sr_1_2_sspa?crid=3O2W466XSRRW8&keywords=nvidia%2Brtx%2B3060&qid=1656072031&sprefix=nvidia%2B%2Caps%2C335&sr=8-2-spons&smid=A1NDZY44BCNIQJ&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFBRldSSFNHOFZPTVEmZW5jcnlwdGVkSWQ9QTA1NTAxMTIzNFVHTFBOMEVFN05QJmVuY3J5cHRlZEFkSWQ9QTAwNzk5MzMxUDQxQ0lGVkI5WUImd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl&th=1";
const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();

const auth_token = process.env.AUTH_TOKEN;
const account_sid = process.env.ACCOUNT_SID;
const client = require('twilio')(account_sid,auth_token);
const product = {name: "",
               price: 0,
               link: ""}

// const handle = setInterval(scrape,20000);
const scrape = async ()=>
{
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    const item = $("div#dp-container");
    console.log(item);
    product.name = $(item).find("h1 span#productTitle").text();

    product.link = url;
    
    const price = $(item).find("span .a-price-whole").first().text().replace(/[,.]/g,"");
    const priceNum = parseInt(price);
    product.price = priceNum;
    console.log(product);
    if(product.price < 50000)
    {
        client.messages.create({
            body: `${product.name} price has come down to ${product.price}. Buy it now at ${product.link}`,
            from: "+13392177226",
            to:   "+919711890816"
        }).then((message)=>
        {
        //   clearInterval(handle);
          console.log(message);
        })
    }
    
}
 scrape();
