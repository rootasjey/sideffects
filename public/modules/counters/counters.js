
var _players = ["Coffe Script", "JQuery", "Mysqli", "Mysqlii"];

window.onload = function () {
    // Add players to the table
    pushPlayers(_players);

    // Events
    clickPlusOne();
    clickMinusOne();
    clickSave();
    clickPayed();
    clickSaveTaxes();
}

// Add players to the table
function pushPlayers(players) {
    for (var i = 0; i < players.length; i++) {

        // Contains player's values
        var player = [];

        // Push initial values
        player.push(players[i]);
        player.push(0);
        player.push("1000K");
        player.push(0);
        player.push("+");
        player.push("-");

        // Contains data types for the player array
        var dataTypes = [];

        // Values match these types
        dataTypes.push("name");
        dataTypes.push("points");
        dataTypes.push("taxes");
        dataTypes.push("total");
        dataTypes.push("plus");
        dataTypes.push("minus");

        // Add elements to the DOM
        addRow(player, dataTypes);
        addCard(player, dataTypes);
    }
}

// Add a row to the table
function addRow(player, dataTypes) {
    var tableBody = $("#counters tbody");
    var tr = $("<tr>");

    for (var i = 0; i < player.length; i++) {
        var col = $("<td>", {
            html: player[i],
            'data-type': dataTypes[i]
        });

        col.appendTo(tr);
        tr.attr(dataTypes[i], player[i]);
    }
    tr.appendTo(tableBody);
}

// Add +1 to the points counter
function clickPlusOne() {
    $("td[data-type='plus']").click(function () {
        var tr = this.parentNode;
        var children = tr.childNodes;
        var points = children[1];

        points.innerHTML = parseInt(points.innerHTML) + 1;
        refresh(children);
    });
}

// Remove +1 to the points counter
function clickMinusOne() {
    $("td[data-type='minus']").click(function () {
        var tr = this.parentNode;
        var children = tr.childNodes;
        var points = children[1];

        points.innerHTML = parseInt(points.innerHTML) - 1;
        refresh(children);
    });
}

// Refresh the table
function refresh(children) {
    total(children);
}

// Calculate the total amount of fees
function total(children) {
    var points = children[1];
    var taxes = children[2];
    var total = children[3];

    total.innerHTML = points.innerHTML * parseInt(taxes.innerHTML);
}

// Add a player's card to the page
function addCard(player, dataTypes) {
    var card = $('<div>', {
        class       : 'card',
        "player"    : player[0]
    });

    var player = $('<span>', {
        class: 'title',
        html: player[0]
    })
    var due = $('<div>', {
        class: 'due',
        html: "due : <span class='amount'>0</span>",
    });
    var payedButton = $("<div>", {
        class: 'payed-button',
        html: 'payed?'
    });

    card.append(player).append(due).append(payedButton);
    $(".center-content").append(card);
}

//  Click Event on the save button
// - Save the valu to the player's card
function clickSave() {
    $(".save").click(function () {
        $("#counters tbody tr").each(function () {
            updateCard(this);
        });
    });
}

// Update the card with the updated values
function updateCard(player) {
    // The playe's name
    var name = player.getAttribute("name");

    // The card element
    var card = $(".card[player='"+ name +"']");

    // The table row containing all the informations needed
    var row = $("tr[name='" + name + "']");

    // The total amount
    var total = row.find("td[data-type='total']").html();

    // Update the value
    var newTotal = parseInt(card.find(".amount").html()) + parseInt(total);
    card.find(".amount").html(newTotal);

    // Reset the player's points
    clearValues(name);
}

// Clear the points values in the counters table
function clearValues(name) {
    $("#counters tr[name='" + name + "'] td[data-type='points']").html(0);
    $("#counters tr[name='" + name + "'] td[data-type='total']").html(0);
}

// Clear the fees for a player
function clickPayed() {
    $(".payed-button").click(function () {
        var parent = this.parentNode;
        var name = parent.getAttribute("player");

        $(".card[player='"+ name +"']").find(".amount").html(0);
        // console.log(parent);
    });
}

// Update new taxes
function clickSaveTaxes() {
    $(".save-taxes").click(function () {
        // Get the default taxes element
        var taxes = $("#taxes-table input[data-type='taxes']");

        // Get the value
        taxes = taxes.val();
        taxes = parseInt(taxes);

        // Put the updated value in the taxes-table
        $("#taxes-table .taxes-value").html(taxes);

        // // Put the updated value in the counters table
        $("#counters td[data-type='taxes']").html(taxes + "K");
    });
}
