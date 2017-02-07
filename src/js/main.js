import {MessageService} from './MessageService'

var favMovies = new Firebase('https://messageries-51350.firebaseio.com/message/');

document.getElementById("valider").addEventListener('click',function () {
    MessageService.saveToList();
});

favMovies.on("value", function(snapshot) {
    MessageService.lister(snapshot);
});
