import { query } from "./db"
import { cautareDosare } from "./portal"
import MailJet from 'node-mailjet'

import {process} from "node"

const mailjet = new MailJet({
    apiKey: '4dcdbe6c6ff9a2b2c164f0d5213dc713',
    apiSecret: 'aed8073571934eaba3ee7881a3b4b99c'
})

function findDosare() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `dosare` WHERE 1";
        query(sql, [], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function convertDate(toBeConverted) {
    let gmtDate = typeof toBeConverted == "string" ? new Date(toBeConverted) : toBeConverted instanceof Date ? toBeConverted : null;

    let bucharestOptions = { timeZone: 'Europe/Bucharest', hour12: false };
    let year = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, year: 'numeric' });
    let month = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, month: '2-digit' });
    let day = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, day: '2-digit' });
    let hour = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, hour: '2-digit', hour12: false });
    let minute = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, minute: '2-digit' });
    let second = gmtDate.toLocaleString('en-GB', { ...bucharestOptions, second: '2-digit' });

    return `${year}-${month}-${day}T${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}:${('0' + second).slice(-2)}.000Z`;
}

async function sendEmail(user) {
    var basemodificate = "";
    user.dosareModificate.forEach(dosar => basemodificate = basemodificate + `- ${dosar.numar} de la ${dosar.institutie}\n`)

    var basesedinte = "";
    user.sedinteFound.forEach(sedinta => basesedinte = basesedinte + `- ${new Date(sedinta.data).toDateString()} la ora ${sedinta.ora} de la ${sedinta.institutie} pentru dosarul cu numarul ${sedinta.numar}\n`)

    const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                    "From": {
                        "Email": "fanejoacaceva@gmail.com",
                        "Name": "app"
                    },
                    "To": [
                        {
                            "Email": user.email,
                            "Name": user.name
                        }
                    ],
                    "Subject": `Schimbare in dosare`,
                    "TextPart": `Buna ziua, ${user.name},\n\nDorim sa te anuntam ca ${user.dosareModificate.length != 0 && user.sedinteFound.length == 0 ? `urmatoarele dosare au suferit modificari in aplicatia portal.just.ro:\n${basemodificate}` : user.dosareModificate.length == 0 && user.sedinteFound.length != 0 ? `urmatoarele sedinte urmeaza in 7 zile sau mai putin:\n${basesedinte}` : user.dosareModificate.length != 0 && user.sedinteFound.length != 0 ? `urmatoarele dosare au suferit modificari in aplicatia portal.just.ro:\n${basemodificate}\nDe asemenea, urmatoarele sedinte urmeaza in 7 zile sau mai putin:\n${basesedinte}` : ""} \nCu stima,\napp`,
                }
            ]
        })

    request
        .catch((err) => {
            console.log(err)
        })
}

function updateDosar(newDosar, dosarvechi) {
    return new Promise((resolve, reject) => {
        const sql =
            "UPDATE `dosare` SET `dosardata`=?,`lastsync`=?, `numardosar`=? WHERE `userid`=? AND `numardosar`=? AND `institutie`=?";
        const values = [JSON.stringify(newDosar), new Date(Date.now()), newDosar.numar, dosarvechi.userid, dosarvechi.numardosar, dosarvechi.institutie];
        query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

function updatelastcheckedsedinte(userid, dosarid) {
    return new Promise((resolve, reject) => {
        const sql =
            "UPDATE `dosare` SET `lastcheckedsedinte`=? WHERE `userid`=? AND `dosarid`=?";
        const values = [new Date(Date.now()), userid, dosarid];
        query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

function findUser(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `id`= ?";
        query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

async function handleChange(userid, newDosar, sendArr) {
    
    const user = await findUser(userid)
    if (user[0].emailmodificari) {
        let obj = sendArr.find(o => o.userid == userid);
        if (typeof obj == "undefined") sendArr.push({
            userid: userid,
            name: user[0].first + " " + user[0].last,
            email: user[0].email,
            dosareModificate: [newDosar],
            sedinteFound: [],
        });
        else {
            let index = sendArr.indexOf(obj);
            sendArr[index].dosareModificate.push(newDosar)
        }
    }
}

async function handleFoundSedinta(userid, numardosar, institutie, sedinta, sendArr) { 
    const user = await findUser(userid)
    if (user[0].emailsedinte) {
        let obj = sendArr.find(o => o.userid == userid);
        if (typeof obj == "undefined") sendArr.push({
            userid: userid,
            name: user[0].first + " " + user[0].last,
            email: user[0].email,
            dosareModificate: [],
            sedinteFound: [{...sedinta, numar: numardosar, institutie: institutie}],
        });
        else {
            let index = sendArr.indexOf(obj);
            sendArr[index].sedinteFound.push({...sedinta, numar: numardosar, institutie: institutie});
        }
    }
}

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function countElementsForKey(arrayOfObjects) {
    let count = 0;

    arrayOfObjects.forEach(o => {
        let obj = o.dosardata;
        if (typeof obj.sedinte != "undefined") {
            count += obj.sedinte.DosarSedinta.length;
        }
    });
  
    return count;
}

function millisecondsToDays(milliseconds) {
    const millisecondsInADay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    return milliseconds / millisecondsInADay;
}

async function toRun() {
    try {
        var sendArr = [];

        var dosare = await findDosare();
        console.log(`Fetched ${dosare.length} dosare`)

        dosare.forEach(dosar => {
            var jsonData = JSON.parse(dosar.dosardata);
            dosar.dosardata = jsonData
        });
        console.log(`Parsed string to JSON`)

        const chunks = chunkArray(dosare, 300);

        var index = 0;
        var changes = 0;
        console.log("Updating " + dosare.length + " dosare")
        for (const chunk of chunks) {
            var updatePromises = chunk.map(async dosar => {
                if (index > 0 && index % 300 == 0) await sleep(15 * 1000);
    
                const newDosar = await cautareDosare(dosar.numardosar, "", "", dosar.institutie);
    
                if (Number(new Date(dosar.dosardata.dataModificare.split("T")[0] + "T00:00:00.000Z")) != Number(new Date(newDosar[0].dataModificare.toISOString().split("T")[0] + "T00:00:00.000Z"))) {
                    await handleChange(dosar.userid, newDosar[0], sendArr)
                    changes++;
                }
    
                await updateDosar(newDosar[0], dosar)
    
                index++;
                process.stdout.write(`\r\t- Updated ${index}/${dosare.length}, ${changes} changes found`);
            })

            try {
                await Promise.all(updatePromises);
            } catch (error) {
                console.log(error);
            } 

            if (chunks.indexOf(chunk) !== chunks.length - 1) {
                console.log(`\n\tSleeping for ${15000 / 1000} seconds...`);
                await sleep(15000);
            }
        }
        console.log("\nUpdated " + index + " dosare at " + new Date(Date.now()).toLocaleString())

        dosare = await findDosare();
        dosare.forEach(dosar => {
            var jsonData = JSON.parse(dosar.dosardata);
            dosar.dosardata = jsonData
        });

        console.log(`Now checking ${countElementsForKey(dosare, "sedinte")} sedinte`);
        const dosarePromises = dosare.map(async dosar => {
            if (typeof dosar.dosardata.sedinte != "undefined") {
                const sedintePromises = dosar.dosardata.sedinte.DosarSedinta.map(async sedinta => {
                    const dataSedinta = Number(new Date(convertDate(sedinta.data).split('T')[0] + "T" + sedinta.ora + ":00.000"));
                    const dataAcum = Date.now();
                    const lastCheck = Number(new Date(dosar.lastcheckedsedinte));

                    if (dataSedinta > dataAcum && millisecondsToDays(dataSedinta - dataAcum) <= 7 && millisecondsToDays(dataSedinta - lastCheck) >= 7) {
                        await handleFoundSedinta(dosar.userid, dosar.numardosar, dosar.institutie, sedinta, sendArr);
                    }
                });

                try {
                    await Promise.all(sedintePromises);
                } catch (error) {
                    console.log(error);
                } 
            }
            await updatelastcheckedsedinte(dosar.userid, dosar.dosarid)
        })

        try {
            await Promise.all(dosarePromises);
        } catch (error) {
            console.log(error);
        } 

        console.log(sendArr)

        if (sendArr.length > 0) {
            var sendPromises = sendArr.map(async user => {
                await sendEmail(user)
            })
            try {
                await Promise.all(sendPromises)
            } catch (error) {
                console.log(error);
            }
        }
        console.log(`Sent ${sendArr.length} emails\n---`)
        
    } catch (error) {
        console.log(error)
    }
}

export default toRun;