(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("main", [], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.main = mod.exports;
    }
})(this, function () {
    'use strict';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Message = function () {
        function Message(objet, corps, etat) {
            _classCallCheck(this, Message);

            this._objet = objet;
            this._corps = corps;
            this._etat = etat;
        }

        _createClass(Message, [{
            key: "toString",
            value: function toString() {
                return "Message : objet = " + this.objet + " corps = " + this.corps + " etat = " + this.etat;
            }
        }, {
            key: "objet",
            get: function get() {
                return this._objet;
            },
            set: function set(objet) {
                this._objet = objet;
            }
        }, {
            key: "corps",
            get: function get() {
                return this._corps;
            },
            set: function set(corps) {
                this._corps = corps;
            }
        }, {
            key: "etat",
            get: function get() {
                return this._etat;
            },
            set: function set(etat) {
                this._etat = etat;
            }
        }]);

        return Message;
    }();

    var MessageService = function () {
        function MessageService() {
            _classCallCheck(this, MessageService);
        }

        _createClass(MessageService, null, [{
            key: "edit",
            value: function edit(key, obj, crp, ete) {
                var m = prompt("Modifier le message ", obj);
                if (m && m.length > 0) {
                    var update = MessageService.buildEndPoint(key);
                    update.update({
                        objet: obj,
                        corps: crp,
                        etat: ete
                    });
                }
            }
        }, {
            key: "del",
            value: function del(key, obj) {
                var response = confirm("Supprimer le message \"" + obj + "\" dans la liste?");
                if (response == true) {
                    var deleteMessageRef = MessageService.buildEndPoint(key);
                    deleteMessageRef.remove();
                }
            }
        }, {
            key: "buildEndPoint",
            value: function buildEndPoint(key) {
                return new Firebase('https://messageries-51350.firebaseio.com/message/' + key);
            }
        }, {
            key: "lister",
            value: function lister(s) {
                var data = s.val();
                var list = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {

                        console.log("listerer2");
                        var message = new Message(data[key].objet ? data[key].objet : '', data[key].corps ? data[key].corps : '', data[key].etat ? data[key].etat : '');
                        list.push({
                            key: key,
                            corps: message.corps,
                            etat: message.etat,
                            objet: message.objet
                        });
                    }
                }

                var lis = '';
                for (var i = 0; i < list.length; i++) {
                    lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].etat + '</td><td> ' + list[i].objet + '</td><td> ' + list[i].corps + '</td><td> [' + MessageService.genLinks(list[i].key, list[i].objet) + ']</td></tr>';
                }
                document.getElementById('messages').innerHTML = lis;
            }
        }, {
            key: "genLinks",
            value: function genLinks(key, Name) {
                var links = '';

                links += '<a href="" id="del1"><img src="dist/images/delete.png"></a>';

                return links;
            }
        }, {
            key: "saveToList",
            value: function saveToList() {
                var objetMessage = document.getElementById('objet').value.trim();
                var corpsMessage = document.getElementById('message').value.trim();
                var etats = document.querySelectorAll('input[type=radio]:checked');
                var radioLength = etats.length;
                var etatchecked = void 0;
                for (var i = 0; i < radioLength; i++) {
                    etatchecked = etats[i].value;
                }
                if (objetMessage.length > 0 && corpsMessage.length > 0 && etatchecked.length > 0) {
                    MessageService.saveToFB(objetMessage, corpsMessage, etatchecked);
                }
                document.getElementById('objet').value = '';
                document.getElementById('message').value = '';
                document.querySelectorAll('input[type=radio]:checked').value = '';
                return false;
            }
        }, {
            key: "saveToFB",
            value: function saveToFB(objet, corps, etat) {
                var favMessages = new Firebase('https://messageries-51350.firebaseio.com/message');
                var message = new Message(objet, corps, etat);
                favMessages.push({
                    objet: message.objet,
                    corps: message.corps,
                    etat: message.etat
                });
            }
        }]);

        return MessageService;
    }();

    var favMovies = new Firebase('https://messageries-51350.firebaseio.com/message/');

    document.getElementById("valider").addEventListener('click', function () {
        MessageService.saveToList();
    });

    favMovies.on("value", function (snapshot) {
        MessageService.lister(snapshot);
    });
});