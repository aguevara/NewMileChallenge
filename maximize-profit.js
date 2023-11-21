import pricesJson from './price.json' assert {type: "json"}

const prices = pricesJson.prices;
prices.sort((x,y) => parseFloat(x.Price) - parseFloat(y.Price));

let bestTrade = {
	"BuyDate": new Date(),
	"BuyPrice": 0.0,
	"SellDate": new Date(),
	"SellPrice": 0.0,
	"Profit": 0.0,
	"Rate": 0.0
};

for(var i=prices.length-1; i>-1; i--)
for(var j=0; j < i; j++) {
	let t = {
				"BuyDate": new Date(prices[j].Date),
				"BuyPrice": prices[j].Price,
				"SellDate": new Date(prices[i].Date),
				"SellPrice": prices[i].Price,
				"Profit": prices[i].Price - prices[j].Price,
				"Rate": +(100 * (prices[i].Price - prices[j].Price)/prices[j].Price).toFixed(0)
			};
	if(t.BuyDate < t.SellDate)
	if(t.Profit > bestTrade.Profit){
		bestTrade = t;
	}
}

const currencyFormat = { style: "currency", "currency":"USD" };
const dateFormat = { dateStyle: "full", timeZone: 'America/New_York' };
const format = {
	"BuyDate": new Intl.DateTimeFormat ("en-US", dateFormat).format (bestTrade.BuyDate),
	"BuyPrice": new Intl.NumberFormat ("en-US", currencyFormat).format (bestTrade.BuyPrice),
	"SellDate": new Intl.DateTimeFormat ("en-US",  dateFormat).format (bestTrade.SellDate),
	"SellPrice": new Intl.NumberFormat ("en-US", currencyFormat).format (bestTrade.SellPrice),
	"Profit": new Intl.NumberFormat ("en-US",  currencyFormat).format (bestTrade.Profit),
	"Rate": new Intl.NumberFormat ().format (bestTrade.Rate)
};

console.log(`Buy ${format.BuyDate} for ${format.BuyPrice}`);
console.log(`Sell ${format.SellDate} for ${format.SellPrice}`);
console.log(`Profit ${format.Profit}`);
console.log(`Return ${format.Rate}%`);
