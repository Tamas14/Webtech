var slideShowId;
var alertBoxState;

const engMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const hunMonths = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
const countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and The Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe",];

/*
 *  LOADER FUNCTIONS
 */

function loadManufacturers() {
    let array = [];
    $.getJSON("cars", (data) => {
        array = data;
    }).done(() => {
        $.getJSON("manufacturers", (data) => {
            let table = $('<table id="authorsTable"></table>');
            $(table).append('<tr><th>Márkanév</th><th>Származás</th><th>Alapítás éve</th><th>Modellek száma</th></tr>');

            $.each(data, (key, value) => {
                let row = $("<tr></tr>");
                let name = $("<td class='manufacturerName' onclick=\"getCars(" + "'" + value.name + "'" + ")\">" + value.name + "</td>");
                let country = $("<td>" + value.country + "</td>");
                let date = $("<td>" + formatDate(dateParser(value.founded), "HUN") + "</td>");
                let count = 0;

                $.each(array, (k, v) => {
                    if (v.manufacturer === value.name) {
                        count += 1;
                    }
                });

                let countData = $("<td>" + count + " db</td>")

                $(row).append(name);
                $(row).append(country);
                $(row).append(date);
                $(row).append(countData);
                $(table).append(row);
            });

            $("#content").append(table);
        }).fail(() => {
            showAlertBox("Hiba történt az adatbázis betöltése során!", true, true);
        });
    });
}

function loadCars() {
    let array = [];
        $.getJSON("cars", (data) => {
            let table = $('<table id="authorsTable"></table>');
            $(table).append('<tr><th>Típus</th><th>Fogyasztás</th><th>Szín</th><th>Márkanév</th><th>Elérhető</th><th>Évjárat</th><th>Lóerő</th></tr>');



            $.each(data, (key, value) => {
                let row = $("<tr></tr>");
                let name = $("<td>" + value.name + "</td>");
                let consumption = $("<td>" + value.consumption + "</td>");
                let color = $("<td>" + value.color + "</td>");
                let manufacturer = $("<td>" + value.manufacturer + "</td>");
                let available = $("<td>" + value.available + "</td>");
                let year = $("<td>" + value.year + "</td>");
                let horsepower = $("<td>" + value.horsepower + "</td>");

                $(row).append(name);
                $(row).append(consumption);
                $(row).append(color);
                $(row).append(manufacturer);
                $(row).append(available);
                $(row).append(year);
                $(row).append(horsepower);

                $(table).append(row);
            });

            $("#content").append(table);
        }).fail(() => {
            showAlertBox("Hiba történt az adatbázis betöltése során!", true, true);
        });
}

function getCars(manu) {
    document.cookie = "name=" + manu;

    if (alertBoxState === "active")
        destroyAlertBox();

    $.getJSON("manufacturer", (data) => {
        if (data.length < 1) {
            showAlertBox("A kiválasztott márkához nem található autó az adatbázisban!", true, false);
            return;
        }
        let table = $('<table id="carsTable"></table>');
        $(table).append('<tr><th>Típus</th><th>Fogyasztás</th><th>Szín</th><th>Márkanév</th><th>Elérhető</th><th>Évjárat</th><th>Lóerő</th></tr>');

        $.each(data, (key, value) => {
            let row = $("<tr></tr>");
            let name = $("<td>" + value.name + "</td>");
            let consumption = $("<td>" + value.consumption + "</td>");
            let color = $("<td>" + value.color + "</td>");
            let manufacturer = $("<td>" + value.manufacturer + "</td>");
            let available = $("<td>" + value.available + "</td>");
            let year = $("<td>" + value.year + "</td>");
            let horsepower = $("<td>" + value.horsepower + "</td>");

            $(row).append(name);
            $(row).append(consumption);
            $(row).append(color);
            $(row).append(manufacturer);
            $(row).append(available);
            $(row).append(year);
            $(row).append(horsepower);

            $(table).append(row);
        });
        $("#content").fadeOut("fast", () => {
            $("#pageTitle").text(manu + " autók");
            $("#content").html(table).fadeIn("fast");
        });
    }).fail(() => {
        showAlertBox("Hiba történt az adatbázis betöltése során!", true, true);
    });
}

/*
 * FORM FUNCTIONS
 */

function manufacturerHandler() {
    let manufacturers = [];
    $.getJSON("manufacturers", (data) => {
        $.each((data), (k, v) => {
            manufacturers.push(v.name);
        });
    });

    $("#manufacturerForm").submit((e) => {
        e.preventDefault();
        let form = $("#manufacturerForm"),
            name = form.find("input[name='name']").val(),
            country = form.find("input[name='country']").val(),
            date = form.find("input[name='founded']").val(),
            url = form.attr("action");

        if (manufacturers.includes(name)) {
            showAlertBox("Már létező gyártó!", true, false);
        } else if (!countries.includes(country)) {
            showAlertBox("Nem ismert ország!", true, false);
        } else if (new Date(date) > new Date()) {
            showAlertBox("A dátum nem lehet a jövőből!", true, false);
        } else {
            $.post(url, {
                name: name,
                country: country,
                founded: formatDate(new Date(date), "ENG")
            }).done(() => {
                showAlertBox("Sikeres rögzítés!", false, false);
                manufacturers.push(name);
                $("#manufacturerForm").trigger("reset");
            }).fail(() => {
                showAlertBox("Nem sikerült a szerverrel a kommunikáció! Próbáld újra később!", true, true);
            });
        }
    });

    countries.forEach((x) => {
        $("datalist#countries").append("<option value=\"" + x + "\"></option>");
    });
}

function carHandler() {
    $("#year").attr("max", new Date().getFullYear());

    let cars = [];
    $.getJSON("cars", (data) => {
        $.each((data), (k, v) => {
            cars.push(v.name);
        });
    });

    $("#carForm").submit((e) => {
            e.preventDefault();
            let form = $("#carForm"),
                name = form.find("input[name='name']").val(),
                consumption = form.find("input[name='consumption']").val() + "l/100km",
                color = form.find("input[name='color']").val(),
                manufacturer = form.find("input[name='manufacturer']").val(),
                available = form.find("input[name='available']").val(),
                year = form.find("input[name='year']").val(),
                horsepower = form.find("input[name='horsepower']").val(),
                url = form.attr("action");

            let err = false;
            let found = false;
            if (cars.includes(name)) {
                showAlertBox("Már létező autó!", true, false);
            } else {
                $.getJSON("manufacturers", (data) => {
                    $.each((data), (k, v) => {
                        if (v.name === manufacturer) {
                            found = true;

                            if (dateParser(v.founded).getFullYear() > year) {
                                showAlertBox("A gyártási év nem lehet kisebb, mint az alapítás éve!", true, false);
                                err = true;
                            }
                        }
                    });
                }).done(() => {
                    if (!found) {
                        err = true;
                        showAlertBox("Nem található a megadott gyártó!", true, false);
                    }

                    if (err)
                        return;
                    $.post(url, {
                        name: name,
                        consumption: consumption,
                        color: color,
                        manufacturer: manufacturer,
                        available: available,
                        year: year,
                        horsepower: horsepower
                    }).done(() => {
                        showAlertBox("Sikeres rögzítés!", false, false);
                        $("#carForm").trigger("reset");
                        cars.push(name);
                    }).fail(() => {
                        showAlertBox("Nem sikerült a szerverrel a kommunikáció! Próbáld újra később!", true, true);
                    });
                });
            }
        }
    );

    $.getJSON("manufacturers", (data) => {
        $.each(data, (k, v) => {
            $("datalist#manufacturers").append("<option value=\"" + v.name + "\"></option>")
        });
    }).fail(() => {
        showAlertBox("Hiba történt az adatbázis betöltése során!", true, true);
    });
}

/*
 * HELPER FUNCTIONS
 */

function dateParser(date) {
    let lastCharOfMonth = date.indexOf(" ");
    let commaIndex = date.indexOf(",");

    let month = engMonths.indexOf(date.slice(0, lastCharOfMonth));
    let day = date.slice(lastCharOfMonth + 1, commaIndex);

    let year = date.slice(commaIndex + 2, date.length);

    return new Date(year, month, day);
}

function formatDate(date, target) {
    switch (target) {
        case "HUN":
            let day = date.getDate();
            return date.getFullYear() + " " + hunMonths[date.getMonth()] + " " + (day < 10 ? "0" + day : day) + ".";
            break;
        case "ENG":
            return engMonths[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            break;
    }
}

function getStatistics() {
    let cars = [];
    let manufacturers = [];
    let carCount = 0;
    let carTypeCount = [];

    $.getJSON("/cars", (data) => {
        cars = data;
    }).done(() => {
        $.getJSON("manufacturers", (data) => {
            $.each(data, (k, v) => {
                if (!manufacturers.includes(v.name)) {
                    manufacturers.push(v.name);
                }
            });
        }).done(() => {
            $.each(cars, (k, v) => {
                carCount += Number(v.available);

                if (!carTypeCount.includes(v.name)) {
                    carTypeCount.push(v.name);
                }
            });

            let table = $('<table id="statisticsTable"></table>');
            let row = $("<tr></tr>");

            let carCountCell = $("<td>Elérhető autók száma: " + carCount + "</td>");
            let manuCountCell = $("<td>Gyártók száma: " + manufacturers.length + "</td>");
            let carTypeCountCell = $("<td>Autó típusok száma: " + carTypeCount.length + "</td>");

            $(row).append(carCountCell);
            $(row).append(manuCountCell);
            $(row).append(carTypeCountCell);

            $(table).append(row);
            $("#statistics").append(table);
        });
    });
}

function showAlertBox(text, isError, redirect) {
    if (alertBoxState === "active")
        return null;

    alertBoxState = "active";

    isError ? $("#alertBox").css("color", "#cf5a5a") : $("#alertBox").css("color", "#43d849");

    $("#alertBox p").text(text);
    $("#alertBox").animate({
        top: "15%"
    }, 1000, () => {
        $("#alertBox").delay(2000).fadeOut(500, () => {
            if (redirect) location.reload();
            destroyAlertBox();
        });
    });
}

function destroyAlertBox() {
    $("#alertBox").css("top", "-200px").show();
    alertBoxState = "deactive";
}

/*
 * MAIN
 */

$(document).ready(() => {
    let firstPage = "home.html";
    $("#content").load(firstPage);

    $(".menuButton").click(function (e) {
        e.preventDefault();
        let button = $(this);

        if (button.attr("id") === "disabled" || button.data("pagename") === $("li#pageTitle").text()) {
            return;
        }

        button.attr("id", "disabled");
        clearInterval(slideShowId);

        if (alertBoxState === "active")
            destroyAlertBox();

        $("#content").fadeOut("fast", function () {
            let data = button.data("pagename");
            let link = button.attr("href");
            $("#content").load(link, function () {
                $("li#pageTitle").text(data);
                $("#content").fadeIn("fast");

                button.attr("id", null);
            });
        });
    });
});

function slideShow() {
    slideShowId = setInterval(function () {
        $('#slideshow div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 4000);
}

document.addEventListener("visibilitychange", () => {
    clearInterval(slideShowId);
    slideShow();
}, false);