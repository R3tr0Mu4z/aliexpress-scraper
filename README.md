# Aliexpress Research Tool (Server)
Tool to download Aliexpress product's gallery images, SKU images, history of last 6 months (order and countries). 

### Technologies used  : Node JS, Puppeteer JS, Express JS.


## Installation
```
git clone https://github.com/R3tr0Mu4z/aliexpress-research-tool-server.git
cd aliexpress-research-tool-server
npm install
npm start
```

## On Heroku
```
git clone https://github.com/R3tr0Mu4z/aliexpress-research-tool-server.git
cd aliexpress-research-tool-server
npm install
heroku create 'YOUR-APP-NAME'
heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add heroku/nodejs
git push heroku master

```

## Downloading Aliexpress gallery images

Send a GET request with JSON object to https://YOUR-HOST/aliexpress/gallery
```JSON
{
	"url": String,
	"useragent": String
}
```
### Example to https://serverbetav2.herokuapp.com/aliexpress/gallery
```JSON
{
	"url": "https://www.aliexpress.com/item/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy/32955235363.html",
	"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7"
}
```
#### Response 
```JSON
[
    {
        "product_id": "32955235363",
        "title": "Image 1",
        "url": "https://ae01.alicdn.com/kf/HTB1iuCCXLfsK1RjSszgq6yXzpXa6/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "Image 2",
        "url": "https://ae01.alicdn.com/kf/HTB1YxXdacfrK1RjSszcq6xGGFXaF/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "Image 3",
        "url": "https://ae01.alicdn.com/kf/HLB1u.WyXLvsK1RjSspdq6AZepXaL/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "Image 4",
        "url": "https://ae01.alicdn.com/kf/HTB11z1zXN_rK1RkHFqDq6yJAFXa5/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "Image 5",
        "url": "https://ae01.alicdn.com/kf/HTB1Ea1yXUvrK1RjSspcq6zzSXXah/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "Image 6",
        "url": "https://ae01.alicdn.com/kf/HTB1daOCXJzvK1RkSnfoq6zMwVXa4/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg"
    }
]
```

## Downloading Aliexpress SKU images
Send a GET request with JSON object to https://YOUR-HOST/aliexpress/sku
```JSON
{
	"url": String,
	"useragent": String
}
```
### Example to https://serverbetav2.herokuapp.com/aliexpress/sku
```JSON
{
	"url": "https://www.aliexpress.com/item/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy/32955235363.html",
	"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7"
}
```

```JSON
[
    {
        "product_id": "32955235363",
        "title": "02",
        "url": "https://ae01.alicdn.com/kf/HTB1dq2lXk95K1Rjt_biq6xzbVXaa/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "01",
        "url": "https://ae01.alicdn.com/kf/HTB110R_XcfrK1RjSszcq6xGGFXaS/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "06",
        "url": "https://ae01.alicdn.com/kf/HTB1eMlhadzvK1RkSnfoq6zMwVXa8/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "07",
        "url": "https://ae01.alicdn.com/kf/HTB1IzddacvrK1Rjy0Feq6ATmVXaH/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "08",
        "url": "https://ae01.alicdn.com/kf/HTB1v2ddaiDxK1RjSsphq6zHrpXar/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "04",
        "url": "https://ae01.alicdn.com/kf/HTB1.Wl_XfvsK1RjSspdq6AZepXaK/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "03",
        "url": "https://ae01.alicdn.com/kf/HTB1Nf0_XoLrK1Rjy1zbq6AenFXab/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    },
    {
        "product_id": "32955235363",
        "title": "09",
        "url": "https://ae01.alicdn.com/kf/HTB1AM..X5rxK1RkHFCcq6AQCVXao/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy.jpg_640x640.jpg"
    }
]
```

## Getting Aliexpress product's order history by Date for last 6 month

Send a GET request with JSON object to https://YOUR-HOST/aliexpress/chart
```JSON
{
	"url": String,
	"useragent": String
}
```
### Example to https://serverbetav2.herokuapp.com/aliexpress/chart
```JSON
{
	"url": "https://www.aliexpress.com/item/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy/32955235363.html",
	"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7"
}
```
#### Response 
```
data will be available in http://serverbetav2.herokuapp.com/file?name=32955235363-chart.json
please check back within a few mins
```
#### 32955235363-chart.json file
```JSON
[
    {
        "product_id": "32955235363",
        "date": "17 Dec 2018",
        "number": 5
    },
    {
        "product_id": "32955235363",
        "date": "16 Dec 2018",
        "number": 1
    },
    {
        "product_id": "32955235363",
        "date": "14 Dec 2018",
        "number": 4
    },
    {
        "product_id": "32955235363",
        "date": "13 Dec 2018",
        "number": 20
    },
    {
        "product_id": "32955235363",
        "date": "12 Dec 2018",
        "number": 17
    },
    {
        "product_id": "32955235363",
        "date": "11 Dec 2018",
        "number": 11
    },
    {
        "product_id": "32955235363",
        "date": "10 Dec 2018",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "date": "09 Dec 2018",
        "number": 9
    },
    {
        "product_id": "32955235363",
        "date": "08 Dec 2018",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "date": "07 Dec 2018",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "date": "06 Dec 2018",
        "number": 18
    },
    {
        "product_id": "32955235363",
        "date": "05 Dec 2018",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "date": "04 Dec 2018",
        "number": 12
    },
    {
        "product_id": "32955235363",
        "date": "03 Dec 2018",
        "number": 14
    },
    {
        "product_id": "32955235363",
        "date": "02 Dec 2018",
        "number": 32
    },
    {
        "product_id": "32955235363",
        "date": "01 Dec 2018",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "date": "30 Nov 2018",
        "number": 25
    },
    {
        "product_id": "32955235363",
        "date": "29 Nov 2018",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "date": "28 Nov 2018",
        "number": 5
    },
    {
        "product_id": "32955235363",
        "date": "27 Nov 2018",
        "number": 58
    },
    {
        "product_id": "32955235363",
        "date": "26 Nov 2018",
        "number": 58
    },
    {
        "product_id": "32955235363",
        "date": "25 Nov 2018",
        "number": 6
    }
]
```

The connection will time-out on Heroku as it takes time to check each of the pages to calculate the result. The JSON data gets stored in /files directory of the server. The server automatically runs in the background and later writes the data into the file. The data is available after the process is complete.


## Getting Aliexpress product's order history by Countries for last 6 month
Send a GET request with JSON object to https://YOUR-HOST/aliexpress/chart
```JSON
{
	"url": String,
	"useragent": String
}
```
  ### Example to https://serverbetav2.herokuapp.com/aliexpress/geography
```JSON
{
	"url": "https://www.aliexpress.com/item/1-2Pcs-Baby-Groot-Flowerpot-Tree-Man-Flower-Pot-Planter-Action-Figures-Guardians-of-The-Galaxy/32955235363.html",
	"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7"
}
```
#### Response
```
data will be available in http://serverbetav2.herokuapp.com/file?name=32955235363-geography.json
please check back within a few mins
```
```JSON
#### 32955235363-geography.json
[
    {
        "product_id": "32955235363",
        "country_code": "MX",
        "number": 1
    },
    {
        "product_id": "32955235363",
        "country_code": "CL",
        "number": 18
    },
    {
        "product_id": "32955235363",
        "country_code": "BR",
        "number": 42
    },
    {
        "product_id": "32955235363",
        "country_code": "FR",
        "number": 19
    },
    {
        "product_id": "32955235363",
        "country_code": "PL",
        "number": 7
    },
    {
        "product_id": "32955235363",
        "country_code": "ES",
        "number": 15
    },
    {
        "product_id": "32955235363",
        "country_code": "DK",
        "number": 8
    },
    {
        "product_id": "32955235363",
        "country_code": "NZ",
        "number": 23
    },
    {
        "product_id": "32955235363",
        "country_code": "CA",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "SA",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "CZ",
        "number": 21
    },
    {
        "product_id": "32955235363",
        "country_code": "RU",
        "number": 16
    },
    {
        "product_id": "32955235363",
        "country_code": "MY",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "UA",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "SK",
        "number": 5
    },
    {
        "product_id": "32955235363",
        "country_code": "JP",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "SRB",
        "number": 4
    },
    {
        "product_id": "32955235363",
        "country_code": "US",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "country_code": "ID",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "AU",
        "number": 7
    },
    {
        "product_id": "32955235363",
        "country_code": "IN",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "country_code": "BE",
        "number": 12
    },
    {
        "product_id": "32955235363",
        "country_code": "KR",
        "number": 11
    },
    {
        "product_id": "32955235363",
        "country_code": "UK",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "PE",
        "number": 11
    },
    {
        "product_id": "32955235363",
        "country_code": "LT",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "AE",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "BG",
        "number": 3
    },
    {
        "product_id": "32955235363",
        "country_code": "HU",
        "number": 9
    },
    {
        "product_id": "32955235363",
        "country_code": "FI",
        "number": 7
    },
    {
        "product_id": "32955235363",
        "country_code": "TH",
        "number": 12
    },
    {
        "product_id": "32955235363",
        "country_code": "RO",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "NL",
        "number": 6
    },
    {
        "product_id": "32955235363",
        "country_code": "TR",
        "number": 8
    },
    {
        "product_id": "32955235363",
        "country_code": "MV",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "IL",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "DE",
        "number": 8
    },
    {
        "product_id": "32955235363",
        "country_code": "SV",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "HR",
        "number": 2
    },
    {
        "product_id": "32955235363",
        "country_code": "KZ",
        "number": 1
    },
    {
        "product_id": "32955235363",
        "country_code": "IE",
        "number": 1
    }
]
```

## The files to appear on the server depends on the history of the product, the more data, the more loading time.
