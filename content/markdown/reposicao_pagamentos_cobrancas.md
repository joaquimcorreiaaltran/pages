# Reposição de Pagamentos e Cobranças
---
<!--
# Índice

1. [Introdução](#introducao)
2. [Reposição Abatida aos Pagamentos](#rap)
3. [Reposição Não Abatida nos Pagamentos](#rnap)
4. [Resumo](#resumo)
-->

<a name="introducao"></a>

# 1. Introdução

A reposição de pagamentos e cobranças dividem-se em RAP/RNAP, no sistema SICC e surge sempre que é detetado um pagamento/cobrança indevido do organismo, a um fornecedor/ cliente e é finalizada quando efetivado o pagamento/ recebimento.
Sempre que seja detetado um pagamento / recebimento indevido, deverá proceder à emissão de uma guia de reposição. Esta pode ser:

- Reposição Abatida aos Pagamentos (RAP), quando existe uma alteração a um pagamento já efetuado e são considerados contabilisticamente como Notas de Crédito ( NC);
- Reposição Não Abatida aos Pagamentos (RNAP) quando existe uma alteração a uma cobrança já efetuada e são consideradas contabilisticamente como CC;

<a name="rap"></a>

# 2. Reposição Abatida aos Pagamentos

![img_1.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_1.png)


As reposições abatidas nos pagamentos são todas as importâncias que abatem aos pagamentos realizados, libertando as dotações correspondentes, e têm as seguintes características comuns:
A existência de uma reposição abatida pressupõe que houve um pagamento excessivo em relação a uma determinada aquisição, cuja regularização é efetuada, no respetivo ano financeiro, através da correção da dotação utilizada e do respetivo saldo disponível, aumentando-o. Decorre deste entendimento que a reposição abatida aos pagamentos não seja tida como uma receita orçamental.

![img_2.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_2.png)

**Legenda:**
1. Esta corresponde a um documento (nota de crédito ou similar) emitida por um fornecedor, que tem associado o compromisso que deu origem ao pagamento indevido e que reflete o respetivo crédito;
2. O fornecedor paga guia de reposição e alerta Contabilidade para essa ocorrência;
3. Este movimento é efetuado através da conta 2529* e a respetiva classificação orçamental que deu origem ao pagamento indevido sendo debitado por contrapartida da compensação da partida em aberto da guia de reposição;
4. A conta de disponibilidades será debitada por contrapartida da compensação da liquidação da RAP;
5. Movimentar a conta de compromissos por contrapartida da conta de cabimentos.


Estas operações abatem aos pagamentos realizados, libertando as dotações correspondentes. Trata-se da situação que ocorre com as entregas de fundos relativas a pagamentos em excesso ou indevidos, ocorridos no ano em curso.

Desta forma, no menu:
![img_3.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_3.png)

Este mesmo registo de reposição pagamento poderá ser efetuado por uma das seguintes contas: 3*,4*,6* ou 7*.

![img_4.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_4.png)

![img_5.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_5.png)

Desta forma e para a despesa, o sistema SICC, identifica os documentos quando se efetuar o CE (automaticamente), no entanto demonstram-se os respetivos lançamentos:

![img_6.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_6.png)

NC – O processo de lançamento de uma Reposição de pagamento, é bastante similar a uma Nota de crédito convencional. Desta forma, todas as contas 2* (exceto a 25*) são movimentadas a débito, por contrapartida das contas 3*, 4*, 5*, 6*, 7*.

**Movimentação Contabilística: Lançar Nota de Crédito (doc. NC)**

![img_7.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_7.png)

CE – Na altura do lançamento do CE, a informação é proveniente do criado anteriormente na NC, sendo que a conta 2*passa a crédito e a conta 2529* a débito, com o classificador e económico e chave orçamental associado à conta 3*, 4*, 5*, 6*, 7* gerado anteriormente.

![img_8.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_8.png)

**Movimentação Contabilística: Liquidação da RAP (doc. CE)**

![img_9.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_9.png)

Finda a etapa, deve o utilizador confirmar a criação do CE e passar para o nível seguinte:

![img_10.png](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_10.png)

AP - Neste passo, pode-se efetuar a confirmação sem associar a fatura, pelo facto de se tratar de uma Reposição abatida aos pagamentos. Desta forma, todos os lançamentos aqui demonstrados, são provenientes da CE. Este movimento não é refletido na contabilidade. O valor deste documento será negativo.

![img_11](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_11.png)

![img_12](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_12.png)

![img_13](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_13.png)

:warning: __Se se tratar de uma transferência bancária, é necessário acrescentar o movimento contabilístico da conta 111 (caixa) a débito por contrapartida da rubrica financeira gerada pelas contas 3; 4; 5; 6; 7.__

![img_14](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_14.png)

:warning:__Se o Documento for transferência Bancária na AP, o sistema irá acrescentar registo da 111* a Crédito pela conta 112* ou 113* de acordo com a seleção efetuada na conta bancária da AP.__

PG – No Pagamento, os movimentos criados na AP são replicados nesta etapa de criação.

![img_15](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_15.png)

O utilizador acede aos movimentos contabilísticos, sendo que para o efeito, tem novamente de pressionar o botão de “Confirme”.

![img_16](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_16.png)

**Movimentação Contabilística: Registo da entrada de Pagamento da RAP (doc. AP/PG)**

![img_17](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_17.png)

Na mesma altura e no AP, ao gerar contabilidade, o sistema, associado ao número do CP ou P2, irá realizar as seguintes regularizações.

**Movimentação Contabilística no NC (RAP ou NC “normal”) ao gerar contabilidade**

![img_18](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_18.png)

![img_19](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_19.png)

<a name="rnap"></a>

# 3. Reposição Não Abatida nos Pagamentos

![img_20](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_20.png)
As reposições não abatidas nos pagamentos abrangem as receitas provenientes das entradas de fundos em resultado de cobranças orçamentais indevidos.

![img_21](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_21.png)

**Legenda:**
1. A contabilidade analisa a cobrança indevida;
2. Este documento será registado debitando a conta do cliente por contrapartida da conta 3*; 4*; 5*; 6*;7* com introdução da respetiva classificação orçamental. Após registada a CC/RNAP, a mesma é enviada ao cliente;
3. Cliente efetua o pagamento para regularizar a cobrança indevida;
4. O programa de liquidação da receita permitirá selecionar a RNAP em aberto que se pretende transferir para a conta 2519*.

Desta forma, no menu:

![img_22](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_22.png)

Um novo ecrã surge com uma *checkbox* que permite ao utilizador, definir se trata de um CC ou uma RNAP. Este mesmo registo de reposição pagamento, igualmente à RAP, poderá ser efetuado por uma das seguintes contas: 3*,4*,6* ou 7* a débito, por contrapartida de uma 2* (expeto 25*).
Assim, e para efeitos de manual de  utilizador, demonstramos o processo de contabilização abaixo da RNAP.
Deve o utilizador escolher a entidade, bem como atribuir um número de documento com o respetivo valor. Tratando-se de uma RNAP, a *checkbox* tem de estar ativa.

![img_23](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_23.png)

![img_24](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_24.png)

Desta forma e para a receita, o sistema SICC, identifica os documentos quando se efetuar o CC (automaticamente).

![img_25](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_25.png)

CC – O processo de lançamento de uma Reposição de pagamento, é bastante similar a um crédito a clientes convencional. Desta forma, todas as contas 2* (exceto a 2529*) são movimentadas a débito, por contrapartida das contas 3*, 4*, 5*, 6*, 7*.

**Movimentação Contabilística: Registar RNAP (doc. CC)**

![img_26](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_26.png)

DE – Na altura do lançamento do DE, a informação é proveniente do criado anteriormente no CC, sendo que a conta 2* passa a crédito e a conta 2519* a débito, com o classificador económico associado à conta 3*, 4*, 5*, 6*, 7* gerado anteriormente no CC.

![img_27](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_27.png)

![img_28](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_28.png)

**Movimentação Contabilística: Liquidação da Receita (doc. DE)**

![img_29](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_29.png)

Finda a etapa, deve o utilizador confirmar a criação do CC e passar para o nível seguinte:
GR - Neste passo, pode-se efetuar a confirmação sem associar a fatura, pelo facto de se tratar de uma Reposição não abatida nos pagamentos. Desta forma, todos os lançamentos aqui demonstrados, são provenientes do CC.

![img_30](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_30.png)

![img_31](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_31.png)

![img_32](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_32.png)

**Movimentação Contabilística: Registo da entrada de Pagamento da RNAP (doc. GR/CO)**

![img_33](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_33.png)

![img_34](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_34.png)

No valor de caixa (folha de caixa) estes valores serão positivos, dado que as contas 1 são registadas a crédito e não a débito.
![img_35](https://spmssicc.github.io/pages/content/img/markdown_docs/reposicao_pagamentos_cobrancas/img_35.png)

<a name="resumo"></a>

# 4. Resumo

As RAP e RNAP são reposições de pagamentos e cobranças respetivamente. São tratadas contabilisticamente de forma diferente das notas de crédito (NC e CC) antes do Pagamento e da Cobrança.

Os seus registos contabilísticos resumem-se a:

### **RAP:**

|Registo contabilístico|Débito|Crédito|
|:---------------------|:-----|:------|
|Lançar Nota de Crédito (NC/RAP)|3*; 4*; 5*; 6*; 7*|22*/26*|
|Liquidação da RAP (CE)|2529*|22*/26*|
|Registo da entrada de Pagamento da RAP (AP/PG)|1*|2529*|
|Movimentação Contabilística no NC (Rap ou NC “normal”) ao gerar contabilidade|02700000|02600000|
|Movimentação Contabilística no NC (Rap ou NC “normal”) ao gerar contabilidade|02600000|02300000|

### **RNAP:**

|Registo contabilístico|Débito|Crédito|
|:---------------------|:-----|:------|
|Registar RNAP (CC)|3*; 4*; 5*; 6*; 7*|22*/26*|
|Liquidação da Receita (DE)|2519*|22*/26*|
|Registo da entrada de Pagamento da RNAP (GR/CO)|1*|2519*|
