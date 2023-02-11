function coinflip_func() {
	showPopup('coinflip');
	$('#sidemenu').style.opacity = 0.3;
	$('#sidemenu').style.pointerEvents = 'none';
	$('#coins').className = '';
	$('#cf_output').innerHTML = '';
	tradeArray = [];
	$('#startCoinFlipBTN').disabled = false;
}
$('#coinflip_func').addEventListener('click', coinflip_func);


function start_coinflip_func() {
	showPopup('moveInv');
	rendMoveInv('startCoinFlipVBot');
	$('#sidemenu').style.opacity = 0.3;
	$('#sidemenu').style.pointerEvents = 'none';
	$('#coins').className = '';
}
$('#startCoinFlipBTN').addEventListener('click', start_coinflip_func);

var tradeAcceptFunction = '';
var tradeArray = [];
var m = 1000000000000;
var p2 = 0;
$('#prevbtn2').addEventListener('click', function() {
	p2--;
	rendMoveInv(tradeAcceptFunction, m);
});
$('#nextbtn2').addEventListener('click', function() {
	p2++;
	rendMoveInv(tradeAcceptFunction, m);
});
$('#pn2').addEventListener('click', function() {
	this.select();
});
$('#pn2').addEventListener('keyup', function(e) {
	if (e.keyCode == 13) {
		this.blur();
	}
});
$('#pn2').addEventListener('blur', function(e) {
	if (!isNaN(parseFloat(this.value)) && isFinite(this.value)) {
		p2 = this.value-1;
	} else {
		this.value = p2;
	}
	rendMoveInv(tradeAcceptFunction, m);
});
function rendMoveInv(TradeFunction, jj) {
	m = jj;
	tradeAcceptFunction = TradeFunction;

	$('#invWeapons').innerHTML = '';
	$('#BetWith').innerHTML = '';

	var il = 0;
	for (var i = 0; i < userdata.inv.length; i++) {
		if (getItemData(userdata.inv[i].name).type == 'skin') {
			il++;
		}
	}

	var ps = 0;
	var ipp = 20;

	var ilw = il;
	while (ilw > ipp) {
		ps++;
		ilw = ilw - ipp;
	}

	if (p2 < 0) {
		p2 = 0;
	} else if (p2 > ps) {
		p2 = ps;
	}

	$('#pn2').value = p2+1;

	for (var i = 0; i < userdata.inv.length; i++) {
		if (userdata.inv[i] != undefined) {
			var data = getItemData(userdata.inv[i].name);
			if (data.type == 'skin') {
				var itemD = document.createElement('div');

				var stattrak = '';
				if (userdata.inv[i].stattrak == true) {
					stattrak = 'stattrak';
				}

				itemD.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + data.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + data.name + '</div><div class="price">' +
				((stattrak == 'stattrak' ? data.price * 3 : data.price) * wtp[userdata.inv[i].t]).toFixed(2)
				 + '€</div>';
				itemD.className = 'item ' + data.class +  ' ' + stattrak + ' ' + userdata.inv[i].t;
				itemD.setAttribute('i', i)

				if (tradeArray.indexOf(i + '') > -1) {
					$('#BetWith').appendChild(itemD)

					itemD.addEventListener('click', function() {
						tradeArray.splice(tradeArray.indexOf(this.getAttribute('i')), 1);
						rendMoveInv(tradeAcceptFunction, m);
					});
				} else if ( (p2*ipp) <= i && (ipp + p2*ipp) > i ) {
					$('#invWeapons').appendChild(itemD)

					itemD.addEventListener('click', function() {
						tradeArray.push(this.getAttribute('i'));
						rendMoveInv(tradeAcceptFunction, m);
					});
				}
			}
		}
	}

	var price = 0;
	for (var i = 0; i < tradeArray.length; i++) {
		var item = getItemData(userdata.inv[tradeArray[i]].name);

		price = price + item.price * ((userdata.inv[tradeArray[i]].stattrak) ? 3 : 1) * wtp[userdata.inv[tradeArray[i]].t];
	}
	$('#tradeValue').innerHTML = price.toFixed(2) + '€';

	$('#tradeDoFunc').disabled = false;
	if (m != undefined) {
		if (price > m) {
			$('#tradeDoFunc').disabled = true;
		}
	}

}

$('#tradeAllFunc').addEventListener('click', function() {
	for (var i = 0; i < userdata.inv.length; i++) {
		var data = getItemData(userdata.inv[i].name);
		if (data.type == 'skin' && tradeArray.indexOf(i + '') < 0) {
			tradeArray.push(i + '');
			rendMoveInv(tradeAcceptFunction, m);
		}
	}
	var price = 0;
	for (var i = 0; i < tradeArray.length; i++) {
		var item = getItemData(userdata.inv[tradeArray[i]].name);

		price = price + item.price * ((userdata.inv[tradeArray[i]].stattrak) ? 3 : 1) * wtp[userdata.inv[tradeArray[i]].t];
	}
	$('#tradeDoFunc').disabled = false;
	if (m != undefined) {
		if (price > m) {
			$('#tradeDoFunc').disabled = true;
		}
	}
});

$('#removeAllFunc').addEventListener('click', function() {
	for (var i = 0; i < tradeArray.length; i++) {
		tradeArray[i] = 'remove';
	}
	for (var i = tradeArray.length; i > -1; i--) {
		if (tradeArray[i] == 'remove') {
			tradeArray.splice(i, 1);
		}
	}
	$('#tradeDoFunc').disabled = false;
	rendMoveInv(tradeAcceptFunction, m);
});

function acceptTrade() {
	if (tradeArray.length > 0) {
		window[tradeAcceptFunction](tradeArray);
	}
	tradeArray = []
	m = 1000000000000;
}
$('#tradeDoFunc').addEventListener('click', acceptTrade);

var pi = [];
var bi = [];
function startCoinFlipVBot(itemArray) {

	pi = itemArray;

	showPopup('coinflip');
	$('#startCoinFlipBTN').disabled = true;
	$('#coins').classList.toggle('select', true);
	$('#cf_output').innerHTML = '';

	var n = Math.floor(itemArray.length * Math.random() * 2) + 1;

	var botitems = [];
	var useritems = itemArray;

	var botInvV = 0;
	var userInvV = 0;

	for (var i = 0; i < useritems.length; i++) {
		var d = getItemData(userdata.inv[useritems[i]].name);
		userInvV = userInvV + d.price * (d.stattrak ? 3 : 1);
	}

	var itemsList = [];
	for (var i = 0; i < items.length; i++) {
	    if (items[i].type == 'skin' && items[i].price > 20 && items[i].price < userInvV) {
			itemsList.push(items[i]);
		}
	}

	var c = userInvV * (Math.random() + 1);
	while (botInvV < c) {
		var i = itemsList[Math.floor(Math.random() * itemsList.length)];
	    botitems.push(i);
	    botInvV = botInvV + i.price * (d.stattrak ? 3 : 1);
	}

	bi = botitems;


}

function flipCoin() {
	$('#closeCoinFlip').disabled = true;
	canUpdate = false;

	var win_lose_msg = ''

	var r = 1
    console.log(r)
	if (r == 1) {
		$('#coins').className = 'flipToCT';
		landed = 'ct';
	} else {
		$('#coins').className = 'flipToT';
		landed = 't';
	}
	if (landed == player) {
		var wonitems = [];
		for (var i = 0; i < bi.length; i++) {
			var r = false;
			if (bi[i].stattrak == true && Math.random() < 0.2) {
				r = true;
			}
			var wl = ['fn', 'mw', 'ft', 'ww', 'bs']
			var w = wl[Math.floor(Math.random() * wl.length)];
			userdata.inv.push({name:bi[i].name,stattrak:r,t:w});
			wonitems.push({name:bi[i].name,class:bi[i].class,price:bi[i].price,stattrak:r,t:w})
		}
		win_lose_msg = 'You won!';
		setTimeout(function() {
			showItems(wonitems);
			$('#closeCoinFlip').disabled = false;
			$('#startCoinFlipBTN').disabled = false;
		}, 9000);
	} else {
		for (var i = 0; i < pi.length; i++) {
			userdata.inv[pi[i]] = 'ToBeDeleted';
		}
		for (var i = userdata.inv.length; i > -1; i--) {
			if (userdata.inv[i] == 'ToBeDeleted') {
				userdata.inv.splice(i, 1);
			}
			setTimeout(function() {
				$('#closeCoinFlip').disabled = false;
				$('#startCoinFlipBTN').disabled = false;
			}, 7000);
		}
		win_lose_msg = 'You lost!';
	}
	setTimeout(function() {
		canUpdate = true;
		update();
		rendInv();
		$('#cf_output').innerHTML = win_lose_msg;
	}, 7000);
}
function showItems(items) {
	showPopup('wonitems');
	var ic = $('#wonitemscontainer');
	ic.innerHTML = '';
	for (var i = 0; i < items.length; i++) {
		var item = document.createElement('div');

		var stattrak = items[i].stattrak ? 'stattrak' : '';

		item.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + items[i].name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + items[i].name + '</div><div class="price">' +
		((stattrak == 'stattrak' ? items[i].price * 3 : items[i].price) * wtp[items[i].t]).toFixed(2)
		 + '€</div>';
		item.className = 'item ' + items[i].class + ' ' + stattrak + ' ' + items[i].t;

		ic.appendChild(item);
	}
}
$('#coin_ct').addEventListener('click', function() {
	player = 'ct'
	flipCoin()
})
$('#coin_t').addEventListener('click', function() {
	player = 't'
	flipCoin()
})
