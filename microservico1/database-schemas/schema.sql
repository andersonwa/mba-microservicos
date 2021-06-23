CREATE TABLE produtos (
 id SERIAL PRIMARY KEY,
 produto_id varchar(255) NOT NULL UNIQUE,
 nome varchar(255) NOT NULL,
 preco_lista decimal NOT NULL,
 preco_venda decimal NOT NULL,
 descricao text NOT NULL,
 imagem text NOT NULL
);