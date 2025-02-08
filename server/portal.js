import { createClient } from "soap";
import inst from "./models/inst.js";

const url = "http://portalquery.just.ro/Query.asmx?WSDL";

class Portal {
    static institutie = inst

    static cautareDosare(nrDosar, obDosar, nParte, inst, dataInit, dataEnd, ultimaModificareStart, ultimaModificareStop) {
        return new Promise((resolve, reject) => {
            var args = {
                numarDosar: nrDosar || "",
                obiectDosar: obDosar || "",
                numeParte: nParte || "",
            };

            if (typeof inst != "undefined") args = {...args, institutie: inst};
            if (typeof dataInit != "undefined") args = {...args, dataStart: dataInit};
            if (typeof dataEnd != "undefined") args = {...args, dataStop: dataEnd};
            if (typeof ultimaModificareStart != "undefined") args = {...args, dataUltimaModificareStart: ultimaModificareStart};
            if (typeof ultimaModificareStop != "undefined") args = {...args, dataUltimaModificareStop: ultimaModificareStop};

            createClient(url, function(err, client) {
                if (err) reject(err);
                
                client.CautareDosare2(args, function(err, result) {
                    if (err) reject(err);
                    else {
                        try {
                            const dosarArr = result.CautareDosare2Result.Dosar;
                            for (let index = 0; index < dosarArr.length; index++) {
                                dosarArr[index] = { ...dosarArr[index], dataModificare: new Date(dosarArr[index].dataModificare) };
                            }
                            resolve(dosarArr);
                        } catch (error) {
                            reject({message: "noResult: " + error});
                        }
                    }
                });
            });
        });
    }

    static cautareSedinte(dataSedinta, institutie) {
        return new Promise ((resolve, reject) => {
            var args = {
                dataSedinta: dataSedinta,
                institutie: institutie,
            };

            createClient(url, function(err, client) {
                if (err) reject(err);

                client.CautareSedinte(args, function(err, result) {
                    if (err) reject(err);
                    else {
                        try {
                            const sedinteArr = result.CautareSedinteResult.Sedinta;
                            resolve(sedinteArr);
                        } catch (error) {
                            reject({message: "noResult: " + error});
                        }
                    }
                });
            });
        });
    }
}

export default Portal