(()=>{
    const texts = [" programmatically", " simply", " in other ways"];
    const span = document.getElementById("retype");
    let text = 0;
    const write = () => {
        let txt = texts[text];
        let current = 0;
        let i = setInterval(()=>{
            span.innerText = txt.substr(0,current);
            if (current == txt.length) {
                clearInterval(i);
                setTimeout(del,1000);
                return;
            }
            current++
        },50);
    }

    const del = () => {
        let txt=texts[text];
        text++;
        if (text == texts.length) text = 0;
        let current = txt.length;
        let i = setInterval(()=>{
            span.innerText = txt.substr(0,current);
            if (current == 0) {
                clearInterval(i);
                setTimeout(write,100);
                return;
            }
            current--
        },50);
    }

    write();

})();

(()=>{
    const codeel = document.getElementById("writecode");
    let texts = [
        "const Client = require('ubereats.js');",
        "const uber = new Client();",
        "",
        "// Look for a tacos store",
        "uber.searchStores(\"tacos\").then((stores) => {",
        "   // Check for count",
        "   if (response.length == 0) return console.log(\"No tacos store found!\");",
        "",
        "   // Get store 1 menu",
        "   uber.getStoreMenu(stores[0].uuid).then((menu) => {",
        "       console.log(menu);",
        "   }).catch(err => console.log);",
        "}).catch(err => console.log);"
    ];
    let current = 0;
    let _current = 0;
    let _i = setInterval(()=>{
        if(isScrolledIntoView(codeel)){
            clearInterval(_i);
            let i = setInterval(()=>{
                const text = texts[current];
                let _text = [...text];
                let value = codeel.innerText;

                if (!_text[_current]) {
                    codeel.innerText = value+"\n";
                    current++;
                    _current = 0;
                    if (current == texts.length) {
                        return clearInterval(i);
                    }
                } else {
                    codeel.innerText = value+_text[_current];
                    value = codeel.innerText;
                    _current++;
                    if (_current == text.length) {
                        current++;
                        _current = 0;
                        codeel.innerText = value+"\n";
                        if (current == texts.length) {
                            return clearInterval(i);
                        }
                    }
                }
            }, 30)
        }
    }, 100)
})()

function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

AOS.init();