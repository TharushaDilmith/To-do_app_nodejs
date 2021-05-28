var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to the mongodb atlas database
var mongoString ='mongodb+srv://Tharusha:test@cluster0.yjfdi.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(mongoString,{useNewUrlParser:true});

//create a schema
var todoSchema = new mongoose.Schema({
    item : String
});

//create a model
var Todo = mongoose.model('todo',todoSchema);

//add a item to database
// var itemone = Todo({item:'Play pubg'}).save(function (err) {

//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("Data saved");
//     }
    
// });


//var data = [{item:"Watching cricket"},{item:"Play PUBG"},{item:"Do a hackerrank problem"}];
 
var urlencodedParser = bodyParser.urlencoded({extended:false});
    module.exports = function (app) {

    app.get('/todo',function (req,res) {
        //get data from mongodb and pass to view
        Todo.find({},function (err,data) {
            if(err)
            {
                throw err;
            }
            else
            {
                res.render('todo',{todos:data});
            }
        });

       
        
    });
    
    app.post('/todo',urlencodedParser, function (req,res) {

        //get data form view and add in to mongodb
        var newTodo = Todo(req.body).save(function (err) {
            if(err)
            {
                throw err;
            }
            else
            {
                Todo.find({},function (err,data) {
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        res.render('todo',{todos:data});
                    }
                    
                })
            }
            
        })
       
        
        
    });
    app.delete('/todo/:item',function (req,res) {
        //delete item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function (err,data) 
        {
            if(err)    
            {
                throw err;
            }
            else
            {
                res.json(data);
            }
        });
        
        
    })
    
};