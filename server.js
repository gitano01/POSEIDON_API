let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg  = require ('pg');
const PORT = 3000;

let pool = new pg.Pool({

    user:'postgres',
    database: 'School',
    password:'postgres',
    host: 'localhost',
    port:5432,
    max:10

});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(request,response,next){

    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Direcciones de ENDPOINTS DEL API PARA POSEIDON


app.post('/api/users/new', function(request,response){

    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;

    var dateTimeToday = new Date();
    var today =new Date(dateTimeToday.getFullYear(),
        (dateTimeToday.getMonth() + 1),
        dateTimeToday.getDate(),
        dateTimeToday.getHours(),
        dateTimeToday.getMinutes(),
        dateTimeToday.getSeconds())


    pool.connect((err, db, done) => {

        if (err) {
            return response.status(400).send(err);
        } else {


            db.query('INSERT INTO users (username,password,email,created_at) VALUES ($1,$2,$3,$4)', [username,password, email ,today], (err, table) => {

                done();

                if (err) {
                    return console.log(err);
                } else {
                    console.log("SUCCESSFULLY");
                    response.status(200).send({message:'El usuario ha sido creado con éxito'});
                    db.end();

                }
            })

        }
    })





});

app.listen(PORT,() => console.log('Listening on Port' + PORT));
