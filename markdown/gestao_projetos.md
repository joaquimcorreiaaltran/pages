# Gestão de Projetos


- [1. Introdução](#1-introduo)
- [2.	Menu Balancete de Terceiros/Gestão de projeto](#2-menu-balancete-de-terceirosgesto-de-projeto)
	- [2.1.	Forms](#21-forms)
	- [2.2.	Report Gestão de Projeto](#22-report-gesto-de-projeto)


<a name="1-introduo"></a>

# 1. Introdução

Neste documento está definido o ciclo da despesa de um projeto, desde a sua criação do seu CB (cabimento) até à altura em que ocorre o PG (pagamento), com o objetivo de facilitar as validações para as quais seja preciso relacionar vários documentos. Assim, os projetos correspondem a unidades básicas de realização, com orçamento e calendarização rigorosamente definidos. O projeto é utilizado quando estamos perante o orçamento de investimento.

<a name="2-menu-balancete-de-terceirosgesto-de-projeto"></a>

# 2.	Menu Balancete de Terceiros/Gestão de projeto

Conforme necessidade, foi criado no menu de Balancete de Terceiros um novo submenu designado por gestão de projeto. Pretende-se com a criação que os Utilizadores tenham acesso a um relatório que lhes possibilite acompanhar o ciclo da despesa, referente a um determinado projeto ou vários projetos.
A finalidade deste novo desenvolvimento permite igualmente verificar os momentos em que ocorrem o registo dos documentos (seja por data de documento ou por data contabilística). Assim, existe a possibilidade de se acompanhar o fluxo, desde o seu Cabimento (CB) até ao Pagamento (PG) e para uma ou mesmo várias entidades (conforme critérios de análise). Permitirá igualmente selecionar um intervalo de projetos ou mesmo de selecionar todos os projetos sendo que para este caso o campo de 1º projeto/Último projeto tem de ser deixado em branco, não permitindo assim que se crie intervalos entre projetos.

<a name="21-forms"></a>

## 2.1.	Forms

|Recolha |	Gestão de Projetos|
|--|---|

Campo   |Descrição |Tipo de dados | Nº Carateres | Editável | Obrigatório | Observações |
|--|---|---|---|---|---|--|
|  |Ano                   |             | 4 | S | S | Corresponde ao ano (exercício) |
|  |1ª Conta              |Numérico     |   | S | N | Permite selecionar o primeiro intervalo de contas |
|  |Última Conta          |Numérico     |   | S | N |  Permite selecionar o último intervalo de contas |
|  |1º Projeto            |Numérico     |   | S | N |  Permite selecionar o primeiro projeto |
|  |Último Projeto        |Numérico     |   | S | N |  Permite selecionar o último projeto |
|  |1ª Entidade           |Code type    |   | S | N |  Seleção da 1ª entidade |
|  |Ultima entidade       |Code type    |   | S | S |  Seleção da última entidade |
|  |1ª Data               |Data time    |   | S | S |  O cálculo por defeito inicia-se a 01/01/2017 |
|  |Ultima data           |Data time    |   | S | S |  Referente à data de trabalho |
|  |Data de referência    |Data time    |   | S | S |  Por defeito igual à data de trabalho |
|  |Tipo data             |Radio button |   | S | S |  Definição data de documento ou data de contabilização |
|  |Atividade/Departamento|Radio button |   | S | S |  Definição  de Acumulado ou Atividade/Departamento |
|  |Caminho ficheiro      |Texto        |   | S | S |  Escolha de caminho para produzir ficheiro |
|  |Imprimir              |Botão        |   | S | S |  Calcula e imprime em PDF a gestão de projetos |
|  |Ficheiro .CSV         |Botão        |   | S | S | |
|  |Sair                  |Botão        |   | S | N |  Sair do menu |

<a name="22-report-gesto-de-projeto"></a>

## 2.2.	Report Gestão de Projeto

O report da gestão de projetos apresentará os valores contemplados no menu de parametrização, ou seja, a informação de valor do report de gestão de projetos, terá de estar em consonância com a informação constante no seguinte menu:

![img_1.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_1.png)

![img_2.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_2.png)

Desta forma, e para criação do referido report, existe a necessidade de compreender o seu ciclo de execução da despesa decorre conforme representado no diagrama:

![img_3.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_3.png)

Com base no exposto, o report apresentará o seguinte layout:

_Mapa Listagem de projectos.xlsx_

Sendo que a execução funcionará da seguinte maneira:

- 1)	Quando se define a primeira e ultima data, as mesmas referem-se sempre ao tipo de documento CB. A data de referência é obrigatória e por defeito será igual à última data, sendo que nesse intervalo listará todos os CB’s efetuados;

![img_4.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_4.png)

Para o exemplo abaixo demonstrado, foram criados 2 CB’s, um com data de 23JAN16 e outro com data de 11ABR16. Nesse mesmo intervalo e para o primeiro CB criado, o CP foi efetuado com data de 01MAI2016 e para o segundo com data de 10JUN2016.O resultado esperado do relatório é o seguinte:

![img_5.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_5.png)

- 2)	Sendo que a data de referência aparece por defeito igual à última, conforme ponto 1), existe a possibilidade do Utilizador escolher a data de referência que pretenda (seja a atual ou outra). Procedendo a essa alteração, consegue visualizar os restantes documentos criados, nomeadamente os CP; P1 (caso não exista P2); P2 e PG;

![img_6.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_6.png)

Aproveitando o exemplo anteriormente demonstrado e com o campo “data de referência” preenchido, o relatório deverá apresentar os documentos CP, P1 (caso não exista P2); P2 e PG.

![img_7.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_7.png)

Para este mesmo relatório o nome atribuído por defeito para criação do CSV. deverá ser o seguinte: GESTAO_PROJETOS

![img_8.png](https://spmssicc.github.io/pages/markdown/assets/gestao_projetos/img_8.png)
