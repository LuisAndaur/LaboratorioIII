var xhttp = new XMLHttpRequest(); 
xhttp.open("GET", "http://localhost:5000/vehiculos",true);//Instancio el objeto
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {

        console.log(xhttp.responseText);
    }
        
}

xhttp.send();

// var req = new XMLHttpRequest();
// req.open('GET', 'http://www.mozilla.org/', true);
// req.onreadystatechange = function (aEvt) {
//   if (req.readyState == 4) {
//      if(req.status == 200)
//       dump(req.responseText);
//      else
//       dump("Error loading page\n");
//   }
// };
// req.send(null); 