const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { find } = require('domutils')
const express = require('express')
const app = express()

// using axios to scrape the webpage
axios('https://wltest.dns-systems.net/')
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const products = []
//Scraping 4 products
        $('.col-xs-4', html).each(function(){
            const title = $(this).find('h3').text()
            const name = $(this).find('.package-name').text()
            const description = $(this).find('.package-name').text()
            const price = $(this).find('.price-big').text().replace('£','')
            const discount = $(this).find('.package-price').find('p').text()
            products.push({
                title,
                name,
                description,
                price,
                discount
            })
        })
//Scraping for the remaining 2 products       
        $('.col-cs-4', html).each(function(){
            const title = $(this).find('h3').text()
            const name = $(this).find('.package-name').text()
            const description = $(this).find('.package-name').text()
            const price = $(this).find('.price-big').text().replace('£','')
            const discount = $(this).find('.package-price').find('p').text()
            products.push({
                title,
                name,
                description,
                price,
                discount
            })
        })
//Sorting the Products
        products.sort((a, b) => {
           return a.price - b.price;

        })
       products.reverse()
        console.log(products)

    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running'))

//‘option title, ‘description’, ‘price’ and ‘discount’ 