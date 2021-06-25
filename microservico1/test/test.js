process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET products', () => {
  it('it should GET all the products', (done) => {
    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('ok').eql(true);
        res.body.data.should.be.a('array');
        done();
      });
  });
});

describe('/POST products', () => {
  it('it should POST successful create products', (done) => {
    chai.request(server)
      .post('/api/products')
      .send({
        "produto_id": "product4",
        "nome": "teste 4", 
        "preco_lista": 10, 
        "preco_venda": 5, 
        "descricao": "teste 3", 
        "imagem": "test3.jpg"
      })
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.body)
        res.body.should.have.property('ok').eql(true);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('it should POST erro create products', (done) => {
    chai.request(server)
      .post('/api/products')
      .send({
        "produto_id": "product4",
        "nome": "teste 4", 
        "preco_venda": 5, 
        "descricao": "teste 3", 
        "imagem": "test3.jpg"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('ok').eql(false);
        res.body.should.have.property('message').eql('Erro ao criar o produto.');
        done();
      });
  });
});
