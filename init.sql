-- init.sql

CREATE TABLE Grupos (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    descricao TEXT,
    UNIQUE (id_grupo, nome)
);

CREATE TABLE Servicos (
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    id_grupo INT,
    nome VARCHAR(255),
    descricao TEXT,
    UNIQUE (id_servico, nome),
    FOREIGN KEY (id_grupo) REFERENCES Grupos (id_grupo)
);

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    id_servico INT,
    token VARCHAR(255),
    nome VARCHAR(255),
    UNIQUE (id_cliente, token)
);

CREATE TABLE Logs (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255),
    message TEXT,
    status TEXT,
    datetime DATETIME,
    UNIQUE(id_log)
);

-- Insert a test group
INSERT INTO Grupos(nome, descricao) VALUES ('teste', 'teste');

-- Insert a test service in the group
INSERT INTO Servicos(id_grupo, nome, descricao) VALUES (1, 'teste', 'teste');

-- Insert a test client in the service
INSERT INTO Clientes(id_servico, token, nome) VALUES (1, 'abc123', 'teste');
