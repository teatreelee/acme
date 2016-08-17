var swig = require('swig');
swig.setDefaults({ cache: false });


var express = require('express');
var app = express();

var product = require('./product.model');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/', function(req, res, next){
  res.render('index');
});

app.get('/products', function(req, res, next){
  var products = product.getProducts();
  res.render('products',{products: products});
});

app.get('/products/:id', function(req, res, next){
  var id = +req.params.id;
  var item = product.getProduct(id);
  res.render('products', {products:[item]});
});

app.get('/products/:id/edit', function(req, res, next){
  var id = +req.params.id;
  var item = product.getProduct(id);
  res.render('edit', {product: item});

});

app.get('/add', function(req, res, next){
  res.render('add');

});

app.post('/products/add', function(req, res, next){
  product.addProduct({name: req.body.product});
  res.redirect('/products');
});
app.post('/products/:id/delete', function(req, res, next){
  var id = +req.params.id;
  product.deleteProduct(id);
  res.redirect('/products');
});

app.post('/products/:id/update', function(req, res, next){
  var id = +req.params.id;
  var body = {
    name: req.body.product
  }
  product.updateProduct(id, body);
  res.redirect('/products');
});


app.listen(3000, function(){
  console.log('listening on ' + 3000);
});

