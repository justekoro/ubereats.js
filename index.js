const fetch = require('node-fetch');

module.exports = class {
    constructor(localCode = "fr") {
        this.local = localCode;
    }

    _search(q, cb) {
        if (!q || !cb) throw new SyntaxError("query or callback does not seem to be defined")
        fetch("https://www.ubereats.com/api/getSearchSuggestionsV1?localeCode="+this.local, {
            "headers": {
                "accept": "*/*",
                "accept-language": "fr-FR,fr;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": "x",
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"userQuery\":\""+q+"\",\"date\":\"\",\"startTime\":0,\"endTime\":0,\"useGeoFromIP\":true}",
            "method": "POST",
            "mode": "cors"
        }).then(r=>r.json()).then(j=>{
            const d = j.data;
            return cb(null,d);
        }).catch(e=>{return cb(e,null)});
    }

    searchStores(query) {
        return new Promise((resolve, reject) => {
            if (!query) return reject("query is not defined");
            this._search(query, (err, res) => {
                if (err) return reject(err);
                let da = [];
                for (let o of res) {
                    if (o.type == "store") {
                        da.push(o.store);
                    }
                }
                return resolve(da);
            });
        });
    }

    getStoreMenu(uuid) {
        return new Promise((resolve, reject) => {
            if (!uuid) return reject("query is not defined");
            fetch("https://www.ubereats.com/api/getStoreV1?localeCode=fr", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/json",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"baguette browser ou quoient\";v=\"78\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-csrf-token": "x",
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "{\"storeUuid\":\""+uuid+"\",\"sfNuggetCount\":33}",
                "method": "POST",
                "mode": "cors"
            }).then(r=>{r.json().then(j=>{

                let sections = j.data.sections;
                let allOBJ = [];

                for (let i of sections) {
                    let section = j.data.sectionEntitiesMap[i.uuid];
                    for(let ii in section)
                        allOBJ.push(section[ii]);
                }

                return resolve(allOBJ);
            })}).catch(e=>{
                return reject(e);
            })
        })
    }

}



