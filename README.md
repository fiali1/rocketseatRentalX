# Cadastro de carro

**Requisitos Funcionais**

Deve ser possível cadastrar um novo carro.

**Regras de Negócio**

Não deve ser possível cadastrar um carro com uma placa previamente cadastrada.

O carro deve ser cadastrado como **disponível** por padrão.

O usuário responsável pelo cadastro deve ser um **usuário administrador**.

# Alteração de carro

**Requisitos Funcionais**

**Regras de Negócio**

Não deve ser possível alterar a placa de um carro cadastrado.

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

O usuário responsável pelo cadastro deve ser um **usuário administrador**.

# Cadastro de imagens do carro

**Requisitos Funcionais**

Deve ser possível cadastrar uma imagem para um carro.

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

Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**Requisitos Funcionais**

Deve ser possível fazer a devolução de um carro

**Regras de Negócio**

Se um carro for devolvido em menos de 24h, deverá ser cobrada a diária completa.

Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.

Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.

Ao realizar a devolução, deverá ser calculado o total do aluguel.

Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa proporcinal aos dias de atraso.

Caso haja multa, deverá ser somada ao total do aluguel.

# Listagem de Alugueis para um usuário

**Requisitos Funcionais**

Deve ser possível realizar a busca de todos os alugueis para um usuário.

**Regras de Negócio**

O usuário deve estar logado na aplicação.

# Recuperação de senha

**Requisitos Funcionais**

Deve ser possível que o usuário recupere sua senha informando seu email.

O usuário deve receber o email com passo a passoa para recuperação de senha.

O usuário deve conseguir definir uma nova senha.


**Regras de Negócio**

O usuário precisa informar uma nova senha.

O link enviado para recuperação deve expirar em 3 horas.
