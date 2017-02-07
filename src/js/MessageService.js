import {Message} from './Message'

export class MessageService{

    static edit(key, obj,crp,ete) {
        var m = prompt("Modifier le message ", obj);
        if (m && m.length > 0) {
            var update = MessageService.buildEndPoint(key);
            update.update({
                objet: obj,
                corps: crp,
                etat: ete,
            });
        }
    }

    static del(key, obj) {
        var response = confirm("Supprimer le message \"" + obj + "\" dans la liste?");
        if (response == true) {
            var deleteMessageRef = MessageService.buildEndPoint(key);
            deleteMessageRef.remove();
        }
    }
    static buildEndPoint (key) {
        return new Firebase('https://messageries-51350.firebaseio.com/message/' + key);
    }

    static lister(s){
        var data = s.val();
        var list = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {

                console.log("listerer2");
                let message  = new Message(data[key].objet ? data[key].objet : '',data[key].corps ? data[key].corps : '',data[key].etat ? data[key].etat : '');
                list.push({
                    key: key,
                    corps: message.corps,
                    etat: message.etat,
                    objet: message.objet
                })
            }
        }

        var lis = '';
        for (var i = 0; i < list.length; i++) {
            lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].etat +'</td><td> '+ list[i].objet +'</td><td> '+ list[i].corps + '</td><td> [' + MessageService.genLinks(list[i].key, list[i].objet) + ']</td></tr>';

        };
        document.getElementById('messages').innerHTML = lis;


    }

    static genLinks(key, Name) {
       //
         var links = '';
       // links += '<a href="edit(\'' + key + '\',\'' + mvName + '\')">Edit</a> | ';
       // links += '<a href="Ecmascript:MessageService.del(\'' + key + '\',\'' + mvName + '\')">Delete</a>';
       // links += '<a href="Ecmascript:'+MessageService.del(key,mvName)+'">Delete</a>';
         links += '<a href="" id="del1"><img src="dist/images/delete.png"></a>';

        return links;

    }


    static saveToList() {
        let objetMessage = document.getElementById('objet').value.trim();
        let corpsMessage = document.getElementById('message').value.trim();
        let etats=document.querySelectorAll('input[type=radio]:checked');
        let radioLength = etats.length;
        let etatchecked;
        for (let i = 0; i < radioLength; i++) {
            etatchecked= etats[i].value;
        }
        if (objetMessage.length > 0 && corpsMessage.length > 0 && etatchecked.length > 0) {
            MessageService.saveToFB(objetMessage,corpsMessage,etatchecked);
        }
        document.getElementById('objet').value = '';
        document.getElementById('message').value ='';
        document.querySelectorAll('input[type=radio]:checked').value = '';
        return false;
    //}
    }
    static saveToFB(objet,corps,etat) {
    // this will save data to Firebase
        let favMessages = new Firebase('https://messageries-51350.firebaseio.com/message');
        let message  = new Message(objet,corps,etat);
        favMessages.push({
            objet : message.objet,
            corps : message.corps,
            etat : message.etat
        });
    }
}