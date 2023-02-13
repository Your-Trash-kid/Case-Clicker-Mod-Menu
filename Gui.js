// userdata.inv.push({"name":"Karambit | Gamma Doppler","stattrak":true,"t":"fn"})
// userdata.money = userdata.money + 99999999

var userdata = JSON.parse(localStorage[localStorage['uid'] + '-storage']);

(() => {
    let n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();
})();
(() => {
    let style = document.createElement('style');
    style.innerHTML = (`details > summary {
    cursor: pointer;
    transition: 0.15s;
    list-style: none;
}
details > summary:hover {
    color: hsl(0, 0%, 50%)
}
details > summary::-webkit-details-marker {
    display: none;
}
details summary ~ * {
    animation: sweep .5s ease-in-out;
}

@keyframes sweep {
    0%    {opacity: 0; transform: translateY(-10px)}
    100%  {opacity: 1; transform: translateY(0)}
}
.cheat {
    border: none;
    background: hsl(0, 0%, 20%);
    padding: 5px;
    margin: 3px;
    width: 60%;
    color: hsl(0, 0%, 100%);
    transition: 0.2s;
    border-radius: 5px;
    cursor: pointer;
}
.cheat:hover {
    background: hsl(0, 0%, 30%);
}`);

    const GUI = document.createElement('div');
    GUI.appendChild(style);
    GUI.style.width = '400px';
    //GUI.style.height = '500px';
    GUI.style.background = 'hsl(0, 0%, 10%)';
    GUI.style.borderRadius = '10px';
    GUI.style.position = 'absolute';
    GUI.style.textAlign = 'center';
    //GUI.style.fontFamily = 'Nunito';
    GUI.style.color = 'white';
    GUI.style.overflow = 'hidden';
    GUI.style.top = '50px';
    GUI.style.left = '50px';
    GUI.style.zIndex = "999";

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    GUI.onmousedown = ((e = window.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = (() => {
            document.onmouseup = null;
            document.onmousemove = null;
        });
        document.onmousemove = ((e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            GUI.style.top = (GUI.offsetTop - pos2) + "px";
            GUI.style.left = (GUI.offsetLeft - pos1) + "px";
        });
    });

    let header = document.createElement('div');
    GUI.appendChild(header);
    header.style.width = '100%';
    header.style.height = '35px';
    header.style.paddingTop = '2px';
    header.style.fontSize = '1.5rem';
    header.style.textAlign = 'center';
    header.style.fontWeight = '550';
    header.innerHTML = `Csgo Clicker Cheats <span style="font-size: 0.75rem; font-weight: 400">Beta v1.3.5</span>`;

    let loop;

    let close = document.createElement('button');
    header.appendChild(close);
    close.style.background = 'red';
    close.style.height = '35px';
    close.style.width = '35px';
    close.style.border = 'none';
    close.style.cursor = 'pointer';
    close.style.position = 'absolute';
    close.style.top = '-10px';
    close.style.right = '-10px';
    close.style.fontSize = '1.25rem';
    close.style.borderRadius = '20px';
    //close.style.fontFamily = 'Nunito';
    close.style.fontWeight = 'bolder';
    close.style.paddingTop = '5px';
    close.style.paddingRight = '10px';
    close.innerText = 'X';
    close.onclick = () => {
        GUI.remove();
        clearInterval(loop);
        removeEventListener('keypress', toggleHidden)
    }

    let minimize = document.createElement('button');
    header.appendChild(minimize);
    minimize.style.background = '#444444';
    minimize.style.height = '35px';
    minimize.style.width = '35px';
    minimize.style.border = 'none';
    minimize.style.cursor = 'pointer';
    minimize.style.position = 'absolute';
    minimize.style.top = '-10px';
    minimize.style.left = '-10px';
    minimize.style.fontSize = '1.5rem';
    minimize.style.borderRadius = '20px';
    //minimize.style.fontFamily = 'Nunito';
    minimize.style.fontWeight = 'bolder';
    minimize.style.paddingTop = '5px';
    minimize.style.paddingLeft = '10px';
    minimize.innerText = '-';
    minimize.onclick = () => {
        bodyDiv.hidden = !bodyDiv.hidden;
    }
    let bodyDiv = document.createElement('div');
    let body = document.createElement('div');
    bodyDiv.appendChild(body);
    GUI.appendChild(bodyDiv);

    let activeCheats = document.createElement('span');
    body.appendChild(activeCheats);

    document.body.append(GUI);

    let footer = document.createElement('div');
    bodyDiv.appendChild(footer);
    footer.style.fontSize = '0.9rem';
    footer.style.paddingBottom = '5px';
    footer.innerHTML = (`<span><br>Cheats by <a style="color: lightblue" href="https://github.com/Your-Trash-kid">Your Trash Kid</a></span>`);

    function reactHandler() {
        return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
    }

    let clicking = "!Running";
    let clickInterval;

    let cheats = {
        global: {
            'Give Money': () => {
                let box = prompt(`Enter amount of cash you want:`);
                if (box.trim() !== "" && !isNaN(box.trim())) {
                    userdata.money = userdata.money + parseFloat(box);
                    update();
                }
            },
            'Give Item': () => {
                async function checkGithubFile(Item) {
                    const response = await fetch('https://raw.githubusercontent.com/Your-Trash-kid/Case-Clicker-Mod-Menu/main/ItemList.txt');
                    const contents = await response.text();
                    const lines = contents.split('\n');
                    let found = false;
            
                    let emptyBox = (box.trim() === "");
            
                    if (emptyBox) {
                        return;
                    }
            
                    for (const line of lines) {
                        if (line === Item) {
                            let amount = prompt(`Enter the amount of the item you want:`);
                            for (let i = 0; i < amount; i++) {
                                userdata.inv.push({"name":Item,"stattrak":true,"t":"fn"})
                            }
                            found = true;
                            break;
                        }
                    }
            
                    if (!found) {
                        confirm("Error: Wrong item name, check the github repository for items names shown in ItemList.txt.");
                    }
                }
                let box = prompt(`Enter name of the Item you want (Gun, Knife, Key, Case):`);
                checkGithubFile(box);
            },
            'Data Values': () => {
                let box = prompt(`What would you like to do?\n• Delete Data\n• Load Data\n• View Current Data`);
                if (box.toLowerCase() === "delete data") {
                    localStorage.clear(userdata)
                    localStorage['uid'] = Math.random();
                    userdata = {"inv":[{"name":"Spectrum Case","stattrak":false,"t":"u"}],"money":2.4,"roulette":0,"upgrades":{"Bank":{"amount":0},"Offline Production":{"amount":0},"+CASH":{"amount":0},"Luck":{"amount":0},"Online Production":{"amount":0}},"moneyarray":[2.4]}
                    update()
                } else if (box.toLowerCase() === "load data") {
                    let box = prompt(`Paste the data here:`);
                    const decodedData = atob(box);
                    localStorage.clear(userdata)
                    localStorage['uid'] = Math.random();
                    userdata = JSON.parse(decodedData);
                    update();
                } else if (box.toLowerCase() === "view current data") {
                    let userdataString = JSON.stringify(userdata, null, 2);
                    const encodedData = btoa(userdataString);
                    
                    let textArea = document.createElement('textarea');
                    textArea.value = encodedData;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    alert('Your Userdata has been copied to clipboard! Paste this data in a easily accessible place like google docs.');
                    
                }
            },
            'Auto Clicker': () => {
                if (clicking === "!Running") {
                    clicking = "Running";
                    const buttons = document.querySelectorAll('.cheat');
                    let box = prompt(`How fast? (millseconds)`)
                    if (box.trim() !== "" && !isNaN(box.trim())) {
                        console.log(box)
                        function clickCookie() {
                            var a = Math.random() * (1 + userdata.upgrades['+CASH'].amount);
                            userdata.money = userdata.money + a;
                            update();
                            var div = document.createElement('div');
                            div.innerHTML = '+ ' + a.toFixed(2) + '€';
                            div.className = 'fadeup';               
                            div.style.zIndex = "998";
                            setTimeout(function() {
                                div.parentNode.removeChild(div);
                            }, 1000);
                            $('#overlay').appendChild(div);
                            const screenWidth = window.innerWidth;
                            const screenHeight = window.innerHeight;
                            
                            div.style.left = (screenWidth / 2 - div.offsetWidth / 2) + 170 - div.offsetWidth / 2 + (Math.random() - 0.5) * 10 + 'px';
                            div.style.top = (screenHeight / 2 - div.offsetHeight / 2) + 20 - 20 + (Math.random() - 0.5) * 10 + 'px';
                            
                        }
                    
                        clickInterval = setInterval(clickCookie, box);
                    
                        buttons[3].innerText = "Stop Auto Clicker";
                    }
                } else {
                    clearInterval(clickInterval);
                    clicking = "!Running";
                    const buttons = document.querySelectorAll('.cheat');
                    buttons[3].innerText = "Auto Clicker";
                }
            },
            'Inject Modded Game Script': () => {
                fetch('https://raw.githubusercontent.com/Your-Trash-kid/Case-Clicker-Mod-Menu/main/GameScripts/ModdedGameScript.js')
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    let textArea = document.createElement('textarea');
                    textArea.value = data;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                
                    alert('In Inspect Element Console, head over to [Sources -> Top -> mtsl.dk -> csgo -> script.js] Now in the new code opened click any part of the code, select all (Ctrl + A), paste (Ctrl + V) and save (Ctrl + S)\nUse the README.md file on the github repository for guide how to get open the inspect element console');
                })
                .catch(error => {
                    console.error(error);
                    alert('Failed to fetch file contents. Please try again or fetch a dev for more infomation.');
                });
            }                         
        }
    }

    let global = document.createElement('details');
    global.innerHTML = (`<summary style="padding: 10px; font-size: 1.0em">(Press E to hide)</summary>`);
    for (var i = 0; i < Object.keys(cheats.global).length; i++) {
        let cheat = createButton(Object.keys(cheats.global)[i]);
        cheat.onclick = cheats.global[Object.keys(cheats.global)[i]];
        global.appendChild(cheat);
    }
    global.open = true;
    global.style.paddingTop = '0px'
    global.style.paddingBottom = '10px';
    body.appendChild(global);

    let cheatDiv = document.createElement('div');
    body.appendChild(cheatDiv);

    function createButton(cheat) {
        let button = document.createElement('button');
        button.classList.add('cheat');
        button.innerText = cheat;
        return button
    }

    function toggleHidden(e) {
        e.code == 'KeyE' && (GUI.hidden = !GUI.hidden)
    };
    addEventListener('keypress', toggleHidden);
})()
