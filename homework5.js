var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var wins = 0;
var loss = 0;

app.use(bodyParser.json());

app.get('/stats', function(req, res) {
    res.sendStatus(JSON.stringify({
        "wins": wins,
        "losses": loss
    }));
});

app.post('/flip', function(req, res) {
    var value = req.body.call;
    var rand_num = Math.floor((Math.random() * 2) + 1);
    var s_value = get_side(rand_num);

    if (value == s_value) {
        res.end(JSON.stringify({
            "result": "win"
        }));
        wins++;
    } else {
        res.end(JSON.stringify({
            "result": "loss"
        }));
        loss++;
    }
});
app.listen(8080, function() {
    console.log('App running on port 8080!');
});

function get_side(val) {
    if (val == 1) return "heads";
    else return "tails";

}
