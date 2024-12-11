const soap = require("soap")
const url = "http://portalquery.just.ro/Query.asmx?WSDL"
const inst = require("./models/inst")
const fs = require('node:fs');
const { isTypedArray } = require("node:util/types");

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

class Portal {
    static institutie = inst

    static cautareDosare(nrDosar, obDosar, nParte, inst, dataInit, dataEnd, ultimaModificareStart, ultimaModificareStop) {
        return new Promise((resolve, reject) => {
            const obligatoryArgs = [nrDosar, obDosar, nParte];
            for (let i = 0; i < obligatoryArgs.length; i++) {
                if (typeof obligatoryArgs[i] == "undefined") i == 0 ? nrDosar = "" : i == 1 ? obDosar = "" : i == 2 ? nParte = "" : reject("ERR: Out of bounds")
            }

            var args = {
                numarDosar: nrDosar,
                obiectDosar: obDosar,
                numeParte: nParte,
            }

            if (typeof inst != "undefined") args = {...args, institutie: inst}
            if (typeof dataInit != "undefined") args = {...args, dataStart: dataInit}
            if (typeof dataEnd != "undefined") args = {...args, dataStop: dataEnd}
            if (typeof ultimaModificareStart != "undefined") args = {...args, dataUltimaModificareStart: ultimaModificareStart}
            if (typeof ultimaModificareStop != "undefined") args = {...args, dataUltimaModificareStop: ultimaModificareStop}

            soap.createClient(url, function(err, client) {
                if (err) reject(err)
                
                client.CautareDosare2(args, function(err, result) {
                    if (err) reject(err)
                    else {
                        try {
                            const dosarArr = result.CautareDosare2Result.Dosar;
                            for (let index = 0; index < dosarArr.length; index++) {
                                dosarArr[index] = { ...dosarArr[index], dataModificare: new Date(dosarArr[index].dataModificare) }
                            }
                            resolve(dosarArr)
                        } catch (error) {
                            reject({message: "noResult"})
                        }
                    }
                }) 
            })
        })
    }

    static cautareSedinte(dataSedinta, institutie) {
        return new Promise ((resolve, reject) => {
            var args = {
                dataSedinta: dataSedinta,
                institutie: institutie,
            }

            soap.createClient(url, function(err, client) {
                if (err) reject(err);

                client.CautareSedinte(args, function(err, result) {
                    if (err) reject(err);
                    else {
                        try {
                            const sedinteArr = result.CautareSedinteResult.Sedinta;
                            resolve(sedinteArr)
                        } catch (error) {
                            reject({message: "noResult"})
                        }
                    }
                })
            })
        })
    }
}

// Portal.CautareSedinte("2024-08-08T00:00:00.000Z", "JudecatoriaSECTORUL4BUCURESTI").then(result => {
//     fs.writeFileSync('./data.json', JSON.stringify(result, null, 2) , 'utf-8');
//     // var file = fs.createWriteStream('array.txt');
//     // file.on('error', function(err) { /* error handling */ });
//     // result.forEach(function(v) { file.write(v); });
//     // file.end();
// }).catch(err => console.log(err))
// Portal.cautareDosare("", "", 'SPITALUL CLINIC DE URGENŢĂ BUCURESTI ALBU EMANUEL').then(result => console.log(result)).catch(err => console.log(err))

// Portal.cautareDosare("25512/4/2022", "", "").then(result => console.log(result))

module.exports = Portal