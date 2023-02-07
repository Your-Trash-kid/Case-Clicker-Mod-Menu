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
    header.style.textAlign = 'center'
    header.innerHTML = `Csgo Clicker Cheats <span style="font-size: 0.75rem">Beta v1.0</span>`;

    let loop;

    let close = document.createElement('button');
    header.appendChild(close);
    close.style.background = 'red';
    close.style.height = '45px';
    close.style.width = '45px';
    close.style.border = 'none';
    close.style.cursor = 'pointer';
    close.style.position = 'absolute';
    close.style.top = '-10px';
    close.style.right = '-10px';
    close.style.fontSize = '1.5rem';
    close.style.borderRadius = '10px';
    //close.style.fontFamily = 'Nunito';
    close.style.fontWeight = 'bolder';
    close.style.paddingTop = '10px';
    close.style.paddingRight = '15px';
    close.innerText = 'X';
    close.onclick = () => {
        GUI.remove();
        clearInterval(loop);
        removeEventListener('keypress', toggleHidden)
    }

    let minimize = document.createElement('button');
    header.appendChild(minimize);
    minimize.style.background = '#444444';
    minimize.style.height = '45px';
    minimize.style.width = '45px';
    minimize.style.border = 'none';
    minimize.style.cursor = 'pointer';
    minimize.style.position = 'absolute';
    minimize.style.top = '-10px';
    minimize.style.left = '-10px';
    minimize.style.fontSize = '1.5rem';
    minimize.style.borderRadius = '10px';
    //minimize.style.fontFamily = 'Nunito';
    minimize.style.fontWeight = 'bolder';
    minimize.style.paddingTop = '10px';
    minimize.style.paddingLeft = '15px';
    minimize.innerText = '-';
    minimize.onclick = () => {
        bodyDiv.hidden = !bodyDiv.hidden;
    }
    let bodyDiv = document.createElement('div');
    let body = document.createElement('div');
    bodyDiv.appendChild(body);
    GUI.appendChild(bodyDiv);

    /*body.innerHTML = (`<br><span>(Press E to hide)</span><br>`);
    body.style.display = 'block';
    body.style.margin = '10px';
    body.style.background = 'white';
    body.style.minHeight = '70px';*/

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

    let cheats = {
        global: {
            'Give Money': () => {
                let box = prompt(`Enter amount of cash you want:`);
                userdata.money = userdata.money + parseFloat(box);
                update();
            },
            'Give Knife/Gun': () => {
                let box = prompt(`Enter name of the knife/gun you want:`);
                userdata.inv.push({"name":$box,"stattrak":true,"t":"fn"})
            }
        }
    }

    let global = document.createElement('details');
    global.innerHTML = (`<summary style="padding: 10px; font-size: 1.5em; font-weight: bolder">Global</summary>`);
    for (var i = 0; i < Object.keys(cheats.global).length; i++) {
        let cheat = createButton(Object.keys(cheats.global)[i]);
        cheat.onclick = cheats.global[Object.keys(cheats.global)[i]];
        global.appendChild(cheat);
    }
    global.open = true;
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
