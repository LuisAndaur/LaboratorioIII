//De string a JSON

let vec = [{"id":200,"nombre":"Juan","velMax":5000,"altMax":"200","cantTurb":"4"},{"id":"200","nombre":"Juan","velMax":"5000","cantPue":2 }];

let miArray = JSON.parse(vec);

//JSON.stringify(vec)

//miArray[0].hasOwnProperty("altMax");