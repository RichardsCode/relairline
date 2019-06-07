


// method to make returning date visible if round trip is choosen
function csv() {
    document.getElementById("rdc").style.visibility = "visible";
}

// method to hide returning date if One-way is choosen
function csh() {
    document.getElementById("rdc").style.visibility = "hidden";
}
//set the date pickers to current date
document.querySelector("#departing_date").valueAsDate = new Date();
document.querySelector("#returning_date").valueAsDate = new Date();

// method for city airport auto complete for the from / to inputs
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var airPorts = ["Anchorage, AK (ANC-Anchorage Intl.)", "Atlanta, GA (ATL-Hartsfield Intl.)",
    "Austin, TX (AUS-Austin/Bergstrom Intl.)", "Billings, MT (BIL-Logan Intl.)",
    "Boise, ID (BOI-Boise Air Terminal)", "Boston, MA (BOS-Logan Intl.)",
    "Charlotte, NC (CLT-Douglas Intl.)", "Dallas, TX (DAL-Love Field)",
    "Denver, CO (DEN-Denver Intl.)", "Honolulu, HI (HNL-Honolulu Intl.)",
    "Houston, TX (HOU-Houston Hobby)", "Indianapolis, IN (IND-Indianapolis Intl.)",
    "Juneau, AK (JNU-Juneau Intl.)", "Las Vegas, NV (LAS-McCarran Intl.)",
    "Nashville, TN (BNA-Nashville Intl.)", "New York, NY (JFK-Kennedy)",
    "Oakland, CA (OAK-Oakland Intl.)", "Philadelphia, PA (PHL-Philadelphia Intl.)",
    "Phoenix, AZ (PHX-Sky Harbor Intl.)", "San Francisco, CA (SFO-San Francisco Intl.)",
    "Salt Lake City, UT (SLC-Salt Lake City Intl.)", "Seattle, WA (SEA-Seattle/Tacoma Intl.)",
    "Spokane, WA (GEG-Spokane Intl.)", "Springfield, IL (SPI-Capital)",
    "Springfield, MO (SGF-Springfield Branson Regional)", "Tampa, FL (TPA-Tampa Intl.)",
    "Walla Walla, WA (ALW-Walla Walla Regional)", "Washington, DC (DCA-Reagan National)"];

autocomplete(document.getElementById("flightfrom"), airPorts);
autocomplete(document.getElementById("flightto"), airPorts);

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function chkSignIn() {
    showflights();
    /*
    var welcomeName = localStorage.getItem("userName");
    if (welcomeName) {
        showflights();
    } else {
        alert("Please sign in to purchase a flight.");
        window.location.assign("log_in.html");
    }
    */
}


function showflights() {

    var flighttype = document.querySelector('input[name="radio"]:checked').value;
    var departingfrom = document.getElementById("flightfrom").value;
    var landingin = document.getElementById("flightto").value;
    var adultpassangers = document.getElementById("adultpassanger").value;
    var childpassangers = document.getElementById("childrenpassanger").value;
    var departdate = document.getElementById("departing_date").value;
    var returndate = document.getElementById("returning_date").value;

	/*
	alert("value is " + flighttype + " departing from " + departingfrom + " landing in " + landingin + 
		  " passangers adults: " + adultpassangers + " children: " + childpassangers + " " + departdate + " " + returndate);
	*/

    if (departingfrom === "") {
        alert("Please pick a departing city Airport!")
        document.getElementById("flightfrom_lbl").style.color = "red";
    }
    else if (landingin === "") {
        alert("Please pick a destination city Airport!")
        document.getElementById("flightto_lbl").style.color = "red";
    }
    else {
        sfbox(flighttype, departingfrom, landingin, departdate, returndate, adultpassangers, childpassangers);

        document.getElementById("flightfrom_lbl").style.color = "black";
        document.getElementById("flightto_lbl").style.color = "black";
    }
}



var flightinfoarray;

function sfbox(flighttype, departingfrom, landingin, departdate, returndate, adultpassangers, childpassangers) {

    var ssprice = seatpricereg(adultpassangers, childpassangers);
    var fcprice = firstclassseatprice(adultpassangers, childpassangers);

    flightinfoarray = [flighttype, departingfrom, landingin, departdate, returndate, adultpassangers, childpassangers, ssprice, fcprice];

    document.getElementById("displayflights").innerHTML = "";
    var display = document.getElementById("displayflights");

    var tableElem = document.createElement("table");
    tableElem.setAttribute('class', 'table table-bordered table-responsive');

    var row1 = document.createElement("tr");
    row1.setAttribute("style", "background-color: #e6ffff;")
    var row2 = document.createElement("tr");
    var row3 = document.createElement("tr");

    var headcell1 = document.createElement("th");
    var headcell2 = document.createElement("th");
    var headcell3 = document.createElement("th");
    var headcell4 = document.createElement("th");
    var headcell5 = document.createElement("th");
    var headcell6 = document.createElement("th");
    headcell6.setAttribute('class', 'pricecell');
    var headcell7 = document.createElement("th");
    headcell7.setAttribute('class', 'pricecell');

    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");
    var cell6 = document.createElement("td");
    cell6.setAttribute('class', 'pricecell');
    var cell7 = document.createElement("td");
    cell7.setAttribute('class', 'pricecell');

    var brelem1 = document.createElement("br");
    var brelem2 = document.createElement("br");
    var brelem3 = document.createElement("br");
    var brelem4 = document.createElement("br");
    var brelem5 = document.createElement("br");
    var brelem6 = document.createElement("br");

    var tnhead1 = document.createTextNode("Departing");
    var tnhead2 = document.createTextNode("Ariving");
    var tnhead3 = document.createTextNode("Date");
    var tnhead4 = document.createTextNode("Type");
    var tnhead5 = document.createTextNode("Seats");
    var tnhead6 = document.createTextNode("Main Seat");
    var tnhead7 = document.createTextNode("First Class");

    var departtd = document.createTextNode(departingfrom);
    var arivingtd = document.createTextNode(landingin);
    var rtdeparttn = document.createTextNode(landingin);
    var rtarivingtn = document.createTextNode(departingfrom);
    var datetd = document.createTextNode(departdate);
    var rdatetd = document.createTextNode(returndate);
    var pasngrtd = document.createTextNode("Adult: " + adultpassangers);
    var chpasngrtd = document.createTextNode("Child: " + childpassangers);
    var typetd = document.createTextNode(flighttype);
    var redprice = document.createTextNode("$" + ssprice);
    var firstclassprice = document.createTextNode("$" + fcprice);

    var radiobtn1 = document.createElement("input");
    radiobtn1.setAttribute('type', 'radio');
    radiobtn1.setAttribute('name', 'selflt');
    radiobtn1.setAttribute('checked', 'checked');
    radiobtn1.setAttribute('value', 'standard');

    var radiobtn2 = document.createElement("input");
    radiobtn2.setAttribute('type', 'radio');
    radiobtn2.setAttribute('name', 'selflt');
    radiobtn2.setAttribute('value', 'firstClass');

    headcell1.appendChild(tnhead1);
    headcell2.appendChild(tnhead2);
    headcell3.appendChild(tnhead3);
    headcell4.appendChild(tnhead4);
    headcell5.appendChild(tnhead5);
    headcell6.appendChild(tnhead6);
    headcell7.appendChild(tnhead7);

    cell1.appendChild(departtd);
    cell2.appendChild(arivingtd);
    cell3.appendChild(datetd);
    cell4.appendChild(typetd);
    cell5.appendChild(pasngrtd);
    cell5.appendChild(brelem1);
    cell5.appendChild(chpasngrtd);

    cell6.appendChild(redprice);
    cell6.appendChild(brelem2);
    cell6.appendChild(radiobtn1);

    cell7.appendChild(firstclassprice);
    cell7.appendChild(brelem3);
    cell7.appendChild(radiobtn2);

    if (flighttype === "round-trip") {
        cell1.appendChild(brelem4);
        cell1.appendChild(rtdeparttn);
        cell2.appendChild(brelem5);
        cell2.appendChild(rtarivingtn);
        cell3.appendChild(brelem6);
        cell3.appendChild(rdatetd);
    }

    row1.appendChild(headcell1);
    row1.appendChild(headcell2);
    row1.appendChild(headcell3);
    row1.appendChild(headcell4);
    row1.appendChild(headcell5);
    row1.appendChild(headcell6);
    row1.appendChild(headcell7);

    row2.appendChild(cell1);
    row2.appendChild(cell2);
    row2.appendChild(cell3);
    row2.appendChild(cell4);
    row2.appendChild(cell5);
    row2.appendChild(cell6);
    row2.appendChild(cell7);

    row3.appendChild(cell1);
    row3.appendChild(cell2);
    row3.appendChild(cell3);
    row3.appendChild(cell4);
    row3.appendChild(cell5);
    row3.appendChild(cell6);
    row3.appendChild(cell7);

    tableElem.appendChild(row1);
    tableElem.appendChild(row2);
    tableElem.appendChild(row3);

    display.appendChild(tableElem);

    var divcheckout = document.createElement("div");
    divcheckout.setAttribute('class', 'checkoutdiv');
    divcheckout.setAttribute("id", "choutdiv");

    var btnCheckOut = document.createElement("button");
    btnCheckOut.setAttribute('id', 'chkoutbtn');
    btnCheckOut.setAttribute("class", "col-6 bg-success text-light mb-3");
    btnCheckOut.setAttribute("data-toggle", "modal");
    btnCheckOut.setAttribute("data-target", "#flight_recipt_modal")
    btnCheckOut.innerHTML = "Checkout";
    btnCheckOut.setAttribute('onclick', 'populate_reipt()');

    var btnClear = document.createElement("button");
    btnClear.setAttribute('id', 'clearbtn');
    btnClear.setAttribute("class", "col-6 bg-success text-light mb-3")
    btnClear.innerHTML = "Clear/Reset Form";
    btnClear.setAttribute('onclick', 'window.location.reload()');

    divcheckout.appendChild(btnClear);
    divcheckout.appendChild(btnCheckOut);
    display.appendChild(divcheckout);

}

function populate_reipt() {
    document.getElementById("invoiceNumber").innerHTML = "Invoice # " + getRandom(15999).toString();
    document.getElementById("li1").innerHTML = "&nbsp;" + flightinfoarray[5];
    document.getElementById("li2").innerHTML = "&nbsp;" + flightinfoarray[6];
    document.getElementById("li3").innerHTML = "&nbsp;" + flightinfoarray[0];
    document.getElementById("li4").innerHTML = "&nbsp;" + flightinfoarray[1] + " on " + flightinfoarray[3];
    document.getElementById("li5").innerHTML = "&nbsp;" + flightinfoarray[2];
    if (flightinfoarray[0] === "round-trip") {
        document.getElementById("returningTrip_recipt").innerHTML = "&nbsp;";
        document.getElementById("li7").innerHTML = flightinfoarray[2];
        document.getElementById("li6").innerHTML = flightinfoarray[1] + " on " + flightinfoarray[4];
    }

    var flightClassType = document.querySelector('input[name="selflt"]:checked').value;
    if (flightClassType === "firstClass") {
        document.getElementById("li8").innerHTML = "$" + flightinfoarray[8];
    }
    else {
        document.getElementById("li8").innerHTML = "$" + flightinfoarray[7];
    }

}

// method to get random price for standard seat
function seatpricereg(numpassanger, childpassangers) {
    var totalpass = parseInt(numpassanger) + parseInt(childpassangers);
    //alert(totalpass);
    var randomprice = (getRandom(100) + 150) * totalpass;
    return randomprice;
}

// method to get random price for first class
function firstclassseatprice(numpassanger, childpassangers) {
    var totalpass = parseInt(numpassanger) + parseInt(childpassangers);
    //alert(totalpass);
    var randomprice = (getRandom(100) + 300) * totalpass;
    return randomprice;
}

// helper method random with max input variable
function getRandom(max) {
    var r = Math.floor(Math.random() * max);
    return r;
}




var modal = document.getElementById('flight_recipt_modal');
var span = document.getElementsByClassName("close")[0];

function checkout_recipt() {
    modal.style.display = "block";
    populate_reipt();
}

function displayform() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
    location.reload();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        location.reload();
    }
}














