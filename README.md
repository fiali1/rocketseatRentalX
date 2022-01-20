# Cadastro de carro

**Requisitos Funcionais**

Deve ser possível cadastrar um novo carro.

Deve ser possível listar todas as categorias.

**Regras de Negócio**

Não deve ser possível cadastrar um carro com uma placa previamente cadastrada.

Não deve ser possível alterar a placa de um carro cadastrado.

O carro deve ser cadastrado como **disponível** por padrão.

O usuário responsável pelo cadastro deve ser um **usuário administrador**.

# Listagem de carros

**Requisitos Funcionais**

Deve ser possível listar todos os carros que estejam **disponíveis**.
  * Pelo nome da categoria.
  * Pelo nome da marca.
  * Pelo nome do carro.

**Regras de Negócio**

O usuário não precisa estar logado no sistema para visualizar a listagem de carros.

# Cadastro de especificações em um carro


**Requisitos Funcionais**

Deve ser possível cadastrar uma especificação para um carro.

**Regras de Negócio**

Deve ser possível cadastrar mais de uma especificação para um mesmo carro.

Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

Não deve ser possível cadastrar novamente uma especificação já existente para um carro.

Deve ser possível alterar uma especificação para um carro.

Deve ser possível listar todas as especificações para um carro.

Deve ser possível listar todos os carros.

O usuário responsável pelo cadastro deve ser um **usuário administrador**.

# Cadastro de imagens do carro

**Requisitos Funcionais**

Deve ser possível cadastrar uma imagem para um carro.

Deve ser possível listar todos os carros.

**Requisitos Não Funcionais**

Utilizar o **multer** para o upload de arquivos

**Regras de Negócio**

Deve ser possível cadastrar mais de uma imagem para um mesmo carro.

O usuário responsável pelo cadastro deve ser um **usuário administrador**.

# Aluguel de carro

**Requisitos Funcionais**

Deve ser possível cadastrar um aluguel.

**Regras de Negócio**

O aluguel deve ter duração mínima de 24 horas.

Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para um mesmo usuário.

Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para um mesmo carro.


