const db = require('../../config/database');
const producer = require('../../config/producer');
const Sentry = require("@sentry/node");

exports.createProduct = async (req, res) => {
  try {
    const { produto_id, nome, preco_lista, preco_venda, descricao, imagem } = req.body;
    
    const response = await db.query(
      "INSERT INTO produtos (produto_id, nome, preco_lista, preco_venda, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6)",
      [produto_id, nome, preco_lista, preco_venda, descricao, imagem]
    );
    
    const getResponse = await db.query('SELECT * FROM produtos WHERE produto_id = $1', [produto_id]);

    await producer.connect();
    await producer.send({
      topic: "createProduct",
      messages: [{ key: produto_id, value: JSON.stringify(getResponse.rows) }]
    });
    await producer.disconnect();

    if (getResponse.rowCount == 1) {
      res.status(200).send({
        ok: true,
        data: getResponse.rows[0]
      });
    } else {
      res.status(200).send({
        ok: true,
        data: null
      });
    }
  } catch(e) {
    Sentry.captureException(e);
    res.status(200).send({ ok: false, message: "Erro ao criar o produto." });
  }
}

exports.listProducts = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM produtos ORDER BY nome ASC');
    res.status(200).send({
      ok: true,
      data: response.rows
    });
  } catch(e) {
    Sentry.captureException(e);
    res.status(200).send({
      ok: false,
      data: [],
      message: "Erro ao listar os produtos."
    });
  }
};

exports.findProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await db.query('SELECT * FROM produtos WHERE produto_id = $1', [productId]);
    
    if (response.rowCount == 1) {
      res.status(200).send({
        ok: true,
        data: response.rows[0]
      });
    } else {
      res.status(200).send({
        ok: true,
        data: null
      });
    }
  } catch(e) {
    Sentry.captureException(e);
    res.status(200).send({
      ok: false,
      data: null,
      message: "Erro ao buscar o produto."
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { nome, preco_lista, preco_venda, descricao, imagem } = req.body;

    const response = await db.query(
      "UPDATE produtos SET nome = $1, preco_lista = $2, preco_venda = $3, descricao = $4, imagem = $5 WHERE produto_id = $6",
      [nome, preco_lista, preco_venda, descricao, imagem, productId]
    );

    const getResponse = await db.query('SELECT * FROM produtos WHERE produto_id = $1', [productId]);

    await producer.connect();
    await producer.send({
      topic: "updateProduct",
      messages: [{ key: productId, value: JSON.stringify(getResponse.rows) }]
    });
    await producer.disconnect();

    if (getResponse.rowCount == 1) {
      res.status(200).send({
        ok: true,
        data: getResponse.rows[0]
      });
    } else {
      res.status(200).send({
        ok: true,
        data: null
      });
    }
  } catch(e) {
    Sentry.captureException(e);
    res.status(200).send({
      ok: false,
      data: null,
      message: "Erro ao atualizar o produto."
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    await db.query('DELETE FROM produtos WHERE produto_id = $1', [
      productId
    ]);

    await producer.connect();
    await producer.send({
      topic: "deleteProduct",
      messages: [{ key: productId, value: productId }]
    });
    await producer.disconnect();

    res.status(200).send({ ok: true, message: 'Produto deletado com sucesso.', productId });
  } catch(e) {
    Sentry.captureException(e);
    res.status(200).send({ ok: false, message: "Erro ao deletar o produto." });
  }
};