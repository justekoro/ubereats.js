const ue = require('./index');
const Client = new ue();

const fs = require('fs');

Client.searchStores("tacos").then((r)=>{
    Client.getStoreMenu(r[0].uuid).then(menu => {
        console.log(menu)
    })
}).catch((e)=>{
    console.log(e);
})
