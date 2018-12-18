var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const puppeteer = require('puppeteer');

router.get('/testing', function(request, response) {
    console.log('working');
    response.send('working');
});

router.get('/list', function(request, response) {
    var search = request.body.search;
    var pages = request.body.pages;
    var useragent = request.body.useragent;
    (async () => {
      var result = await getProductList(search, pages, useragent);
      response.send(result);
    })();
});

router.get('/sku', function(request, response) {
    var url = request.body.url;
    var useragent = request.body.useragent;
    (async () => {
      var result = await getSKUImages(url, useragent);
      response.send(result);
    })();
});

router.get('/gallery', function(request, response) {
    var url = request.body.url;
    var useragent = request.body.useragent;

    (async () => {
      var result = await getGalleryImages(url, useragent);
      response.send(result);
    })();
});

router.get('/chart', function(request, response) {
    var url = request.body.url;
    var useragent = request.body.useragent;
    (async () => {
      var result = await getTransactionChart(url, useragent);
      response.send(result);
    })();
});

router.get('/geography', function(request, response) {
    var url = request.body.url;
    var useragent = request.body.useragent;
    (async () => {
      var result = await getCountryData(url, useragent);
      response.send(result);
    })();
});


//Gets list of products
async function getProductList(search_term, pagenumber, ua) {
try {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto('https://www.aliexpress.com/', {waitUntil: 'networkidle2'});
  await page.waitFor('input[name=SearchText]');
  await page.$eval('input[name=SearchText]', (el, search_term) => el.value = search_term, search_term);
  await closePopup(page);
  await page.click('input[type="submit"]');
  await closePopup(page);
  var products = [];
  var i = 1;
  while (i <= pagenumber) {
    await page.waitForSelector('#hs-below-list-items');
    await autoScroll(page);
    var list = await page.$$('#hs-below-list-items > li');
    for (var li of list) {
      var product = {};
      // console.log(li);
      var id = await li.$eval('.picRind', e => e.getAttribute('href'));
      id = id.split('item/')[1].split('/')[1].split('.')[0];
      product['id'] = id;
      product['name'] = await li.$eval('h3', h3 => h3.innerText);
      try {
         var rating = await li.$eval('.star', e => e.title);
         rating = rating.split(': ')[1].split(' ')[0];
         product['rating'] = rating;
      } catch(e) {
         product['rating'] = 'No data';
      }
      try {
         var image_url = await li.$eval('.picCore', e => e.getAttribute('src'));
         image_url = image_url.replace('//', 'https://')
         product['image'] = image_url;
      } catch(e) {
         product['image'] = 'No data';
      }
      try {
         var rate_user =  await li.$eval('.rate-num', e => e.innerText);
         rate_user = rate_user.split('(')[1].replace(')', '');
         product['rate_user'] = rate_user;
      } catch(e) {
         product['rate_user'] = 'No data';
      }
      try {
         var order = await li.$eval('.order-num-a ', e => e.innerText);
         order = order.split('(')[1].replace(')', '');
         product['orders'] = order;
      } catch(e) {
         product['orders'] = 'No data';
      }
      try {
         product['shippping'] = await li.$eval('.free-s', e => e.innerText);
      } catch(e) {
         product['shipping'] = 'No free shipping';
      }
      try {
         product['unit'] = await li.$eval('.unit', e => e.innerText);
      } catch(e) {
         product['unit'] = 'No data';
      }
      try {
         product['varients'] = await li.$eval('.has-sku-image', e => e.innerText);
      } catch(e) {
         product['varients'] = 'No data';
      }
      try {
         var price = await li.$eval('.price > .value', e => e.innerText);
         price = price.split(' ')[1];
         product['price'] = price;
      } catch(e) {
         product['price'] = 'No data';
      }
      var link = await li.$eval('.picRind', e => e.getAttribute('href'));
      product['link'] = link.split('?')[0].replace('//', 'https://');
      // console.log(product);
      products.push(product);
      }
      try {
        await page.waitForSelector('a.page-next');
        await page.click('a.page-next');
        i++;
      } catch(e) {
        i = pages;
      }
    }
    browser.close();
    return products;
  } finally {
  }
}

//Gets SKU images
async function getSKUImages(url,ua) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto(url, {waitUntil: 'networkidle2'});
  await closePopup(page)
  await blockImages(page);
  await page.waitForSelector('.sku-attr-list');
  var sku_list = await page.$$('.sku-attr-list > li.item-sku-image');
  var skus = [];
  for (var li of sku_list) {
    var sku = [];
    sku = {};
    sku['product_id'] = url.split('item/')[1].split('/')[1].split('.')[0];
    try {
       sku['title'] = await li.$eval('a', e => e.title);
    } catch(e) {
       sku['title'] = 'No data';
    }
    try {
       sku['url'] = await li.$eval('img', e => e.getAttribute('bigpic'));
    } catch(e) {
       sku['url'] = 'No data';
    }
    console.log('new sku');
    skus.push(sku);
  }
  browser.close();
  return skus;
}

//Gets Gallery images
async function getGalleryImages(url,ua) {
  console.log('launching puppeteer');
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  console.log('puppeteer launched');
  const page = await browser.newPage();
  console.log('working');
  await page.setUserAgent(ua);
  console.log('working');
  await page.goto(url);
  console.log('working');
  await closePopup(page)
  console.log('working');
  await blockImages(page);
  console.log('working');
  await page.waitForSelector('.image-thumb-list');
  console.log('working');
  var gallery_list = await page.$$('.image-thumb-list > li');
  console.log('working');
  var gallery = [];
  var img = 1;
  for (var li of gallery_list) {
    var gallery_item = [];
    gallery_item = {};
    gallery_item['product_id'] = url.split('item/')[1].split('/')[1].split('.')[0];
    gallery_item['title'] = 'Image ' + img;
    try {
       var img_url = await li.$eval('img', e => e.getAttribute('src'));
       img_url = img_url.split('_5')[0];
       gallery_item['url'] = img_url;
    } catch(e) {
       gallery_item['url'] = 'No data';
    }
    gallery.push(gallery_item);
    img++;
  }
  browser.close();
  return gallery;
}


//Get transactions chart of last 6 months
async function getTransactionChart(url,ua) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await blockImages(page);
  await page.setUserAgent(ua);
  await page.goto(url, {waitUntil: 'networkidle2'});
  await closePopup(page);
  try {
  await autoScroll(page);
  } catch(e) {
  }
  var transaction_orders = [];
  var n = -1;
  var i = 1;
  while (n < 1) {
  await page.waitForSelector('.feedback-list');
  var transaction_order_list = await page.$$('.feedback-list table tr td.col-order');
  var transaction_order = {};
  for (var td of transaction_order_list) {
    try {
      var date = await td.$eval('.order-time', e => e.innerText);
      date = date.slice(0, -6);
      transaction_order = {};
      transaction_order['product_id'] = url.split('item/')[1].split('/')[1].split('.')[0];
      transaction_order['date'] = date;
      transaction_order['number'] = 1;
    } catch(e) {
    }
    var index = transaction_orders.findIndex(x => x.date==date)
    if (index == -1) {
    transaction_orders.push(transaction_order);
  } else {
      transaction_orders[index]['number']++;
    }
    i++;
  }
  try {
    // console.log('--------------------------------------');
    await page.waitForSelector('.ui-pagination-next');
    await page.click('.ui-pagination-next');
    await delay(4000);
    // console.log(transaction_orders);
    try {
      await page.waitForSelector('span.ui-pagination-next.ui-pagination-disabled', {timeout : 50});
      // console.log('found disabled');
      n++;
      await delay(4000);
      await page.waitForSelector('.ui-pagination-next');
      await page.click('.ui-pagination-next');
    } catch(e) {}
  } catch(e) {
    n = 1;
  }
}
    browser.close();
    return transaction_orders;
}


async function getCountryData(url,ua) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await blockImages(page);
  await page.setUserAgent(ua);
  await page.goto(url, {waitUntil: 'networkidle2'});
  await closePopup(page);
  try {
  await autoScroll(page);
  } catch(e) {
  }
  var n = -1;
  var i = 1;
  var countries = [];
  while (n < 1) {

  await page.waitForSelector('.feedback-list');
  var country_list = await page.$$('.feedback-list table tr td.col-buyer');

  var country = {};

  for (var td of country_list) {
    try {
      var country_code = await td.$eval('.user-country', e => e.innerText);
      country = {};
      country['product_id'] = url.split('item/')[1].split('/')[1].split('.')[0];
      country['country_code'] = country_code;
      country['number'] = 1;
    } catch(e) {
    }
    var index = countries.findIndex(x => x.country_code==country_code)
    if (index == -1) {
    countries.push(country);
    } else {
      countries[index]['number']++;
    }
    i++;
  }
  try {
    // console.log('--------------------------------------');
    await page.waitForSelector('.ui-pagination-next');
    await page.click('.ui-pagination-next');
    await delay(4000);
    // console.log(countries);
    try {
      await page.waitForSelector('span.ui-pagination-next.ui-pagination-disabled', {timeout : 50});
      // console.log('found disabled');
      n++;
      await delay(4000);
      await page.waitForSelector('.ui-pagination-next');
      await page.click('.ui-pagination-next');
    } catch(e) {}
  } catch(e) {
    n = 1;
  }
}
    browser.close();
    return countries;
}


//Auto scrolls the page
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

//Close popup
async function closePopup(page) {
  try {
    // console.log('Waiting for popups');
    await page.waitForSelector('.close-layer', {timeout : 4000});
    await page.click('.close-layer');
  } catch(e) {
  }
}

//Delay
function delay(time) {
   return new Promise(function(resolve) {
       setTimeout(resolve, time)
   });
}

//Block images
async function blockImages(page) {
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')){
      interceptedRequest.abort();
    } else{
      interceptedRequest.continue();
    }
  });
}

module.exports = router;
