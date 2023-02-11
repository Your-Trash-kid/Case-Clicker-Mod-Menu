function $(a) {
	var a = document.querySelector(a);
	return a;
}

var rank;

if (localStorage['uid'] == undefined) {
	localStorage['uid'] = Math.random();
	var userdata = {
		inv:[
			{name:'Spectrum Case',stattrak:false,t:'u'}
		],
		money:2.40,
		roulette:0,
		upgrades:{},
		moneyarray:[],
	}
	localStorage[localStorage['uid'] + '-storage'] = JSON.stringify(userdata);
	localStorage['lastOnline'] = JSON.stringify(new Date().getTime());
}
var userdata = JSON.parse(localStorage[localStorage['uid'] + '-storage']);

var sort = 'H>L';

// Update handler

if (userdata.upgrades == undefined) {
	userdata.upgrades = {};
}
if (userdata.moneyarray == undefined) {
	userdata.moneyarray = [];
}

if (localStorage['lastOnline'] == undefined) {
	localStorage['lastOnline'] = JSON.stringify(new Date().getTime());
}

if (localStorage['settingsF'] == undefined) {
	localStorage['settingsF'] = 'false';
}

if (userdata.roulette == undefined) {
	userdata.roulette = 0;
}

for (var i = 0; i < userdata.inv.length; i++) {
	if (userdata.inv[i].t == undefined) {
		userdata.inv[i].t = 'u';
	}
	if (userdata.inv[i].name == 'Gods and Monsters Collection') {
		userdata.inv[i].name = 'The Gods and Monsters Collection';
	} else if (userdata.inv[i].name == 'Cobblestone Collection') {
		userdata.inv[i].name = 'The Cobblestone Collection';
	}
}
var wtp = {fn:1.8,mw:1.6,ft:1.4,ww:1.2,bs:1,u:1};
var items = [
	// Cases
	{name:'Gamma Case', price:0.75, class:'standard', case:'gamma', type:'case', needkey:true, rankNeeded:1},
	{name:'Chroma Case', price:0.50, class:'standard', case:'chroma', type:'case', needkey:true, rankNeeded:1},
	{name:'Spectrum Case', price:1.00, class:'standard', case:'spectrum', type:'case', needkey:true, rankNeeded:1},
	{name:'CS:GO Weapon Case', price:6.00, class:'standard', case:'csgo_weapon', type:'case', needkey:true, rankNeeded:1},
	{name:'CS:GO Weapon Case 2', price:5.00, class:'standard', case:'csgo_weapon2', type:'case', needkey:true, rankNeeded:2},
	{name:'Stattrak Case', price:2.00, class:'standard', case:'stattrak', type:'case', needkey:false, rankNeeded:2},
	{name:'Shadow Case', price:3.50, class:'standard', case:'shadow', type:'case', needkey:true, rankNeeded:2},
	{name:'Falchion Case', price:1.75, class:'standard', case:'falchion', type:'case', needkey:true, rankNeeded:2},
	{name:'The Gods and Monsters Collection', price:35.00, class:'standard', case:'gods_and_monsters', type:'case', needkey:false, rankNeeded:2},
	{name:'CS:GO Weapon Case 3', price:2.30, class:'standard', case:'csgo_weapon3', type:'case', needkey:true, rankNeeded:3},
	{name:'Operation Vanguard Weapon Case', price:10.00, class:'standard', case:'vanguard', type:'case', needkey:true, rankNeeded:3},
	{name:'The Cobblestone Collection', price:40.00, class:'standard', case:'cobblestone', type:'case', needkey:false, rankNeeded:3},
	{name:'Stattrak Case 2', price:3.50, class:'standard', case:'stattrak2', type:'case', needkey:false, rankNeeded:4},
	{name:'Chroma Case 2', price:1.50, class:'standard', case:'chroma2', type:'case', needkey:true, rankNeeded:4},
	{name:'Operation Hydra Case', price:8.00, class:'standard', case:'hydra', type:'case', needkey:true, rankNeeded:4},
	{name:'Revolver Case', price:2.60, class:'standard', case:'revolver', type:'case', needkey:true, rankNeeded:4},
	{name:'Gamma Case 2', price:1.50, class:'standard', case:'gamma2', type:'case', needkey:true, rankNeeded:5},
	{name:'Stattrak Case 3', price:10.00, class:'standard', case:'stattrak3', type:'case', needkey:false, rankNeeded:5},
	{name:'Knife Case', price:1000.00, class:'standard', case:'knife', type:'case', needkey:false, rankNeeded:5},
	{name:'Chroma Case 3', price:1.50, class:'standard', case:'chroma3', type:'case', needkey:true, rankNeeded:5},
	{name:'The Chop Shop Collection', price:18.00, class:'standard', case:'chopshop', type:'case', needkey:false, rankNeeded:4},
	{name:'Stattrak Case 4', price:200.00, class:'standard', case:'stattrak4', type:'case', needkey:false, rankNeeded:6},
	{name:'The Rising Sun Collection', price:7.50, class:'standard', case:'risingsun', type:'case', needkey:true, rankNeeded:4},

	// Keys
	{name:'Spectrum Case Key', price:2.40, class:'standard', case:'spectrum', type:'key'},
	{name:'CS:GO Weapon Case Key', price:2.40, class:'standard', case:'csgo_weapon csgo_weapon2 csgo_weapon3', type:'key'},
	{name:'Shadow Case Key', price:2.40, class:'standard', case:'shadow', type:'key'},
	{name:'Falchion Case Key', price:2.40, class:'standard', case:'falchion', type:'key'},
	{name:'Operation Vanguard Case Key', price:2.40, class:'standard', case:'vanguard', type:'key'},
	{name:'Chroma Case Key', price:2.40, class:'standard', case:'chroma', type:'key'},
	{name:'Gamma Case Key', price:2.40, class:'standard', case:'gamma', type:'key'},
	{name:'Chroma Case 2 Key', price:2.40, class:'standard', case:'chroma2', type:'key'},
	{name:'Gamma Case 2 Key', price:2.40, class:'standard', case:'gamma2', type:'key'},
	{name:'Chroma Case 3 Key', price:2.40, class:'standard', case:'chroma3', type:'key'},
	{name:'Operation Hydra Case Key', price:2.40, class:'standard', case:'hydra', type:'key'},
	{name:'Revolver Case Key', price:2.40, class:'standard', case:'revolver', type:'key'},

	// Knifes
	// Bayonet
	{name:'Bayonet', price:230.07, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Gamma Doppler', price:467.11, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Lore', price:292.69, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Autotronic', price:312.32, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Freehand', price:240.71, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Black Laminate', price:232.73, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Bright Water', price:199.95, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Marble Fade', price:418.77, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Tiger Tooth', price:346.73, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Doppler', price:305.14, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Damascus Steel', price:205.02, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Ultraviolet', price:175.54, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Rust Coat', price:187.15, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Fade', price:325.48, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Slaughter', price:276.20, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Crimson Web', price:196.81, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Case Hardened', price:211.64, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Blue Steel', price:103.90, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Urban Masked', price:168.86, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Stained', price:181.83, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Forest DDPAT', price:167.70, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Boreal Forest', price:166.49, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Night', price:177.09, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Scorched', price:165.34, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Bayonet | Safari Mesh', price:164.11, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},

	// Falchion Knife
	{name:'Falchion', price:160.84, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Marble Fade', price:384.00, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Doppler', price:329.58, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Tiger Tooth', price:283.11, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Damascus Steel', price:177.16, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Ultraviolet', price:163.66, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Rust Coat', price:157.38, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Night', price:147.31, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Fade', price:216.78, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Slaughter', price:193.31, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Urban Masked', price:146.69, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Crimson Web', price:156.26, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Forest DDPAT', price:147.91, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Case Hardened', price:161.43, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Blue Steel', price:161.01, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Boreal Forest', price:147.42, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Safari Mesh', price:144.32, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Stained', price:150.79, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},
	{name:'Falchion | Scorched', price:146.08, class:'exceedingly_rare', case:'knife spectrum falchion', type:'skin', stattrak:true},

	// Shadow Daggers
	{name:'Shadow Daggers', price:177.54, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Marble Fade', price:314.13, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Tiger Tooth', price:295.27, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Doppler', price:310.12, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Damascus Steel', price:164.39, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Ultraviolet', price:175.05, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Rust Coat', price:159.66, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Fade', price:225.08, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Crimson Web', price:164.14, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Slaughter', price:194.26, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Blue Steel', price:155.02, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Case Hardened', price:163.33, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Night', price:149.56, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Stained', price:151.44, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Scorched', price:146.03, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Urban Masked', price:149.29, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Forest DDPAT', price:146.16, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Safari Mesh', price:145.42, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},
	{name:'Shadow Daggers | Boreal Forest', price:147.44, class:'exceedingly_rare', case:'knife shadow', type:'skin', stattrak:true},

	// Butterfly
	{name:'Butterfly', price:229.75, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Marble Fade', price:788.55, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Doppler', price:732.15, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Tiger Tooth', price:503.11, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Damascus Steel', price:214.78, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Ultraviolet', price:192.83, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Rust Coat', price:126.24, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Fade', price:359.52, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Crimson Web', price:205.35, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Slaughter', price:297.24, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Case Hardened', price:215.89, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Blue Steel', price:213.75, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Night', price:190.62, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Stained', price:191.78, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Urban Masked', price:173.34, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Forest DDPAT', price:173.29, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Scorched', price:174.85, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Boreal Forest', price:173.43, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},
	{name:'Butterfly | Safari Mesh', price:172.92, class:'exceedingly_rare', case:'knife spectrum', type:'skin', stattrak:true},

	// Karambit
	{name:'Karambit', price:307.77, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Autotronic', price:464.92, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Gamma Doppler', price:681.66, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Lore', price:420.65, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Black Laminate', price:354.54, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Freehand', price:331.23, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Bright Water', price:275.35, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Marble Fade', price:622.31, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Tiger Tooth', price:542.13, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Doppler', price:438.37, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Damascus Steel', price:308.87, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Ultraviolet', price:255.35, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Rust Coat', price:256.70, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Fade', price:630.03, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Case Hardened', price:319.69, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Crimson Web', price:303.88, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Night', price:150.57, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Slaughter', price:406.19, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Blue Steel', price:280.97, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Stained', price:261.72, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Boreal Forest', price:226.43, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Forest DDPAT', price:214.78, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Urban Masked', price:214.78, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Scorched', price:214.96, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},
	{name:'Karambit | Safari Mesh', price:209.81, class:'exceedingly_rare', case:'knife csgo_weapon csgo_weapon2 csgo_weapon3 vanguard', type:'skin', stattrak:true},

	//  Spectrum case
	{name:'AK-47 | Bloodsport', price:56.95, class:'covert', case:'spectrum stattrak4', type:'skin', stattrak:true},
	{name:'USP-S | Neo-Noir', price:14.59, class:'covert', case:'spectrum stattrak4', type:'skin', stattrak:true},
	{name:'M4A1-S | Decimator', price:12.62, class:'classified', case:'spectrum stattrak3', type:'skin', stattrak:true},
	{name:'AWP | Fever Dream', price:9.88, class:'classified', case:'spectrum stattrak3', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Xiangliu', price:4.58, class:'classified', case:'spectrum stattrak3', type:'skin', stattrak:true},
	{name:'UMP-45 | Scaffold', price:1.11, class:'restricted', case:'spectrum stattrak2', type:'skin', stattrak:true},
	{name:'M249 | Emerald Poison Dart', price:1.12, class:'restricted', case:'spectrum stattrak2', type:'skin', stattrak:true},
	{name:'XM1014 | Seasons', price:1.13, class:'restricted', case:'spectrum stattrak2', type:'skin', stattrak:true},
	{name:'Galil AR | Crimson Tsunami', price:1.12, class:'restricted', case:'spectrum stattrak2', type:'skin', stattrak:true},
	{name:'MAC-10 | Last Dive', price:1.08, class:'restricted', case:'spectrum stattrak2', type:'skin', stattrak:true},
	{name:'Desert Eagle | Oxide Blaze', price:0.50, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'Five-SeveN | Capillary', price:0.15, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'P250 | Ripple', price:0.12, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'SCAR-20 | Blueprint', price:0.11, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'Sawed-Off | Zander', price:0.10, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'MP7 | Akoben', price:0.11, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},
	{name:'PP-Bizon | Jungle Slipstream', price:0.12, class:'milspec', case:'spectrum stattrak', type:'skin', stattrak:true},

	//  Cobblestone Collection
	{name:'AWP | Dragon Lore', price:729.53, class:'covert', case:'cobblestone', type:'skin', stattrak:false},
	{name:'M4A1-S | Knight', price:315.24, class:'classified', case:'cobblestone', type:'skin', stattrak:false},
	{name:'Desert Eagle | Hand Cannon', price:34.33, class:'restricted', case:'cobblestone', type:'skin', stattrak:false},
	{name:'CZ75-Auto | Chalice', price:34.41, class:'restricted', case:'cobblestone', type:'skin', stattrak:false},
	{name:'P2000 | Chainmail', price:4.93, class:'milspec', case:'cobblestone', type:'skin', stattrak:false},
	{name:'MP9 | Dark Age', price:4.67, class:'milspec', case:'cobblestone', type:'skin', stattrak:false},
	{name:'USP-S | Royal Blue', price:0.60, class:'industrial', case:'cobblestone', type:'skin', stattrak:false},
	{name:'MAG-7 | Silver', price:0.55, class:'industrial', case:'cobblestone', type:'skin', stattrak:false},
	{name:'Nova | Green Apple', price:0.50, class:'industrial', case:'cobblestone', type:'skin', stattrak:false},
	{name:'Sawed-Off | Rust Coat', price:0.53, class:'industrial', case:'cobblestone', type:'skin', stattrak:false},
	{name:'UMP-45 | Indigo', price:0.09, class:'consumer', case:'cobblestone', type:'skin', stattrak:false},
	{name:'MAC-10 | Indigo', price:0.09, class:'consumer', case:'cobblestone', type:'skin', stattrak:false},
	{name:'P90 | Storm', price:0.09, class:'consumer', case:'cobblestone', type:'skin', stattrak:false},
	{name:'SCAR-20 | Storm', price:0.09, class:'consumer', case:'cobblestone', type:'skin', stattrak:false},
	{name:'Dual Berettas | Briar', price:0.11, class:'consumer', case:'cobblestone', type:'skin', stattrak:false},

	//  CS:GO Weapon Case
	{name:'AWP | Lightning Strike', price:56.90, class:'covert', case:'csgo_weapon stattrak4', type:'skin', stattrak:true},
	{name:'AK-47 | Case Hardened', price:24.41, class:'classified', case:'csgo_weapon stattrak3', type:'skin', stattrak:true},
	{name:'Desert Eagle | Hypnotic', price:8.24, class:'classified', case:'csgo_weapon stattrak3', type:'skin', stattrak:true},
	{name:'Glock-18 | Dragon Tattoo', price:7.19, class:'restricted', case:'csgo_weapon stattrak2', type:'skin', stattrak:true},
	{name:'M4A1-S | Dark Water', price:5.39, class:'restricted', case:'csgo_weapon stattrak2', type:'skin', stattrak:true},
	{name:'USP-S | Dark Water', price:5.73, class:'restricted', case:'csgo_weapon stattrak2', type:'skin', stattrak:true},
	{name:'SG 553 | Ultraviolet', price:0.81, class:'milspec', case:'csgo_weapon stattrak', type:'skin', stattrak:true},
	{name:'AUG | Wings', price:0.96, class:'milspec', case:'csgo_weapon stattrak', type:'skin', stattrak:true},
	{name:'MP7 | Skulls', price:0.86, class:'milspec', case:'csgo_weapon stattrak', type:'skin', stattrak:true},

	//  CS:GO Weapon Case 2
	{name:'SSG 08 | Blood in the Water', price:16.91, class:'covert', case:'csgo_weapon2 stattrak4', type:'skin', stattrak:true},
	{name:'P90 | Cold Blooded', price:5.11, class:'classified', case:'csgo_weapon2 stattrak3', type:'skin', stattrak:true},
	{name:'USP-S | Serum', price:5.73, class:'classified', case:'csgo_weapon2 stattrak3', type:'skin', stattrak:true},
	{name:'Five-SeveN | Case Hardened', price:2.90, class:'restricted', case:'csgo_weapon2 stattrak2', type:'skin', stattrak:true},
	{name:'MP9 | Hypnotic', price:1.10, class:'restricted', case:'csgo_weapon2 stattrak2', type:'skin', stattrak:true},
	{name:'Nova | Graphite', price:0.75, class:'restricted', case:'csgo_weapon2 stattrak2', type:'skin', stattrak:true},
	{name:'Dual Berettas | Hemoglobin', price:0.84, class:'restricted', case:'csgo_weapon2 stattrak2', type:'skin', stattrak:true},
	{name:'M4A1-S | Blood Tiger', price:1.81, class:'milspec', case:'csgo_weapon2 stattrak', type:'skin', stattrak:true},
	{name:'SCAR-20 | Crimson Web', price:0.66, class:'milspec', case:'csgo_weapon2 stattrak', type:'skin', stattrak:true},
	{name:'FAMAS | Hexane', price:0.71, class:'milspec', case:'csgo_weapon2 stattrak', type:'skin', stattrak:true},
	{name:'Tec-9 | Blue Titanium', price:0.94, class:'milspec', case:'csgo_weapon2 stattrak', type:'skin', stattrak:true},
	{name:'P250 | Hive', price:0.70, class:'milspec', case:'csgo_weapon2 stattrak', type:'skin', stattrak:true},

	//  CS:GO Weapon Case 3
	{name:'CZ75-Auto | Victoria', price:2.46, class:'covert', case:'csgo_weapon3 stattrak4', type:'skin', stattrak:true},
	{name:'CZ75-Auto | The Fuschia Is Now', price:1.89, class:'classified', case:'csgo_weapon3 stattrak3', type:'skin', stattrak:true},
	{name:'P250 | Undertow', price:3.05, class:'classified', case:'csgo_weapon3 stattrak3', type:'skin', stattrak:true},
	{name:'Desert Eagle | Heirloom', price:0.68, class:'restricted', case:'csgo_weapon3 stattrak2', type:'skin', stattrak:true},
	{name:'Five-SeveN | Copper Galaxy', price:0.95, class:'restricted', case:'csgo_weapon3 stattrak2', type:'skin', stattrak:true},
	{name:'Tec-9 | Titanium Bit', price:0.64, class:'restricted', case:'csgo_weapon3 stattrak2', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Tread Plate', price:0.45, class:'restricted', case:'csgo_weapon3 stattrak2', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Crimson Web', price:0.14, class:'milspec', case:'csgo_weapon3 stattrak', type:'skin', stattrak:true},
	{name:'USP-S | Stainless', price:1.39, class:'milspec', case:'csgo_weapon3 stattrak', type:'skin', stattrak:true},
	{name:'Glock-18 | Blue Fissure', price:0.47, class:'milspec', case:'csgo_weapon3 stattrak', type:'skin', stattrak:true},
	{name:'Dual Berettas | Panther', price:0.14, class:'milspec', case:'csgo_weapon3 stattrak', type:'skin', stattrak:true},
	{name:'P2000 | Red FragCam', price:0.12, class:'milspec', case:'csgo_weapon3 stattrak', type:'skin', stattrak:true},

	//  Shadow Case
	{name:'USP-S | Kill Confirmed', price:22.94, class:'covert', case:'shadow stattrak4', type:'skin', stattrak:true},
	{name:'M4A1-S | Golden Coil', price:9.83, class:'covert', case:'shadow stattrak4', type:'skin', stattrak:true},
	{name:'AK-47 | Frontside Misty', price:7.28, class:'classified', case:'shadow stattrak3', type:'skin', stattrak:true},
	{name:'SGG 08 | Big Iron', price:1.83, class:'classified', case:'shadow stattrak3', type:'skin', stattrak:true},
	{name:'G3SG1 | Flux', price:2.00, class:'classified', case:'shadow stattrak3', type:'skin', stattrak:true},
	{name:'P250 | Wingshot', price:0.46, class:'restricted', case:'shadow stattrak2', type:'skin', stattrak:true},
	{name:'Galil AR | Stone Cold', price:0.44, class:'restricted', case:'shadow stattrak2', type:'skin', stattrak:true},
	{name:'M249 | Nebula Crusader', price:0.45, class:'restricted', case:'shadow stattrak2', type:'skin', stattrak:true},
	{name:'MP7 | Special Delivery', price:0.47, class:'restricted', case:'shadow stattrak2', type:'skin', stattrak:true},
	{name:'Dual Berettas | Dualing Dragons', price:0.10, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'Glock-18 | Wraiths', price:0.11, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'FAMAS | Survivor Z', price:0.11, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'XM1014 | Scumbria', price:0.09, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'MAG-7 | Cobalt Core', price:0.09, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'MAC-10 | Rangeen', price:0.09, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},
	{name:'SCAR-20 | Green Marine', price:0.09, class:'milspec', case:'shadow stattrak', type:'skin', stattrak:true},

	// Falchion case
	{name:'AWP | Hyper Beast', price:12.72, class:'covert', case:'falchion stattrak4', type:'skin', stattrak:true},
	{name:'AK-47 | Aquamarine Revenge', price:10.98, class:'covert', case:'falchion stattrak4', type:'skin', stattrak:true},
	{name:'SG 553 | Cyrex', price:1.72, class:'classified', case:'falchion stattrak3', type:'skin', stattrak:true},
	{name:'MP7 | Nemesis', price:2.39, class:'classified', case:'falchion stattrak3', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Yellow Jacket', price:1.72, class:'classified', case:'falchion stattrak3', type:'skin', stattrak:true},
	{name:'M4A4 | Evil Daimyo', price:1.32, class:'restricted', case:'falchion stattrak2', type:'skin', stattrak:true},
	{name:'Negev | Loudmouth', price:0.22, class:'restricted', case:'falchion stattrak2', type:'skin', stattrak:true},
	{name:'P2000 | Handgun', price:0.24, class:'restricted', case:'falchion stattrak2', type:'skin', stattrak:true},
	{name:'MP9 | Ruby Poison Dart', price:0.22, class:'restricted', case:'falchion stattrak2', type:'skin', stattrak:true},
	{name:'FAMAS | Neural Net', price:0.23, class:'restricted', case:'falchion stattrak2', type:'skin', stattrak:true},
	{name:'USP-S | Torque', price:0.55, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},
	{name:'Glock-18 | Bunsen Burner', price:0.17, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},
	{name:'P90 | Elite Build', price:0.10, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},
	{name:'Galil AR | Rocket Pop', price:0.10, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},
	{name:'UMP-45 | Riot', price:0.09, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},
	{name:'Nova | Ranger', price:0.09, class:'milspec', case:'falchion stattrak', type:'skin', stattrak:true},

	//  Vanguard case
	{name:'AK-47 | Wasteland Rebel', price:16.54, class:'covert', case:'vanguard stattrak4', type:'skin', stattrak:true},
	{name:'P2000 | Fire Elemental', price:4.49, class:'covert', case:'vanguard stattrak4', type:'skin', stattrak:true},
	{name:'P250 | Cartel', price:1.94, class:'classified', case:'vanguard stattrak3', type:'skin', stattrak:true},
	{name:'SCAR-20 | Cardiac', price:1.53, class:'classified', case:'vanguard stattrak3', type:'skin', stattrak:true},
	{name:'XM1014 | Tranquility', price:1.76, class:'classified', case:'vanguard stattrak3', type:'skin', stattrak:true},
	{name:'M4A4 | Griffin', price:1.72, class:'restricted', case:'vanguard stattrak2', type:'skin', stattrak:true},
	{name:'M4A1-S | Basilisk', price:1.23, class:'restricted', case:'vanguard stattrak2', type:'skin', stattrak:true},
	{name:'Glock-18 | Grinder', price:0.56, class:'restricted', case:'vanguard stattrak2', type:'skin', stattrak:true},
	{name:'Sawed-Off | Highwayman', price:0.23, class:'restricted', case:'vanguard stattrak2', type:'skin', stattrak:true},
	{name:'UMP-45 | Delusion', price:0.17, class:'restricted', case:'vanguard stattrak2', type:'skin', stattrak:true},
	{name:'Five-SeveN | Urban Hazard', price:0.26, class:'milspec', case:'vanguard stattrak', type:'skin', stattrak:true},
	{name:'MAG-7 | Firestarter', price:0.14, class:'milspec', case:'vanguard stattrak', type:'skin', stattrak:true},
	{name:'P250 | Ripple', price:0.17, class:'milspec', case:'vanguard stattrak', type:'skin', stattrak:true},
	{name:'MP9 | Dart', price:0.11, class:'milspec', case:'vanguard stattrak', type:'skin', stattrak:true},
	{name:'G3SG1 | Murky', price:0.16, class:'milspec', case:'vanguard stattrak', type:'skin', stattrak:true},

	// The Gods and Monsters Collection
	{name:'AWP | Medusa', price:602.95, class:'covert', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'M4A4 | Poseidon', price:148.55, class:'classified', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'M4A1-S | Icarus Fell', price:61.85, class:'restricted', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'G3SG1 | Chronos', price:29.41, class:'restricted', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'UMP-45 | Minotaur\'s Labyrinth', price:7.38, class:'milspec', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'MP9 | Pandora\'s Box', price:8.12, class:'milspec', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'AWP | Sun in Leo', price:2.32, class:'industrial', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'Tec-9 | Hades', price:0.79, class:'industrial', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'P2000 | Pathfinder', price:0.81, class:'industrial', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'M249 | Shipping Forecast', price:0.79, class:'industrial', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'AUG | Daedalus', price:0.21, class:'consumer', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'Dual Berettas | Moon in Libra', price:0.21, class:'consumer', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'Nova | Moon in Libra', price:0.21, class:'consumer', case:'gods_and_monsters', type:'skin', stattrak:false},
	{name:'MP7 | Asterion', price:0.21, class:'consumer', case:'gods_and_monsters', type:'skin', stattrak:false},

	// Chroma Case
	{name:'Galil AR | Chatterbox', price:1.25, class:'covert', case:'chroma stattrak4', type:'skin', stattrak:true},
	{name:'AWP | Man-o\'-war', price:7.01, class:'covert', case:'chroma stattrak4', type:'skin', stattrak:true},
	{name:'M4A4 | Dragon King', price:3.44, class:'classified', case:'chroma stattrak3', type:'skin', stattrak:true},
	{name:'AK-47 | Cartel', price:2.27, class:'classified', case:'chroma stattrak3', type:'skin', stattrak:true},
	{name:'P250 | Muertos', price:1.19, class:'classified', case:'chroma stattrak3', type:'skin', stattrak:true},
	{name:'Desert Eagle | Naga', price:0.25, class:'restricted', case:'chroma stattrak2', type:'skin', stattrak:true},
	{name:'MAC-10 | Malachite', price:0.30, class:'restricted', case:'chroma stattrak2', type:'skin', stattrak:true},
	{name:'Sawed-Off | Serenity', price:0.32, class:'restricted', case:'chroma stattrak2', type:'skin', stattrak:true},
	{name:'Dual Berettas | Urban Shock', price:0.31, class:'restricted', case:'chroma stattrak2', type:'skin', stattrak:true},
	{name:'Glock-18 | Catacombs', price:0.13, class:'milspec', case:'chroma stattrak', type:'skin', stattrak:true},
	{name:'MP9 | Deadly Poison', price:0.08, class:'milspec', case:'chroma stattrak', type:'skin', stattrak:true},
	{name:'M249 | System Lock', price:0.08, class:'milspec', case:'chroma stattrak', type:'skin', stattrak:true},
	{name:'SCAR-20 | Grotto', price:0.08, class:'milspec', case:'chroma stattrak', type:'skin', stattrak:true},
	{name:'XM1014 | Quicksilver', price:0.08, class:'milspec', case:'chroma stattrak', type:'skin', stattrak:true},

	// Chroma Case 2
	{name:'M4A1-S | Hyper Beast', price:6.90, class:'covert', case:'chroma2 stattrak4', type:'skin', stattrak:true},
	{name:'MAC-10 | Neon Rider', price:1.77, class:'covert', case:'chroma2 stattrak4', type:'skin', stattrak:true},
	{name:'Five-SeveN | Monkey Business', price:0.89, class:'classified', case:'chroma2 stattrak3', type:'skin', stattrak:true},
	{name:'Galil AR | Eco', price:1.04, class:'classified', case:'chroma2 stattrak3', type:'skin', stattrak:true},
	{name:'FAMAS | Djinn', price:1.08, class:'classified', case:'chroma2 stattrak3', type:'skin', stattrak:true},
	{name:'AWP | Worm God', price:0.92, class:'restricted', case:'chroma2 stattrak2', type:'skin', stattrak:true},
	{name:'MAG-7 | Heat', price:0.23, class:'restricted', case:'chroma2 stattrak2', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Pole Position', price:0.23, class:'restricted', case:'chroma2 stattrak2', type:'skin', stattrak:true},
	{name:'UMP-45 | Grand Prix', price:0.24, class:'restricted', case:'chroma2 stattrak2', type:'skin', stattrak:true},
	{name:'AK-47 | Elite Build', price:0.62, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},
	{name:'Desert Eagle | Bronze Deco', price:0.09, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},
	{name:'P250 | Valence', price:0.08, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},
	{name:'Sawed-Off | Origami', price:0.08, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},
	{name:'MP7 | Armor Core', price:0.08, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},
	{name:'Negev | Man-o\'-war', price:0.08, class:'milspec', case:'chroma2 stattrak', type:'skin', stattrak:true},

	// Chroma Case 3
	{name:'M4A1-S | Chantico\'s Fire', price:10.29, class:'covert', case:'chroma3 stattrak4', type:'skin', stattrak:true},
	{name:'PP-Bizon | Judgement of Anubis', price:2.73, class:'covert', case:'chroma3 stattrak4', type:'skin', stattrak:true},
	{name:'UMP-45 | Primal Saber', price:3.00, class:'classified', case:'chroma3 stattrak3', type:'skin', stattrak:true},
	{name:'P250 | Asiimov', price:1.71, class:'classified', case:'chroma3 stattrak3', type:'skin', stattrak:true},
	{name:'AUG | Fleet Flock', price:1.02, class:'classified', case:'chroma3 stattrak3', type:'skin', stattrak:true},
	{name:'SSG 08 | Ghost Crusader', price:0.28, class:'restricted', case:'chroma3 stattrak2', type:'skin', stattrak:true},
	{name:'Tec-9 | Re-Entry', price:0.33, class:'restricted', case:'chroma3 stattrak2', type:'skin', stattrak:true},
	{name:'XM1014 | Black Tie', price:0.26, class:'restricted', case:'chroma3 stattrak2', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Red Astor', price:0.28, class:'restricted', case:'chroma3 stattrak2', type:'skin', stattrak:true},
	{name:'Galil AR | Firefight', price:0.27, class:'restricted', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'SG 553 | Atlas', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'P2000 | Oceanic', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'MP9 | Bioleak', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'Dual Berettas | Ventilators', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'M249 | Spectre', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'G3SG1 | Orange Crash', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},
	{name:'Sawed-Off | Fubar', price:0.08, class:'milspec', case:'chroma3 stattrak', type:'skin', stattrak:true},

	// Gamma Case
	{name:'M4A1-S | Mecha Industries', price:9.36, class:'covert', case:'gamma stattrak4', type:'skin', stattrak:true},
	{name:'Glock-18 | Wasteland Rebel', price:5.24, class:'covert', case:'gamma stattrak4', type:'skin', stattrak:true},
	{name:'M4A4 | Desolate Space', price:6.09, class:'classified', case:'gamma stattrak3', type:'skin', stattrak:true},
	{name:'P2000 | Imperial Dragon', price:0.99, class:'classified', case:'gamma stattrak3', type:'skin', stattrak:true},
	{name:'SCAR-20 | Bloodsport', price:1.12, class:'classified', case:'gamma stattrak3', type:'skin', stattrak:true},
	{name:'AWP | Phobos', price:1.79, class:'restricted', case:'gamma stattrak2', type:'skin', stattrak:true},
	{name:'R8 Revolver | Reboot', price:0.32, class:'restricted', case:'gamma stattrak2', type:'skin', stattrak:true},
	{name:'P90 | Chopper', price:0.36, class:'restricted', case:'gamma stattrak2', type:'skin', stattrak:true},
	{name:'AUG | Aristocrat', price:0.35, class:'restricted', case:'gamma stattrak2', type:'skin', stattrak:true},
	{name:'Sawed-Off | Limelight', price:0.32, class:'restricted', case:'gamma stattrak2', type:'skin', stattrak:true},
	{name:'Five-SeveN | Violent Daimyo', price:0.09, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'Tec-9 | Ice Cap', price:0.08, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'SG 553 | Aerial', price:0.08, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'P250 | Iron Clad', price:0.08, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'Nova | Exo', price:0.08, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'MAC-10 | Carnivore', price:0.05, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},
	{name:'PP-Bizon | Harvester', price:0.08, class:'milspec', case:'gamma stattrak', type:'skin', stattrak:true},

	// Gamma Case 2
	{name:'AK-47 | Neon Revolution', price:18.97, class:'covert', case:'gamma2 stattrak4', type:'skin', stattrak:true},
	{name:'FAMAS | Roll Cage', price:2.52, class:'covert', case:'gamma2 stattrak4', type:'skin', stattrak:true},
	{name:'Tec-9 | Fuel Injector', price:2.01, class:'classified', case:'gamma2 stattrak3', type:'skin', stattrak:true},
	{name:'AUG | Syd Mead', price:1.16, class:'classified', case:'gamma2 stattrak3', type:'skin', stattrak:true},
	{name:'MP9 | Airlock', price:1.12, class:'classified', case:'gamma2 stattrak3', type:'skin', stattrak:true},
	{name:'Desert Eagle | Directive', price:0.24, class:'restricted', case:'gamma2 stattrak2', type:'skin', stattrak:true},
	{name:'Glock-18 | Weasel', price:0.52, class:'restricted', case:'gamma2 stattrak2', type:'skin', stattrak:true},
	{name:'SG 553 | Triarch', price:0.22, class:'restricted', case:'gamma2 stattrak2', type:'skin', stattrak:true},
	{name:'MAG-7 | Petroglyph', price:0.24, class:'restricted', case:'gamma2 stattrak2', type:'skin', stattrak:true},
	{name:'SCAR-20 | Powercore', price:0.22, class:'restricted', case:'gamma2 stattrak2', type:'skin', stattrak:true},
	{name:'UMP-45 | Briefing', price:0.09, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'P90 | Grim', price:0.08, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'Five-SeveN | Scumbria', price:0.08, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'XM1014 | Slipstream', price:0.08, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'CZ75-Auto | Imprint', price:0.08, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'G3SG1 | Ventilator', price:0.05, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},
	{name:'Negev | Dazzle', price:0.08, class:'milspec', case:'gamma2 stattrak', type:'skin', stattrak:true},

	// Operation Hydra Case
	{name:'Five-SeveN | Hyper Beast', price:15.18, class:'covert', case:'hydra stattrak4', type:'skin', stattrak:true},
	{name:'AWP | Oni Taiji', price:45.52, class:'covert', case:'hydra stattrak4', type:'skin', stattrak:true},
	{name:'M4A4 | Hellfire', price:8.53, class:'classified', case:'hydra stattrak3', type:'skin', stattrak:true},
	{name:'Dual Berettas | Cobra Strike', price:3.64, class:'classified', case:'hydra stattrak3', type:'skin', stattrak:true},
	{name:'Galil AR | Sugar Rush', price:3.92, class:'classified', case:'hydra stattrak3', type:'skin', stattrak:true},
	{name:'AK-47 | Orbit Mk01', price:7.95, class:'restricted', case:'hydra stattrak2', type:'skin', stattrak:true},
	{name:'P90 | Death Grip', price:0.93, class:'restricted', case:'hydra stattrak2', type:'skin', stattrak:true},
	{name:'P250 | Red Rock', price:0.88, class:'restricted', case:'hydra stattrak2', type:'skin', stattrak:true},
	{name:'SSG 08 | Death\'s Head', price:1.02, class:'restricted', case:'hydra stattrak2', type:'skin', stattrak:true},
	{name:'P2000 | Woodsman', price:0.92, class:'restricted', case:'hydra stattrak2', type:'skin', stattrak:true},
	{name:'USP-S | Blueprint', price:1.29, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'M4A1-S | Briefing', price:0.93, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'Tec-9 | Cut Out', price:0.30, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'UMP-45 | Metal Flowers', price:0.21, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'MAG-7 | Hard Water', price:0.30, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'FAMAS | Macabre', price:0.30, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},
	{name:'MAC-10 | Aloha', price:0.28, class:'milspec', case:'hydra stattrak', type:'skin', stattrak:true},

	// Revolver Case
	{name:'M4A4 | Royal Paladin', price:5.10, class:'covert', case:'revolver stattrak4', type:'skin', stattrak:true},
	{name:'R8 Revolver | Fade', price:3.06, class:'covert', case:'revolver stattrak4', type:'skin', stattrak:true},
	{name:'G3SG1 | The Executioner', price:1.09, class:'classified', case:'revolver stattrak3', type:'skin', stattrak:true},
	{name:'AK-47 | Point Disarray', price:8.78, class:'classified', case:'revolver stattrak3', type:'skin', stattrak:true},
	{name:'P90 | Shapewood', price:1.06, class:'classified', case:'revolver stattrak3', type:'skin', stattrak:true},
	{name:'Tec-9 | Avalanche', price:0.50, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'SG 553 | Tiger Moth', price:0.54, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'Five-SeveN | Retrobution', price:0.47, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'Negev | Power Loader', price:0.47, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'PP-Bizon | Fuel Rod', price:0.44, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'XM1014 | Teclu Burner', price:0.50, class:'restricted', case:'revolver stattrak2', type:'skin', stattrak:true},
	{name:'R8 Revolver | Crimson Web', price:0.13, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},
	{name:'Desert Eagle | Corinthian', price:0.27, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},
	{name:'AUG | Ricochet', price:0.15, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},
	{name:'P2000 | Imperial', price:0.16, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},
	{name:'Sawed-Off | Yorick', price:0.09, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},
	{name:'SCAR-20 | Outbreak', price:0.09, class:'milspec', case:'revolver stattrak', type:'skin', stattrak:true},

	// The Chop Shop Collection
	{name:'M4A1-S | Hot Rod', price:76.53, class:'classified', case:'chopshop', type:'skin', stattrak:false},
	{name:'Glock-18 | Twilight Galaxy', price:8.41, class:'classified', case:'chopshop', type:'skin', stattrak:false},
	{name:'SG 553 | Bulldozer', price:3.56, class:'restricted', case:'chopshop', type:'skin', stattrak:false},
	{name:'Dual Berettas | Duelist', price:4.12, class:'restricted', case:'chopshop', type:'skin', stattrak:false},
	{name:'P250 | Whiteout', price:0.43, class:'milspec', case:'chopshop', type:'skin', stattrak:false},
	{name:'MAC-10 | Fade', price:1.69, class:'milspec', case:'chopshop', type:'skin', stattrak:false},
	{name:'CZ75-Auto | Emerald', price:1.02, class:'milspec', case:'chopshop', type:'skin', stattrak:false},
	{name:'Five-SeveN | Nitro', price:0.40, class:'milspec', case:'chopshop', type:'skin', stattrak:false},
	{name:'MP7 | Full Stop', price:0.40, class:'milspec', case:'chopshop', type:'skin', stattrak:false},
	{name:'Desert Eagle | Night', price:0.44, class:'industrial', case:'chopshop', type:'skin', stattrak:false},
	{name:'USP-S | Para Green', price:0.16, class:'industrial', case:'chopshop', type:'skin', stattrak:false},
	{name:'Galil AR | Urban Rubble', price:0.15, class:'industrial', case:'chopshop', type:'skin', stattrak:false},
	{name:'M249 | Impact Drill', price:0.03, class:'consumer', case:'chopshop', type:'skin', stattrak:false},
	{name:'MAG-7 | Seabird', price:0.03, class:'consumer', case:'chopshop', type:'skin', stattrak:false},
	{name:'SCAR-20 | Army Sheen', price:0.03, class:'consumer', case:'chopshop', type:'skin', stattrak:false},
	{name:'CZ75-Auto | Army Sheen', price:0.04, class:'consumer', case:'chopshop', type:'skin', stattrak:false},

	// The Rising Sun Collection
	{name:'AUG | Akihabara Accept', price:29.69, class:'covert', case:'risingsun', type:'skin', stattrak:false},
	{name:'AK-47 | Hydroponic', price:24.29, class:'classified', case:'risingsun', type:'skin', stattrak:false},
	{name:'Desert Eagle | Sunset Storm 弐', price:4.90, class:'restricted', case:'risingsun', type:'skin', stattrak:false},
	{name:'Desert Eagle | Sunset Storm 壱', price:4.99, class:'restricted', case:'risingsun', type:'skin', stattrak:false},
	{name:'M4A4 | Daybreak', price:4.34, class:'restricted', case:'risingsun', type:'skin', stattrak:false},
	{name:'Five-SeveN | Neon Kimono', price:3.91, class:'restricted', case:'risingsun', type:'skin', stattrak:false},
	{name:'Tec-9 | Terrace', price:1.17, class:'milspec', case:'risingsun', type:'skin', stattrak:false},
	{name:'Galil AR | Aqua Terrace', price:1.17, class:'milspec', case:'risingsun', type:'skin', stattrak:false},
	{name:'MAG-7 | Counter Terrace', price:1.30, class:'milspec', case:'risingsun', type:'skin', stattrak:false},
	{name:'Desert Eagle | Midnight Storm', price:0.20, class:'industrial', case:'risingsun', type:'skin', stattrak:false},
	{name:'P250 | Crimson Kimono', price:0.14, class:'industrial', case:'risingsun', type:'skin', stattrak:false},
	{name:'Sawed-Off | Bamboo Shadow', price:0.04, class:'consumer', case:'risingsun', type:'skin', stattrak:false},
	{name:'Tec-9 | Bamboo Forest', price:0.04, class:'consumer', case:'risingsun', type:'skin', stattrak:false},
	{name:'P250 | Mint Kimono', price:0.04, class:'consumer', case:'risingsun', type:'skin', stattrak:false},
	{name:'G3SG1 | Orange Kimono', price:0.04, class:'consumer', case:'risingsun', type:'skin', stattrak:false},
	{name:'PP-Bizon | Bamboo Print', price:0.04, class:'consumer', case:'risingsun', type:'skin', stattrak:false},
]
var upgrades = [
	{name:'Bank',price:42.32,dec:'Earn 50€ more when offline',priceboost:4.9},
	{name:'Offline Production',price:32.09,dec:'Earn offline money faster',priceboost:3.2},
	{name:'+CASH',price:84.91,dec:'Get more cash per click',priceboost:1.9},
	{name:'Luck',price:160.36,dec:'Higher chance of opening good skins',priceboost:21.3},
	{name:'Online Production',price:120.21,dec:'+0.10€ every secound',priceboost:3.2}
]
var classesType1 = {
	exceedingly_rare:'linear-gradient(to right, rgb(151,151,0) 0%,rgb(216,216,0) 70%)',
	covert:'linear-gradient(to right, rgb(138,44,44) 0%,rgb(199,63,63) 70%)',
	classified:'linear-gradient(to right, rgb(124,25,135) 0%,rgb(211, 44, 230) 70%)',
	restricted:'linear-gradient(to right, rgb(80,41,150) 0%,rgb(115,60,216) 70%)',
	milspec:'linear-gradient(to right, rgb(44,61,150) 0%,rgb(63,89,216) 70%)',
	standard:'linear-gradient(to right, rgb(136,136,136) 0%,rgb(194,194,194) 70%)',
	industrial:'linear-gradient(to right, rgb(53,89,124) 0%,rgb(76,127,178) 70%)',
	consumer:'linear-gradient(to right, rgb(103,117,129) 0%,rgb(148,169,186) 70%)',
}
var classesType2 = {
	exceedingly_rare:'rgb(255, 215, 0)',
	covert:'rgb(235, 75, 75)',
	classified:'rgb(211, 44, 230)',
	restricted:'rgb(136, 71, 255)',
	milspec:'rgb(75, 105, 255)',
	standard:'rgb(230, 230, 230)',
	industrial:'rgb(90,150,210)',
	consumer:'rgb(175,200,220)',
}
var classes = classesType1;
if (localStorage['settingsF'] != 'true') {
	classes = classesType2;
	$('#toggle_fg').innerHTML = 'Fancy graphics Off';
	document.body.classList.toggle('simpleGraphics', true)
}

for (var i = 0; i < upgrades.length; i++) {
	if (userdata.upgrades[upgrades[i].name] == undefined) {
		userdata.upgrades[upgrades[i].name] = {amount:0};
	}
	if (userdata.upgrades[upgrades[i].name].amount > 10) {
		userdata.upgrades[upgrades[i].name].amount = 10;
	}
}

function openCase(c, noc) {
	$('#openHere').innerHTML = '';

	canUpdate = false;

	if (noc == undefined) {
		noc = 1;
	}

	if (noc > 1) {
		$('#openHere').className = 'mt1_cases';
	} else {
		$('#openHere').className = '';
	}

	for (var j = 0; j < noc; j++) {
		openCaseSubFunc(c);
	}
	save()
}
function openCaseSubFunc(c) {
	var checkKey = false;
	var keyLocal = false;

	if (c == 'cobblestone' || c == 'knife' || c == 'gods_and_monsters' || c == 'stattrak' || c == 'stattrak2' || c == 'stattrak3' || c == 'stattrak4' || c == 'chopshop' || c == 'risingsun') {
		checkKey = 2;
	}

	for (var g = 0; g < userdata.inv.length; g++) {
		var item = getItemData(userdata.inv[g].name);
		if (item.case.split(' ').indexOf(c) > -1 && item.type == 'key') {
			checkKey = true;
			keyLocal = g;
		}
	}
	if (checkKey == true || checkKey == 2) {
		if (checkKey == true) {
			userdata.inv.splice(keyLocal, 1);
		}

		for (var g = 0; g < userdata.inv.length; g++) {
			var item = getItemData(userdata.inv[g].name);
			if (item.case == c && item.type == 'case') {
				caseLocal = g;
			}
		}

		userdata.inv.splice(caseLocal, 1);

		showPopup('caseOpener');

		$('#closeOpener').classList.toggle('show', false);
		$('#sidemenu').style.pointerEvents = 'none';
		$('#sidemenu').style.opacity = 0.3;

		var opener = document.createElement('div');
		opener.className = 'opener';
		$('#openHere').appendChild(opener);
		var scroll_s = document.createElement('div');
		scroll_s.className = 'scroll-s';
		opener.appendChild(scroll_s);
		var selector = document.createElement('div');
		selector.className = 'selector';
		opener.appendChild(selector);

		scroll_s.style.transition = '0s';
		scroll_s.style.left = '0px';

		var il = [];
		var exceedingly_rare = [];
		for (var i = 0; i < items.length; i++) {
			if (items[i].case.split(' ').indexOf(c) > -1 && items[i].type == 'skin') {
				il.push(items[i]);
			}
		}
		var covert = [];
		var classified = [];
		var restricted = [];
		var milspec = [];
		for (var i = 0; i < il.length; i++) {
			if (il[i].class == 'covert') {
				covert.push(il[i]);
			}
			if (il[i].class == 'classified') {
				classified.push(il[i]);
			}
			if (il[i].class == 'restricted') {
				restricted.push(il[i]);
			}
			if (il[i].class == 'milspec' || il[i].class == 'industrial' || il[i].class == 'consumer') {
				milspec.push(il[i]);
			}
			if (il[i].class == 'exceedingly_rare') {
				exceedingly_rare.push(il[i]);
			}
		}

		for (var i = 0; i < 40; i++) {
			var a = document.createElement('div');

			var r = Math.random();
			var item;
			if (c == 'knife') {
				item = exceedingly_rare[Math.floor(Math.random() *  exceedingly_rare.length)];
			} else if (c == 'stattrak') {
				item = milspec[Math.floor(Math.random() * milspec.length)];
			} else if (c == 'stattrak2') {
				item = restricted[Math.floor(Math.random() * restricted.length)];
			} else if (c == 'stattrak3') {
				item = classified[Math.floor(Math.random() * classified.length)];
			} else if (c == 'stattrak4') {
				item = covert[Math.floor(Math.random() * covert.length)];
			} else {
				if (r < 0.004 + (userdata.upgrades['Luck'].amount / 200) && exceedingly_rare.length > 0) {
					item = exceedingly_rare[Math.floor(Math.random() *  exceedingly_rare.length)];
				} else if (r < 0.02 + (userdata.upgrades['Luck'].amount / 200) && covert.length > 0 && covert.length > 0) {
					item = covert[Math.floor(Math.random() * covert.length)];
				} else if (r < 0.05 + (userdata.upgrades['Luck'].amount / 200) && classified.length > 0 && classified.length > 0) {
					item = classified[Math.floor(Math.random() * classified.length)];
				} else if (r < 0.25 + (userdata.upgrades['Luck'].amount / 200) && restricted.length > 0 && restricted.length > 0) {
					item = restricted[Math.floor(Math.random() * restricted.length)];
				} else {
					item = milspec[Math.floor(Math.random() * milspec.length)];
				}
			}

			if (item != undefined) {
				var r = Math.random();
				var stattrak = '';
				if (r < 0.2 && item.stattrak == true || c.split(' ').indexOf('stattrak') > -1) {
					stattrak = 'stattrak';
				}
				var wl = ['fn', 'mw', 'ft', 'ww', 'bs']
				var w = wl[Math.floor(Math.random() * wl.length)];

				a.className = 'item ' + item.class + ' ' + stattrak + ' ' + w;

				a.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + item.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + item.name + '</div>';

				if (i == 36) {
					var f_item = item;

					if (stattrak == 'stattrak') {
						stattrak = true;
					} else {
						stattrak = false;
					}

					userdata.inv.push({name:f_item.name,stattrak:stattrak,t:w});
					rendInv()

					var b = a;
					setTimeout(function() {
						var item = f_item;
						var g = scroll_s.getElementsByClassName('item');
						for (var i = 0; i < g.length; i++) {
							g[i].style.transform = 'scale(0.9)';
							g[i].style.opacity = '0.4';
						}
						b.style.transform = 'scale(1)';
						b.style.opacity = '1';
						canUpdate = true;
						$('#closeOpener').classList.toggle('show' , true);
						update();
						$('#sidemenu').style.pointerEvents = 'auto';
						$('#sidemenu').style.opacity = 1;
					}, 5300);
				}

				scroll_s.appendChild(a);
			}
		}
		setTimeout(function() {
			scroll_s.style.transition = '5s cubic-bezier(0,0,.3,1)';
			scroll_s.style.left = -Math.abs(5150 + Math.floor(Math.random() * 120)) + 'px';
		}, 100);
	}
}

$('#sellAll').addEventListener('click', function() {
	for (var i = 0; i < userdata.inv.length; i++) {
		var item = getItemData(userdata.inv[i].name);
		var itemPrice = item.price * (userdata.inv[i].stattrak ? 3 : 1);
		if (itemPrice < 10.00) {
			userdata.money = userdata.money + itemPrice;
			userdata.inv[i] = 'toBeDeleted'
		}
	}
	for (var d = userdata.inv.length - 1; d > -1; d--) {
		if (userdata.inv[d] == 'toBeDeleted') {
			userdata.inv.splice(d, 1);
		}
	}
	update();
	rendInv();
});

function getItemData(n) {
	var data = false;

	for (var i = 0; i < items.length; i++) {
		if (items[i].name == n) {
			data = items[i];
			return data;
		}
	}

	return data;
}

var p = 0;

$('#prevbtn').addEventListener('click', function() {
	p--;
	rendInv();
});
$('#nextbtn').addEventListener('click', function() {
	p++;
	rendInv();
});
$('#pn').addEventListener('click', function() {
	this.select();
});
$('#pn').addEventListener('keyup', function(e) {
	if (e.keyCode == 13) {
		this.blur();
	}
});
$('#pn').addEventListener('blur', function(e) {
	if (!isNaN(parseFloat(this.value)) && isFinite(this.value)) {
		p = this.value-1;
	} else {
		this.value = p;
	}
	rendInv()
});
window.onresize = function() {
	rendInv();
}

function rendInv() {

	if (sort == 'A>Z') {
		userdata.inv.sort(function(a, b){
		    if(a.name < b.name) return -1;
		    if(a.name > b.name) return 1;
		    return 0;
		})
	} else if (sort == 'Z>A') {
		userdata.inv.sort(function(a, b){
		    if(a.name > b.name) return -1;
		    if(a.name < b.name) return 1;
		    return 0;
		})
	} else if (sort == 'H>L') {
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
			var aPrice = aData.price * wtp[a.t] * (a.stattrak ? 3 : 1);
			var bPrice = bData.price * wtp[b.t] * (b.stattrak ? 3 : 1);
		    if(aPrice > bPrice) return -1;
		    if(aPrice < bPrice) return 1;
		    return 0;
		})
	} else if (sort == 'L>H') {
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
			var aPrice = aData.price * (a.stattrak ? 3 : 1);
			var bPrice = bData.price * (b.stattrak ? 3 : 1);
		    if(aPrice < bPrice) return -1;
		    if(aPrice > bPrice) return 1;
		    return 0;
		})
	} else if (sort == 'T>T') {
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
		    if(aData.type > bData.type) return -1;
		    if(aData.type < bData.type) return 1;
		    return 0;
		})
	} else if (sort == 'T<T') {
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
		    if(aData.type < bData.type) return -1;
		    if(aData.type > bData.type) return 1;
		    return 0;
		})
	} else if (sort == 'R>C') {
		var raritys = {
			exceedingly_rare:9,
			covert:8,
			classified:7,
			restricted:6,
			milspec:5,
			standard:4,
			industrial:3,
			consumer:2,
		}
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
		    if(raritys[aData.class] > raritys[bData.class]) return -1;
		    if(raritys[aData.class] < raritys[bData.class]) return 1;
		    return 0;
		})
	} else if (sort == 'C>R') {
		var raritys = {
			exceedingly_rare:9,
			covert:8,
			classified:7,
			restricted:6,
			milspec:5,
			standard:4,
			industrial:3,
			consumer:2,
		}
		userdata.inv.sort(function(a, b){
			var aData = getItemData(a.name);
			var bData = getItemData(b.name);
		    if(raritys[aData.class] < raritys[bData.class]) return -1;
		    if(raritys[aData.class] > raritys[bData.class]) return 1;
		    return 0;
		})
	}

	$('#inventoryItems').innerHTML = '';

	var il = userdata.inv.length;
	var ps = 0;
	if (window.innerWidth > 600 && window.innerHeight > 300) {
		var ipp = Math.floor( (window.innerWidth - 260) / 150 ) * Math.floor( (window.innerHeight - 50) / 214 );
	} else {
		var ipp = 10;
	}

	var ilw = il;
	while (ilw > ipp) {
		ps++;
		ilw = ilw - ipp;
	}

	if (p < 0) {
		p = 0;
	} else if (p > ps) {
		p = ps;
	}

	$('#pn').value = p+1;

	if (il != 0) {
		for (var i = 0 + p*ipp; i < ipp + p*ipp; i++) {
			if (userdata.inv[i] != undefined) {
				var data = getItemData(userdata.inv[i].name);
				if (data != false) {
					var item = document.createElement('div');
					item.className = 'item';
					item.setAttribute('n', i);

					var price = data.price * wtp[userdata.inv[i].t];

					var stattrak = '';
					if (userdata.inv[i].stattrak == true) {
						stattrak = 'stattrak';
						price = data.price * wtp[userdata.inv[i].t] * 3;
					}

					var iteminner = document.createElement('div');

					iteminner.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + data.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + data.name + '</div>';
					iteminner.className = 'innerItem ' + data.class + ' ' + stattrak + ' ' + userdata.inv[i].t;
					iteminner.setAttribute('i', i)
					iteminner.addEventListener('click', function() {
						var i = this.getAttribute('i');
						var data = getItemData(userdata.inv[i].name);

						$('#inspect_image').style.backgroundImage = 'url(https://mtsl.dk/csgo/images/' + data.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)';
						$('#inspect_image').className = userdata.inv[i].t;

						$('#inspect_name').innerHTML = data.name;
						$('#inspect_wname').innerHTML = data.name.split(' | ')[1];
						$('#inspect_stattrak').innerHTML = userdata.inv[i].stattrak;
						var rarity = {
							exceedingly_rare:'Exceedingly Rare',
							covert:'Covert',
							classified:'Classified',
							restricted:'Restricted',
							milspec:'Mil-spec',
							standard:'Standard',
							industrial:'Industrial Grade',
							consumer:'Consumer Grade',
						}
						$('#inspect_rarity').innerHTML = rarity[data.class];
						$('#inspect_rarity').style.color = classesType2[data.class];
						var stattrak = 1;
						if (userdata.inv[i].stattrak == true) {
							stattrak = 3;
						}
						$('#inspect_price').innerHTML = (data.price * stattrak * wtp[userdata.inv[i].t]).toFixed(2) + '€';


						showPopup('inspect');
					})
					item.appendChild(iteminner);

					var itemactions = document.createElement('div');
					itemactions.className = 'itemActions';
					var sellbtn = document.createElement('button');
					sellbtn.addEventListener('click', function() {
						var a = this.parentNode.parentNode.getAttribute('n');
						var price = getItemData(userdata.inv[a].name).price * wtp[userdata.inv[a].t]
						if (userdata.inv[a].stattrak == true) {
							price = getItemData(userdata.inv[a].name).price * wtp[userdata.inv[a].t] * 3;
						}
						userdata.money = userdata.money + price;
						userdata.inv.splice(a, 1);
						rendInv();
						update();
					})
					sellbtn.innerHTML = 'Sell ' + price.toFixed(2) + '€';
					itemactions.appendChild(sellbtn);
					if (data.type == 'case') {
						var openbtn = document.createElement('button');
						openbtn.addEventListener('click', function() {
							showPopup('case');
							var a = this.parentNode.parentNode.getAttribute('n');
							cc = getItemData(userdata.inv[a].name).case;
							var cck = cc;

							document.getElementsByClassName('openCase')[0].style.display = 'block';
							document.getElementsByClassName('open5Cases')[0].style.display = 'block';
							document.getElementsByClassName('buyKey')[0].style.display = 'block';
							document.getElementsByClassName('openCase')[0].setAttribute('key', cck);
							document.getElementsByClassName('open5Cases')[0].setAttribute('key', cck);
							if (getItemData(userdata.inv[a].name).needkey == false) {
								document.getElementsByClassName('open5Cases')[0].removeAttribute('key5')
								document.getElementsByClassName('openCase')[0].className = 'openCase';
								document.getElementsByClassName('openCase')[0].disabled = false;
								$('#btnRightCase').className = 'buyKey disabledIf hide';
								document.getElementsByClassName('buyKey')[0].style.display = 'none';
								document.getElementsByClassName('open5Cases')[0].className = 'open5Cases';
								document.getElementsByClassName('open5Cases')[0].disabled = false;

								var checkCase = 0;
								for (var g = 0; g < userdata.inv.length; g++) {
									var item = getItemData(userdata.inv[g].name);
									if (item.case == document.getElementsByClassName('open5Cases')[0].getAttribute('key') && item.type == 'case') {
										checkCase++;
									}
								}
								if (checkCase < 5) {
									document.getElementsByClassName('open5Cases')[0].disabled = true;
								}
							} else {
								document.getElementsByClassName('open5Cases')[0].setAttribute('key5', 'true')
								document.getElementsByClassName('openCase')[0].className = 'openCase disabledIf';
								$('#btnRightCase').className = 'buyKey disabledIf';
								var checkCase = 0;
								for (var g = 0; g < userdata.inv.length; g++) {
									var item = getItemData(userdata.inv[g].name);
									if (item.case.split(' ').indexOf(document.getElementsByClassName('open5Cases')[0].getAttribute('key')) > -1 && item.type == 'case') {
										checkCase++;
									}
								}
								if (checkCase < 5) {
									document.getElementsByClassName('open5Cases')[0].disabled = true;
									document.getElementsByClassName('open5Cases')[0].className = 'open5Cases disabledIf';
								} else {
									document.getElementsByClassName('open5Cases')[0].className = 'open5Cases disabledIf';
								}
							}

							update();

							incase();

							$('#openerType').innerHTML = userdata.inv[a].name;
						})
						openbtn.innerHTML = 'Open';
						itemactions.appendChild(openbtn);
					}
					item.appendChild(itemactions);


					$('#inventoryItems').appendChild(item);
				}
			}
		}
	}
}

rendInv()

var popups = document.getElementsByClassName('popup');
function showPopup(a) {
	for (var i = 0; i < popups.length; i++) {
		popups[i].classList.toggle('show', false);
	}
	if (a != false) {
		$('#' + a).classList.toggle('show', true);
	}
}

function rendCaseShop() {
	$('#shop').innerHTML = '';

	for (var i = 0; i < items.length; i++) {
		var data = getItemData(items[i].name);
		if (data != false && data.type == 'case') {
			var item = document.createElement('div');
			item.className = 'item';
			item.setAttribute('n', i);

			var iteminner = document.createElement('div');

			iteminner.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + data.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + data.name + '</div>';
			iteminner.className = 'innerItem ' + data.class;
			iteminner.addEventListener('click', function() {
				showPopup('case');
				var a = this.parentNode.getAttribute('n');
				cc = items[a].case;
				var cck = cc;

				document.getElementsByClassName('openCase')[0].style.display = 'none';
				document.getElementsByClassName('open5Cases')[0].style.display = 'none';
				document.getElementsByClassName('buyKey')[0].style.display = 'none';

				update();

				incase();

				$('#openerType').innerHTML = items[a].name;
			});

			item.appendChild(iteminner);

			var itemactions = document.createElement('div');
			itemactions.className = 'itemActions';
			var buybtn = document.createElement('button');
			buybtn.addEventListener('click', function() {
				var a = this.parentNode.parentNode.getAttribute('n');
				var im = items[a];
				if (userdata.money >= im.price) {
					userdata.money = userdata.money - im.price;
					userdata.inv.push({name:im.name,stattrak:false,t:'u'});
					rendInv();
					update();
				}
			})
			buybtn.className = 'disabledIf';
			buybtn.setAttribute('min', data.price);
			buybtn.setAttribute('minrank', data.rankNeeded);
			buybtn.innerHTML = 'Buy for ' + data.price.toFixed(2) + '€';
			itemactions.appendChild(buybtn);
			item.appendChild(itemactions);


			$('#shop').appendChild(item);

			update();
		}
	}
}

var pages = document.getElementsByClassName('page');
function showPage(a) {
	for (var i = 0; i < pages.length; i++) {
		pages[i].classList.toggle('show', false);
	}
	if (a != false) {
		$('#' + a).classList.toggle('show', true);
	}
	if (a == 'shop') {
		rendCaseShop();
	}
	if (a == 'upgrades') {
		rendUpgrades();
	}
	if (a == 'inventory') {
		rendInv();
	}
	update();
	$('#sidemenu').classList.toggle('open', false);
	$('#navtoggle').classList.toggle('open', false);
	$('#overlay').classList.toggle('closeMenu', false);
}

setInterval(function() {
	if (userdata.moneyarray[userdata.moneyarray.length-1] != userdata.money) {
		userdata.moneyarray.push(userdata.money);
	}
}, 60000);
if (userdata.moneyarray[userdata.moneyarray.length-1] != userdata.money) {
	userdata.moneyarray.push(userdata.money);
}

function rendUpgrades() {
	$('#upgrades').innerHTML = '';


	for (var i = 0; i < upgrades.length; i++) {var g = document.createElement('div');

		g.innerHTML = '<span class="name">' + upgrades[i].name + '</span>' + '<span class="dec">' + upgrades[i].dec + '. (' + (userdata.upgrades[upgrades[i].name].amount < 10 ? userdata.upgrades[upgrades[i].name].amount : 'MAX') + ')</span>';

		var btn = document.createElement('button');

		var price = (upgrades[i].price * (1 + upgrades[i].priceboost * userdata.upgrades[upgrades[i].name].amount)).toFixed(2);

		btn.innerHTML = 'Buy for ' + price + '€';
		btn.setAttribute('i', i);
		btn.className = 'disabledIf';
		btn.setAttribute('min', price);
		btn.setAttribute('below10', userdata.upgrades[upgrades[i].name].amount);

		btn.addEventListener('click', function() {
			var i = this.getAttribute('i');
			var price = (upgrades[i].price * (1 + userdata.upgrades[upgrades[i].name].amount * upgrades[i].priceboost));
			if (price <= userdata.money && userdata.upgrades[upgrades[i].name].amount < 10) {
				++userdata.upgrades[upgrades[i].name].amount
				userdata.money = userdata.money - price;
				update()
				rendUpgrades()
			}
		})

		g.appendChild(btn);

		$('#upgrades').appendChild(g);
	}


	update();
}

showPage('inventory');

var closePopupBtn = document.getElementsByClassName('closePopupBtn');

for (var i = 0; i < closePopupBtn.length; i++) {
	closePopupBtn[i].addEventListener('click', function() {
		showPopup(false);
		$('#sidemenu').style.opacity = 1;
		$('#sidemenu').style.pointerEvents = 'auto';
	})
}

var buykey = document.getElementsByClassName('buyKey');

var cc = '';

for (var i = 0; i < buykey.length; i++) {
	buykey[i].addEventListener('click', function() {
		if (cc == 'spectrum') {
			buy('Spectrum Case Key');
		} else if (cc == 'csgo_weapon' || cc == 'csgo_weapon2' || cc == 'csgo_weapon3') {
			buy('CS:GO Weapon Case Key');
		} else if (cc == 'shadow') {
			buy('Shadow Case Key');
		} else if (cc == 'falchion') {
			buy('Falchion Case Key');
		} else if (cc == 'vanguard') {
			buy('Operation Vanguard Case Key');
		} else if (cc == 'chroma') {
			buy('Chroma Case Key');
		} else if (cc == 'gamma') {
			buy('Gamma Case Key');
		} else if (cc == 'chroma2') {
			buy('Chroma Case 2 Key')
		} else if (cc == 'chroma3') {
			buy('Chroma Case 3 Key')
		} else if (cc == 'gamma2') {
			buy('Gamma Case 2 Key')
		} else if (cc == 'hydra') {
			buy('Operation Hydra Case Key')
		} else if (cc == 'revolver') {
			buy('Revolver Case Key')
		}
		// Casecheck
	})
}

var openCaseE = document.getElementsByClassName('openCase');

for (var i = 0; i < openCaseE.length; i++) {
	openCaseE[i].addEventListener('click', function() {
		openCase(this.getAttribute('key'));
	})
}

var open5CaseE = document.getElementsByClassName('open5Cases');

for (var i = 0; i < open5CaseE.length; i++) {
	open5CaseE[i].addEventListener('click', function() {
		openCase(this.getAttribute('key'), 5);
	})
}

var navlink = document.getElementsByClassName('navlink');

for (var i = 0; i < navlink.length; i++) {
	navlink[i].addEventListener('click', function() {
		for (var i = 0; i < navlink.length; i++) {
			navlink[i].classList.toggle('selected', false);
		}
		showPage(this.getAttribute('link'));
		if (this.getAttribute('link') == 'inventory') {
			rendInv();
		}
		this.classList.toggle('selected', true);
		showPopup(false);
	})
}

function buy(item) {
	for (var i = 0; i < items.length; i++) {
		if (items[i].name == item) {
			item = items[i];
		}
	}
	if (userdata.money >= item.price) {
		userdata.inv.push({name:item.name,stattrak:false,t:'u'});
		userdata.money = userdata.money - item.price;
		update();
		rendInv();
	}
}
function checkRank() {

	var prank = rank;

	rank = 1;
	var ranks = [
		0, // 1
		500, // 2
		1000, // 3
		2000, // 4
		3000, // 5
		5000, // 6
		7000, // 7
		9000, // 8
		12000, // 9
		16000, // 10
		20000, // 11
		25000, // 12
		30000, // 13
		40000, // 14
		50000, // 15
		75000, // 16
		100000, // 17
		150000, // 18
	]
	var invv = 0;
	var dinvv = 0;
	for (var i = 0; i < userdata.inv.length; i++) {
		var it = getItemData(userdata.inv[i].name);
		if (it.type == 'skin') {
			var stattrak = 1;
			if (userdata.inv[i].stattrak == true) {
				stattrak = 3;
			}
			var price = it.price * wtp[userdata.inv[i].t] * stattrak;
			invv = invv + price;
		} else {
			var stattrak = 1;
			if (userdata.inv[i].stattrak == true) {
				stattrak = 3;
			}
			var price = it.price * wtp[userdata.inv[i].t] * stattrak;
			dinvv = dinvv + price;
		}
	}
	for (var i = 0; i < ranks.length; i++) {
		if (invv >= ranks[i]) {
			rank = i + 1;
		}
	}
	$('#rankTextRight').innerHTML = '<span>Earn</span> ' + (ranks[rank] - invv).toFixed(0) + '€ <span>More</span>';
	$('#rankProcent').style.width = (invv-ranks[rank-1])/(ranks[rank]-ranks[rank-1])*100 + '%';

	$('#rank').style.backgroundImage = 'url(https://mtsl.dk/csgo/images/rank' + rank + '.png)';
	$('#rankText').innerHTML = 'Value: ' + (invv + dinvv).toFixed(2) + '€';

	if (rank > prank) {
		$('#rank').className = 'rankup';
		setTimeout(function() {
			$('#rank').className = '';
		}, 10000);
	}
}

var canUpdate = true;
function update() {
	if (canUpdate) {
		$('#cash').innerHTML = userdata.money.toFixed(2) + '€';

		checkRank();


		var disabledIf = document.getElementsByClassName('disabledIf');
		for (var i = 0; i < disabledIf.length; i++) {
			if (disabledIf[i].getAttribute('min') != undefined) {
				if (disabledIf[i].getAttribute('min') <= userdata.money) {
					disabledIf[i].disabled = false;
				} else {
					disabledIf[i].disabled = true;
				}
			}
			if (disabledIf[i].getAttribute('minrank') != undefined) {
				if (disabledIf[i].getAttribute('minrank') <= rank) {
					disabledIf[i].disabled = false;
					disabledIf[i].classList.toggle('rankNeeded', false)
				} else {
					disabledIf[i].disabled = true;
					disabledIf[i].classList.toggle('rankNeeded', true)
				}
			}
			if (disabledIf[i].getAttribute('key') != undefined) {
				var checkKey = false;
				for (var g = 0; g < userdata.inv.length; g++) {
					var item = getItemData(userdata.inv[g].name);
					if (item.case.split(' ').indexOf(disabledIf[i].getAttribute('key')) > -1 && item.type == 'key') {
						checkKey = true;
					}
				}
				if (checkKey == true) {
					disabledIf[i].disabled = false;
				} else {
					disabledIf[i].disabled = true;
				}
			}
			if (disabledIf[i].getAttribute('key5') != undefined) {
				var checkKey = 0;
				for (var g = 0; g < userdata.inv.length; g++) {
					var item = getItemData(userdata.inv[g].name);
					if (item.case.split(' ').indexOf(disabledIf[i].getAttribute('key')) > -1 && item.type == 'key') {
						checkKey++;
					}
				}
				var checkCase = 0;
				for (var g = 0; g < userdata.inv.length; g++) {
					var item = getItemData(userdata.inv[g].name);
					if (item.case.split(' ').indexOf(disabledIf[i].getAttribute('key')) > -1 && item.type == 'case') {
						checkCase++;
					}
				}
				if (checkKey >= 5 && checkCase >= 5) {
					disabledIf[i].disabled = false;
				} else {
					disabledIf[i].disabled = true;
				}
			}
			if (disabledIf[i].getAttribute('below10') != undefined) {
				if (disabledIf[i].getAttribute('below10') > 9) {
					disabledIf[i].disabled = true;
				}
			}
			if (disabledIf[i].getAttribute('min') != undefined) {
				if (disabledIf[i].getAttribute('min') <= userdata.money) {

				} else {
					disabledIf[i].disabled = true;
				}
			}
		}
		save();
	}
}


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

	var r = Math.floor(Math.random() * 2)
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

var jackpotFunc = document.getElementsByClassName('jackpot_func');
var jp_type = '';
var jp_betTypes = {low:1000,high:10000}

for (var i = 0; i < jackpotFunc.length; i++) {
	jackpotFunc[i].addEventListener('click', function() {
		jp_type = this.getAttribute('t');
		$('#jp_t').innerHTML = this.innerHTML;
		showPopup('jackpot');
		$('#sidemenu').style.opacity = 0.3;
		$('#sidemenu').style.pointerEvents = 'none';
		jpFunc();
	});
}

$('#joinJackpot').addEventListener('click', function() {
	showPopup('moveInv');
	rendMoveInv('joinJackpotHandler', jp_betTypes[jp_type]);
});

var jp_useritems = [];
function joinJackpotHandler(items) {

	var userInvV = 0;

	for (var i = 0; i < items.length; i++) {
		jp_useritems.push(items[i]);
		var d = getItemData(userdata.inv[items[i]].name);
		userInvV = userInvV + d.price * (userdata.inv[items[i]].stattrak ? 3 : 1) * wtp[userdata.inv[items[i]].t];
	}

	jpBets.push({inv:userInvV,name:'You'});

	JPchances();

	showPopup('jackpot');

	$('#joinJackpot').disabled = true;
	$('#closeJackpot').disabled = true;

}

setInterval(function() {
	$('#jp_output').innerHTML = '';
	if (new Date().getSeconds() <= 48) {
		$('#jp_winlose_output').innerHTML = '';
		$('#jp_output').innerHTML = 48 - new Date().getSeconds();
	}
	if (new Date().getSeconds() == 48) {
		$('#jp_inner').className = '';
		$('#jp_inner').innerHTML = '';
	}
	if (new Date().getSeconds() == 49) {
		jpStart();
	}
	if (new Date().getSeconds() >= 59) {
		jpFunc();
	}
}, 1000);

var jpBets = [];
var jp_allitems = [];
var botNames = ['Avazerry','Bolavacc','Boylandexin','Brandie','Buckman','CheerupSpuffy','CommentFreex','Comskyly','DollWish','Drummergeod','Ensingly','Fashionix','FixInterview','Fresherra','GeneralFollow','GrundyRunning','Hageneya','Jeanewcom','JollyLessLuv','Likeyprole','Litypupr','Majorthol','Markette','MountainTown','Neattaixco','Opulsiti','Querral','Rentrect','Revelsta','RightFestive','Amnetthe','Aviateola','Beckingsh','Bergeni','Ciphers','Clapboa','EdgyJim','Elitine','ExecChoneGold','EyesThehibiki','Gardaqua','Getawarby','Geteader','Gijimac','Glacendor','Haderpa','Hyperhedi','Isacmega','Matellin','Menspenm','MoffMs','Nanompation','Omaxessbo','Ostrize','Plentylene','Previtica','Rameyalle','Rockettalk','Seentionix'];
var people = [
	{
		name:'STR1k3',
		img:'people0.jpg'
	},
]
var botImg = 41; // Starting from 0 ( botImg - 1)
function jpFunc() {
	jp_useritems = [];
	jp_allitems = [];
	jpBets = [];
	var botsN = 4;
	for (var i = 0; i < botsN; i++) {
		var botInvV = 0;
		var botitems = [];
		var c = jp_betTypes[jp_type] * Math.random();
		var itemsList = [];
		for (var h = 0; h < items.length; h++) {
			if (items[h].type == 'skin' && items[h].price > 20) {
				itemsList.push(items[h]);
			}
		}
		while (botInvV < c) {
			var item = itemsList[Math.floor(Math.random() * itemsList.length)];
			var d = false;
			if (i.stattrak == true) {
				var r = Math.random();
				if (r < 0.2) {
					d = true;
				}
			}
			botitems.push(item);
			var wl = ['fn', 'mw', 'ft', 'ww', 'bs']
			var w = wl[Math.floor(Math.random() * wl.length)];
			if (botInvV + item.price * (d ? 3 : 1) < c) {
				jp_allitems.push({name:item,stattrak:d,t:w});
				botInvV = botInvV + item.price * (d ? 3 : 1);
			} else if (botInvV < 1) {

			} else {
				c = 0;
			}
		}
		if (Math.random() < 0.1) {
			var bot = people[Math.floor(Math.random() * people.length)];
			jpBets.push({inv:botInvV,name:bot.name,img:bot.img});
		} else {
			jpBets.push({inv:botInvV,name:botNames[Math.floor(Math.random() * botNames.length)],img:'profile'+Math.floor(Math.random() * botImg)+'.jpg'});
		}
	}
	JPchances()

}
var jp_chances = [];
function JPchances() {
	var sum = 0;
	for (var i = 0; i < jpBets.length; i++) {
		sum = sum + jpBets[i].inv;
	}
	$('#jp_joined').innerHTML = '';
	for (var i = 0; i < jpBets.length; i++) {
		jp_chances[i] = {chance:jpBets[i].inv/sum*100,name:jpBets[i].name,img:jpBets[i].img};

		var joined = document.createElement('tr');

		var q = jp_chances[i].img;
		if (q == undefined) {
			q = 'profile0.jpg'
		}

		joined.innerHTML = '<th><img src="https://mtsl.dk/csgo/images/' + q + '"></th><th>' + jp_chances[i].name + '</th><td>' + jp_chances[i].chance.toFixed(2) + '%</td><td>' + jpBets[i].inv.toFixed(2) + '€</td>';

		$('#jp_joined').appendChild(joined);
	}
}
function jpStart() {

	var r = Math.random() * 100;

	jp_chances.sort(function(a, b){
	    if(a.chance < b.chance) return -1;
	    if(a.chance > b.chance) return 1;
	    return 0;
	})

	var ltChance = 0;
	for (var i = 0; i < jp_chances.length; i++) {
		bc = jp_chances[i].chance;
		jp_chances[i].chance = jp_chances[i].chance + ltChance;
		ltChance = ltChance + bc;
	}

	var winner = 0;
	var player = 'NOT PLAYING';

	for (var i = 0; i < jp_chances.length; i++) {
		if (jp_chances[i].name == 'You') {
			player = i;
			canUpdate = false;
		}
		if (r < jp_chances[i].chance) {
			winner = i;
			break;
		}
	}

	var jpWinLoseOutput = '';

	var wi = [];
	if (winner == player) {
		for (var i = 0; i < jp_allitems.length; i++) {
			userdata.inv.push({name:jp_allitems[i].name.name,stattrak:jp_allitems[i].stattrak,t:jp_allitems[i].t});
			wi.push({name:jp_allitems[i].name.name,stattrak:jp_allitems[i].stattrak,t:jp_allitems[i].t,class:jp_allitems[i].name.class,price:jp_allitems[i].name.price});
			setTimeout(function() {
				showItems(wi);
			}, 8200);
		}
		jpWinLoseOutput = 'You won!';
	} else if (jp_useritems.length == 0) {
		jpWinLoseOutput = jp_chances[winner].name + ' won!';
	} else {
		for (var i = 0; i < jp_useritems.length; i++) {
			userdata.inv[jp_useritems[i]] = 'ToBeDeleted';
		}
		for (var i = userdata.inv.length; i > -1; i--) {
			if (userdata.inv[i] == 'ToBeDeleted') {
				userdata.inv.splice(i, 1);
			}
		}
		jpWinLoseOutput = 'You lost!';
	}

	$('#jp_inner').innerHTML = '';
	for (var i = 0; i < 40; i++) {
		var a = document.createElement('div');

		var r = Math.random() * 100;

		var p = 'n#UNKNOWN|§µ';
		var q = '';

		for (var n = 0; n < jp_chances.length; n++) {
			if (r < jp_chances[n].chance) {
				p = jp_chances[n].name;
				q = jp_chances[n].img;
				break;
			}
		}
		if (p == 'n#UNKNOWN|§µ') {
			p = jp_chances[jp_chances.length - 1].name;
			q = jp_chances[jp_chances.length - 1].img;
		}
		if (p == 'You') {
			a.className = 'jp_player';
			q = 'profile0.jpg';
		}

		a.innerHTML = p;
		a.style.backgroundImage = 'url(https://mtsl.dk/csgo/images/' + q + ')';

		if (i == 34) {
			var g = a;
			g.className = '';
			g.style.backgroundImage = 'url(https://mtsl.dk/csgo/images/' + jp_chances[winner].img + ')';
			if (jp_chances[winner].name == 'You') {
				g.className = 'jp_player';
				g.style.backgroundImage = 'url(https://mtsl.dk/csgo/images/profile0.jpg)';
			}
			setTimeout(function() {
				g.style.color = '#fc0';
			}, 8000);
			g.innerHTML = jp_chances[winner].name;
		}

		$('#jp_inner').appendChild(a);
	}
	$('#jp_inner').className = 'start';

	setTimeout(function() {
		$('#jp_winlose_output').innerHTML = jpWinLoseOutput;
		if (player != 'NOT PLAYING') {
			canUpdate = true;
		}
		update();
		rendInv();

		$('#joinJackpot').disabled = false;
		$('#closeJackpot').disabled = false;
	}, 8000);
}

jpFunc()



$('#click_cookie_m').addEventListener('mousedown', function(e) {
	clickCookie(e);
})
var touched = false;
document.addEventListener('touchend', function(e) {
	e.preventDefault();
	if (touched == true) {
		e.target.click();
	}
})
document.addEventListener('touchmove', function() {
	touched = false;
})
document.addEventListener('touchstart', function(e) {
	touched = true;
})
$('#click_cookie_m').addEventListener('touchstart', function(e) {
	clickCookie(e);
})

function clickCookie(e) {
	var a = Math.random() * (1 + userdata.upgrades['+CASH'].amount);
	userdata.money = userdata.money + a;
	update();
	var div = document.createElement('div');
	div.innerHTML = '+ ' + a.toFixed(2) + '€';
	div.className = 'fadeup';
	setTimeout(function() {
		div.parentNode.removeChild(div);
	}, 1000);
	$('#overlay').appendChild(div);
	div.style.left = e.pageX - div.offsetWidth / 2 + (Math.random() - 0.5) * 10 + 'px';
	div.style.top = e.pageY - 20 + (Math.random() - 0.5) * 10 + 'px';
}

function save() {
	localStorage[localStorage['uid'] + '-storage'] = JSON.stringify(userdata);
}

setInterval(save, 1000)

// var keys = ['','','','','','','','','','','',''];
// document.onkeydown = function(e) {
//     keys.push(e.key);
//     keys.shift();
//     checkCheatCode();
// }
// function checkCheatCode() {
//     var str = (keys + '').replace(/,/g,'');
//     if (str.indexOf('laursen') > -1) { // check code
//         keys = ['','','','','','','','','','','',''];
//
//         // cheat code
//         userdata.money = userdata.money + 3500.00;
//
// 		update();
//     }
// }

var lte = (((new Date().getTime() - JSON.parse(localStorage['lastOnline'])) / 1000 / 60 / 24) * (userdata.upgrades['Offline Production'].amount * 5)) * 2;

if (lte >= userdata.upgrades['Bank'].amount * 50 + 50) {
	lte = userdata.upgrades['Bank'].amount * 50 + 50;
}


showPopup(false);
if (((new Date().getTime() - JSON.parse(localStorage['lastOnline'])) / 1000 / 60) >= 1 && lte > 0.00) {
	showPopup('offline');
	$('#msg_wb_e').innerHTML = lte.toFixed(2) + '€'
	userdata.money = userdata.money + lte;
} else {
	navlink[1].classList.toggle('selected', true);
}




localStorage['lastOnline'] = JSON.stringify(new Date().getTime());

setInterval(function() {
	localStorage['lastOnline'] = JSON.stringify(new Date().getTime());
}, 6000);

function incase() {
	$('#wic_div').innerHTML = '';

	var a = [];
	var exceedingly_rare = false;
	for (var i = 0; i < items.length; i++) {
		if (items[i].case.split(' ').indexOf(cc) > -1 && items[i].type == 'skin' && items[i].class != 'exceedingly_rare') {
			a.push(items[i])
		}
		if (items[i].case.split(' ').indexOf(cc) > -1 && items[i].type == 'skin' && items[i].class == 'exceedingly_rare') {
			exceedingly_rare = true;
		}
	}
	if (exceedingly_rare == true) {
		var it = document.createElement('div');
		var item = a[i];

		it.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/specialItem.png)"></div><div class="title">Special item</div>';
		it.className = 'item ' + 'exceedingly_rare';

		$('#wic_div').appendChild(it);
	}
	for (var i = 0; i < a.length; i++) {
		var it = document.createElement('div');
		var item = a[i];

		it.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + item.name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + item.name + '</div>';
		it.className = 'item ' + item.class;

		$('#wic_div').appendChild(it);
	}
}

update()

$('#toggle_fg').addEventListener('click', function() {
	if (localStorage['settingsF'] == 'true') {
		localStorage['settingsF'] = 'false';
	} else {
		localStorage['settingsF'] = 'true';
	}
	update()
	window.location.reload();
})

$('#navtoggle').addEventListener('click', function() {
	$('#sidemenu').classList.toggle('open', true);
	$('#navtoggle').classList.toggle('open', true);
	$('#overlay').classList.toggle('closeMenu', true);
})
$('#overlay').addEventListener('click', function() {
	$('#sidemenu').classList.toggle('open', false);
	$('#navtoggle').classList.toggle('open', false);
	$('#overlay').classList.toggle('closeMenu', false);
})

var set_sorting = document.getElementsByClassName('SET_SORTING');

for (var i = 0; i < set_sorting.length; i++) {
	set_sorting[i].addEventListener('click', function() {
		var sortingType = this.getAttribute('sort');
		var r = this.getAttribute('r');
		for (var i = 0; i < set_sorting.length; i++) {
			set_sorting[i].setAttribute('r', 'none');
		}
		if (sortingType == 'a') {
			if (r == 'none' || r == 'up') {
				this.setAttribute('r', 'down');
				sort = 'A>Z';
			} else {
				this.setAttribute('r', 'up');
				sort = 'Z>A';
			}
		} else if (sortingType == 'p') {
			if (r == 'none' || r == 'up') {
				this.setAttribute('r', 'down');
				sort = 'H>L';
			} else {
				this.setAttribute('r', 'up');
				sort = 'L>H';
			}
		} else if (sortingType == 't') {
			if (r == 'none' || r == 'up') {
				this.setAttribute('r', 'down');
				sort = 'T>T';
			} else {
				this.setAttribute('r', 'up');
				sort = 'T<T';
			}
		} else if (sortingType == 'r') {
			if (r == 'none' || r == 'up') {
				this.setAttribute('r', 'down');
				sort = 'R>C';
			} else {
				this.setAttribute('r', 'up');
				sort = 'C>R';
			}
		}
		rendInv();
	});
}


window.onblur = function() {
  	localStorage[localStorage["uid"] + '-storage'] = JSON.stringify(userdata);
}


$('#rouletteFUNC').addEventListener('click', roulette);
function roulette() {
	showPage('roulette');
	$('#sidemenu').style.pointerEvents = 'none';
	$('#sidemenu').style.opacity = 0.3;
	$('#r_coins').innerHTML = userdata.roulette.toFixed(0);
	$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
}
$('#rouletteBack').addEventListener('click', function() {
	showPage('betting');
	$('#sidemenu').style.pointerEvents = 'auto';
	$('#sidemenu').style.opacity = 1;
});
$('#rouletteDeposit').addEventListener('click', function() {
	showPopup('moveInv');
	rendMoveInv('rouletteDeposit');
});
$('#rouletteWithdraw').addEventListener('click', function() {
	showPopup('rouletteWithdrawMenu');

});
function rouletteDeposit(e) {
	var deposit = e;
	var price = 0;
	for (var i = 0; i < deposit.length; i++) {
		var item = getItemData(userdata.inv[deposit[i]].name);

		price = (price + (item.price * ((userdata.inv[deposit[i]].stattrak) ? 3 : 1)) * wtp[userdata.inv[deposit[i]].t]);

		userdata.inv[deposit[i]] = 'toBeDeleted';
	}
	for (var d = userdata.inv.length - 1; d > -1; d--) {
		if (userdata.inv[d] == 'toBeDeleted') {
			userdata.inv.splice(d, 1);
		}
	}
	userdata.roulette = userdata.roulette + Math.ceil(price * 0.9);
	showPopup(false);
	update();
	rendInv();
	$('#r_coins').innerHTML = userdata.roulette.toFixed(0);
	$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
}
function rouletteWheel(n,m) {
	$('#rouletteWheel_INNER').style.transition = '0s';
	$('#rouletteWheel_INNER').style.left = '0px';
	$('#rouletteWheel_INNER').innerHTML = '';
	var t = [
		{t:'green',n:0},
		{t:'red',n:32},
		{t:'black',n:15},
		{t:'red',n:19},
		{t:'black',n:4},
		{t:'red',n:21},
		{t:'black',n:2},
		{t:'red',n:25},
		{t:'black',n:17},
		{t:'red',n:34},
		{t:'black',n:6},
		{t:'red',n:27},
		{t:'black',n:13},
		{t:'red',n:36},
		{t:'black',n:11},
		{t:'red',n:30},
		{t:'black',n:8},
		{t:'red',n:23},
		{t:'black',n:10},
		{t:'red',n:5},
		{t:'black',n:24},
		{t:'red',n:16},
		{t:'black',n:33},
		{t:'red',n:1},
		{t:'black',n:20},
		{t:'red',n:14},
		{t:'black',n:31},
		{t:'red',n:9},
		{t:'black',n:22},
		{t:'red',n:18},
		{t:'black',n:29},
		{t:'red',n:7},
		{t:'black',n:28},
		{t:'red',n:12},
		{t:'black',n:35},
		{t:'red',n:3},
		{t:'black',n:26},
	]
	$('#rou_betting_bet_controls').className = 'offline';
	var d = Math.floor(Math.random() * 37);
	for (var i = 0; i < 4; i++) {
		for (var g = 0; g < t.length; g++) {
			var div = document.createElement('div');

			div.innerHTML = t[g].n;
			div.style.background = t[g].t;

			$('#rouletteWheel_INNER').appendChild(div);
		}
	}
	setTimeout(function() {
		$('#rouletteWheel_INNER').style.transition = '10s';
		$('#rouletteWheel_INNER').style.left = -Math.abs(3552 + 48 * d - 240 + Math.floor(Math.random() * 32)) + 'px';
	}, 100);
	if (n == 'r') {
		n = 'red';
	} else if (n == 'g') {
		n = 'green';
	} else if (n == 'b') {
		n = 'black';
	}
	userdata.roulette = userdata.roulette - m;
	$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
	if (n == t[d].t) {
		if (n == 'green') {
			userdata.roulette = userdata.roulette + (m * 20);
		} else {
			userdata.roulette = userdata.roulette + m * 2;
		}
	}
	rou_betting = 0;
	setTimeout(function() {
		$('#r_coins').innerHTML = userdata.roulette.toFixed(0);
		$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
		$('#rou_betting').innerHTML = rou_betting;
		$('#rou_betting_r').innerHTML = 0;
		$('#rou_betting_g').innerHTML = 0;
		$('#rou_betting_b').innerHTML = 0;
		$('#rou_betting_bet_controls').className = '';
		var historyElement = document.createElement('div');

		historyElement.className = 'rou_history_element';
		historyElement.innerHTML = t[d].n;
		historyElement.style.background = t[d].t;

		$('#rou_history').appendChild(historyElement);
	}, 10000);
}
var rou_bet = document.getElementsByClassName('rou_bet')
var rou_betting = 0;
for (var i = 0; i < rou_bet.length; i++) {
	rou_bet[i].addEventListener('click', function() {
		if (this.getAttribute('t') == 'c') {
			rou_betting = 0;
		} else if (this.getAttribute('t') == 'a') {
			rou_betting = userdata.roulette;
		} else if (this.getAttribute('t') == '-100') {
			rou_betting = rou_betting - 100;
		} else if (this.getAttribute('t') == '-10') {
			rou_betting = rou_betting - 10;
		} else if (this.getAttribute('t') == '-1') {
			rou_betting = rou_betting - 1;
		} else if (this.getAttribute('t') == '+1') {
			rou_betting = rou_betting + 1;
		} else if (this.getAttribute('t') == '+10') {
			rou_betting = rou_betting + 10;
		} else if (this.getAttribute('t') == '+100') {
			rou_betting = rou_betting + 100;
		}
		if (rou_betting < 0) {
			rou_betting = 0;
		} else if (rou_betting > userdata.roulette) {
			rou_betting = userdata.roulette;
		}
		$('#rou_betting').innerHTML = rou_betting;
		$('#sidemenu').style.pointerEvents = 'none';
		$('#sidemenu').style.opacity = 0.3;
	});
}
var rou_betOn = document.getElementsByClassName('rou_betOn');
for (var i = 0; i < rou_betOn.length; i++) {
	rou_betOn[i].addEventListener('click', function() {
		$('#rou_betting_'+this.getAttribute('t')).innerHTML = rou_betting;
		rouletteWheel(this.getAttribute('t'), rou_betting);
		$('#sidemenu').style.pointerEvents = 'none';
		$('#sidemenu').style.opacity = 0.3;
	});
}
$('#rou_betting').innerHTML = rou_betting;

for (var i = 0; i < items.length; i++) {
	if (items[i].type == 'skin') {

		var wl = ['fn', 'mw', 'ft', 'ww', 'bs']

		for (var h = 0; h < 5; h++) {
			var itemD = document.createElement('div');
			var w = wl[h];
			itemD.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + items[i].name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + items[i].name + '</div><div class="price">' + Math.ceil(items[i].price*wtp[w]) + ' coins</div>';
			itemD.setAttribute('i', i);
			itemD.setAttribute('w', w);
			itemD.className = 'item ' + w + ' ' + items[i].class;

			itemD.addEventListener('click', function() {
				var item = items[this.getAttribute('i')];
				if (Math.ceil(item.price*wtp[this.getAttribute('w')]) <= userdata.roulette) {
					userdata.roulette = userdata.roulette - Math.ceil(item.price*wtp[this.getAttribute('w')]);
					userdata.inv.push({name:item.name,stattrak:false,t:this.getAttribute('w')})
				}
				$('#r_coins').innerHTML = userdata.roulette.toFixed(0);
				$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
			});

			$('#withdrawContainer').appendChild(itemD);

			if (items[i].stattrak == true) {
				var itemD = document.createElement('div');

				itemD.innerHTML = '<div class="image" style="background-image:url(https://mtsl.dk/csgo/images/' + items[i].name.replace(' | ', '').replace('壱', '1').replace('弐', '2').replace(/ /g, '').replace(/:/g, '').replace(/'/g, '') + '.png)"></div><div class="title">' + items[i].name + '</div><div class="price">' + Math.ceil(items[i].price*3*wtp[w]) + ' coins</div>';
				itemD.setAttribute('i', i);
				itemD.setAttribute('w', w);
				itemD.className = 'item stattrak ' + w + ' ' + items[i].class;

				itemD.addEventListener('click', function() {
					var item = items[this.getAttribute('i')];
					if (Math.ceil(item.price * 3 * wtp[this.getAttribute('w')]) <= userdata.roulette) {
						userdata.roulette = userdata.roulette - Math.ceil(item.price * 3 * wtp[this.getAttribute('w')]);
						userdata.inv.push({name:item.name,stattrak:true,t:this.getAttribute('w')});
					}
					$('#r_coins').innerHTML = userdata.roulette.toFixed(0);
					$('#w_coins').innerHTML = userdata.roulette.toFixed(0);
				});

				$('#withdrawContainer').appendChild(itemD);
			}
		}
	}
}
$('#withdrawSearch').addEventListener('keyup', function() {
	var a = $('#withdrawContainer').getElementsByClassName('item');
	for (var i = 0; i < a.length; i++) {
		if (a[i].getElementsByClassName('title')[0].innerHTML.toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
			a[i].style.display = 'inline-block';
		} else {
			a[i].style.display = 'none';
		}
	}
});
$('#withdrawContainerClose').addEventListener('click', function() {
	showPopup(false);
});
setInterval(function() {
	userdata.money = userdata.money + (userdata.upgrades['Online Production'].amount / 10);
	update();
}, 1000);

//

//
