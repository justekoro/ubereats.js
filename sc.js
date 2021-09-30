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

})()