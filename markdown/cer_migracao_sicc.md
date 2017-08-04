# CER - Migração de dados para SICC (em atualização)

## 1. Enquadramento e Âmbito

O presente documento insere-se no âmbito do desenvolvimento do sistema de informação financeira para entidades do Ministério da Saúde, com informação normalizada de acordo com o SNC-AP e em linha com as práticas de referência na gestão e na contabilidade pública.

Este documento visa essencialmente:
- Estabelecer um base de entendimento atualizada e comum a todas as partes interessadas;
- Acelerar o processo de migração;

Desta forma, este documento estabelece:
- As principais fases e tarefas do processo de transição para o SICC-SNC-AP (Beta) e respetivos responsáveis;
- Os fluxos financeiros  respetivas regras relevantes;
- Os registos contabilísticos suportados e as respetivas regras associadas;
- Os conjuntos mínimos de dados para o funcionamento do sistema, em ambiente de teste;
- As estruturas completas de dados a carregar, de modo a simular um ambiente real de produção.


## 2. Fluxo do processo de migração SICC

![](https://spmssicc.github.io/pages/markdown/cer_migracao_sicc.assets/cer_migracao_sicc-00caf3c8.png)

| Tarefa e respetivo detalhe | Responsável |
|---|---|
|**Produzir ficheiros de migração**:</br>Extração de dados a migrar do sistema anterior e envio para a equipa do SICC, de acordo com os requisitos especificados neste documento.</br> Assegurar que:</br> i) Não existem autorizações de pagamentos por regularizar;</br>ii) Não existem guias de receita por cobrar;</br>iii) É enviada a informação até ao dia da produção do ficheiro;</br>iv) A data contabilística deverá ser “encerrada”, ao dia da produção do ficheiro| Entidade do MS |
|**Verificar ficheiros, produzir relatório de migração e disponibilizar SICC-teste:**</br>Os ficheiros enviados pela entidade do MS são incorporados e verificados no sistema SICC-Teste. Este procedimento originará um relatório de validação e consistência de informação contabilística, que inclui eventuais medidas corretivas a serem executadas pela entidade do MS.</br>Os dados estarão aptos a serem carregados para produção quando todas as regras forem cumpridas e consequentemente, não forem identificadas situações que impeçam o seu carregamento| Equipa SICC |
|**Efetuar ajustamentos sugeridos**</br>Devem ser efetuadas as medidas corretivas indicadas no relatório produzido na tarefa anterior deste fluxo. Após a execução de todas as medidas corretivas, os ficheiros devem ser produzidos de novo.</br>Situações frequentes:</br>1.  “Entidade não encontrada” - Identifica um documento com uma entidade que não existe. Esta entidade deverá ser criada para possibilitar a migração do documento em causa. Os dados da entidade a criar podem ser obtidos;</br>2.  “Conta xxxxx não é de movimento no exercício XXXX” - As duas situações mais frequentes associadas com esta mensagem são:</br>2.1.  a conta foi utilizada corretamente e deverá ser alterado o seu tipo para “de movimento”;</br>2.2.  a conta foi utilizada incorretamente, devendo o lançamento ser corrigido.</br>Contudo, esta situação deverá ser analisada detalhadamente, pois as correções a efetuar poderão ser distintas das apontadas anteriormente.</br>3.  “Conta xxxxx inexistente no exercício XXXX” - O lançamento efetuado poderá ter utilizado uma conta incorreta que deverá ser corrigida. Contudo, outras razões poderão contribuir para esta situação, devendo proceder-se à sua análise detalhada. Depois de efetuados os ajustamentos, o processo de migração terá de ser novamente iniciado para o ano em causa| Entidade do MS |
|**Comparar documentos contabilísticos entre o sistema anterior e SICC:**</br>Validações contabilísticas finais entre o sistema anterior e o SICC, nomeadamente:</br>-   A comparação de balancetes;</br>-   Extrato de contas correntes| Entidade do MS |
|**Identificar e corrigir diferenças:**</br> Identificação e execução de ajustamentos necessários para que os documentos contabilísticos produzam os mesmos valores em ambas as aplicações.</br>1.  Verificação e identificação de contas com valores diferentes e produção dos respetivos extratos de conta;</br>2.  Análise detalhada das diferenças e execução das respetivas ações corretivas.</br> Após efetuados os ajustamentos, o processo de migração e respetivas verificações terão de ser novamente efetuados para o exercício em questão   | Entidade do MS |
|**Finalizar migração e disponibilização do ambiente de produção:**</br>Envio dos ficheiros validados pelo parceiro para a equipa SICC validar e carregar para ambiente de produção| Equipa SICC |

## 3.  Tipos de documentos contabilísticos do sistema


### 3.1.  Documentos de despesa

| ID  | Nome           | Descrição |
|---|----|---|
| AB  | Anulações de compromissos      |          |
| AC  | Anulação de credores           |          |
| AF  | Anulação de faturas            |          |
| AL  | Alteração ao comprometido      |          |
| AM  | Alteração ao cabimento         |          |
| AP  | Autorização de pagamento       |          |
| CB  | Cabimentos     |          |
| CE  | Credores p/Execução orçamental |          |
| CM  | Compromissos   |          |
| CP  | Comprometidos  |          |
| DA  | Despesa fundos alheios         |          |
| DF  | Débito sobre a fatura          |          |
| NC  | Notas de crédito               |          |
| P1  | Processado em conferência      |          |
| P2  | Processado conferido           |          |
| PG  | Pagamentos     |          |

### 3.2. Documentos de receita

| ID  | Nome            | Descrição |
|---|---|---|
| AD  | Anulação de devedores           |           |
| AR  | Anulação de Receita             |           |
| CC  | Créditos a Clientes             |           |
| CD  | Cobrança duvidosa               |           |
| CF  | Crédito sobre a fatura          |           |
| CI  | Créditos incobráveis            |           |
| CO  | Cobranças       |           |
| DE  | Devedores p/execução orçamental |           |
| FD  | Faturas de devedores            |           |
| GR  | Guia de receita |           |
| OR  | Outras receitas |           |
| RA  | Receita fundos alheios          |           |

### 3.3. Despesa/receita

| ID  | Nome            | Descrição |
|---|---|---|
| CT  | Cativos ou congelamentos        |           |
| DT  | Descativos ou descongela-mentos |           |
| OT  | Operações diversas              |           |

### 3.4. Outros documentos

| ID  | Nome         | Descrição |
|---|---|---|
| CT  | Cativos ou congelamentos     |           |
| DT  | Descativos ou descongela-mentos|         |
| FP  | Fundos disponíveis           |           |
| NB  | Notas de débito              |           |
| OA  | Orçamento fundos alheios     |           |
| OC  | Orçamento de compras         |           |
| OD  | Operações diversas           |           |
| OE  | Orçamento de exploração      |           |
| OF  | Orçamento financeiro         |           |
| OI  | Orçamento de investimentos   |           |
| OO  | Orçamento exec. orçamental   |           |
| PA  | Proposta orç. fundos alheios |           |
| PC  | Proposta orçamento compras   |           |
| PE  | Proposta orç. exploração     |           |
| PF  | Proposta orçamento financeiro|           |
| PI  | Proposta orç. investimentos  |           |
| PO  | Proposta orç. ex. orçam.     |           |
| RC  | Resultados correntes         |           |
| RD  | Recuperação de dívidas       |           |
| RE  | Resultados extraordinários   |           |
| RF  | Resultados financeiros       |           |
| RI  | Resultados antes de impostos |           |
| RL  | Resultados líquidos          |           |
| RO  | Resultados operacionais      |           |

## 4.  Fluxos financeiros do sistema

### 4.1.  Despesa de Fundos Próprios

![](https://spmssicc.github.io/pages/markdown/cer_migracao_sicc.assets/cer_migracao_sicc-c958de63.png)

Regras de relevo do fluxo

| ID  | Descrição     |
|---|---|
| 1   | Todos os tipos de documentos podem ser regularizados por um ou vários até ao seu valor total. Ex: CB 100€ poderá dar origem a vários CM até ao valor de 100€ |
| 2   | O documento de registo AL e AM alteram o valor do CB e CP respetivamente, alterando também o valor disponível para o tipo do documento subsequente        |
| 3   | No caso das instituições EPE o documento subsequente do P2, CF,DF e NC, será diretamente o AP, não executando registos em CE              |

### 4.2 Receita de Fundos Próprios

![](https://spmssicc.github.io/pages/markdown/cer_migracao_sicc.assets/cer_migracao_sicc-e32b654b.png)

Regras relevantes

| ID  | Descrição     |
|---|---|
| 1   | Todos os tipos de documentos podem ser regularizados por um ou vários até ao seu valor total. Ex: DE 100€ poderá dar origem a vários GR até ao valor de 100€ |
| 2   | No caso das instituições EPE o documento subsequente do FD,CC, será diretamente o GR, não executando registos em DE                       |

## 5. Relação de tipos de documentos

| Tipo Doc| Designação       | Regulariza          | Regularizado    | Observações                   |
|---|---|----|----|---|
| AB     | Anulações de compromissos        | CM                  |                 |       |
| AC     | Anulação de credores             | P1, P2 e NC         |                 |       |
| AD     | Anulação de devedores            | FD e CC             |                 |       |
| AF     |              |                 |             |   |
| AL     | Alteração de compromissos assumidos | CP                  |                 |       |
| AM     | Alteração de CB  | CB                  |                 |       |
| AP     | Autorização de pagamento         | CE (SPA e IP) / P2,NC,DF,CF e DA (EPE) | PG              |       |
| AR     |              |                 |             |   |
| CB     | Cabimentos       |                     | AM;CM           |       |
| CC     | Créditos a clientes              |                     | DE (SPA e IP) / GR (EPE)        |       |
| CD     | Cobrança duvidosa| FD                  |                 |       |
| CE     | Credores p/ execução orçamental  | P2,NC,DF,CF, (SPA e IP)             | AP (SPA e IP)   |       |
| CF     | Créditos a fornecedores          |                     | CE (SPA e IP) /AP (EPE)         |       |
| CI     | Créditos incobráveis             | FD                  |                 |       |
| CM     | Compromissos     | CB, AM              | AB, CP, AL      |       |
| CO     | Cobranças        | GR, RA              |                 |       |
| CP     | Compromissos assumidos           | CM, AB              | AL,P1 ou P2     |       |
| CT     | Cativos ou congelamentos         |                     | DT              |       |
| DA     | Despesa fundos alheios           |                     | PG              |       |
| DE     | Devedores p/ execução orçamental | FD, OR, CC(SPA /IP) | AP (SPA e IP)   |       |
| DF     | Débitos a fornecedores           |                     | CE (SPA e IP) /AP (EPE)         |       |
| DT     | Descativos ou congelamentos      | CT                  |                 |       |
| FD     | Faturas de devedores             |                     | DE (SPA, IP)/ GR (EPE)/ CI AD , CD |       |
| FP     | Fundos disponíveis               |                     |                 | Regulariza e regularizado pelo próprio Documento |
| GR     | Guia de receita  | DE (SPA, IP)/FD, CC, OR, RA (EPE)   | CO              |       |
| IG     | Transferências bancarias         |                     |                 |       |
| NB     | Notas de débito  |                     |                 |     |
| NC     | Notas de crédito |                     | DE (SPA , IP) , AP (EPE), AD    |       |
| OA     | Orçamento fundos alheios         | PA                  |                 |       |
| OC     | Orçamento de compras             | PC                  |                 |       |
| OD     | Operações diversas               |                     |                 |       |
| OE     | Orçamento de exploração          | PE                  |                 |       |
| OF     | Orçamento financeiro             | PF                  |                 |       |
| OI     | Orçamento de investimentos       | PI                  |                 |       |
| OO     | Orçamento exec. orçamental       | PO                  |                 |       |
| OR     | Outras receitas  |                     | DE ( SPA, IP)/ GR (EPE)         |       |
| P1     | Processado em conferência        | CB, AL              | P2              | Caso exista P1                |
| P2     | Processado conferido             | P1 ou CP, AL        | CE (SPA e IP) /AP (EPE), AC,    | Caso exista P1                |
| PA     | Proposta orç. fundos alheios     |                     | OA              |       |
| PC     | Proposta orçamento compras       |                     | OC              |       |
| PE     | Proposta orç. exploração         |                     | OE              |       |
| PF     | Proposta orçamento financeiro    |                     | OF              |       |
| PG     | Pagamentos       | AP                  |                 |       |
| PI     | Proposta orç. investimentos      |                     | OI              |       |
| PO     | Proposta orç. ex. orçam.         |                     | OO              |       |
| RA     | Receita fundos alheios           |                     | CO              |       |
| RC     | Resultados correntes             |                     |                 | Cálculos Contabilísticos      |
| RD     | Recuperação de dívidas           |                     |                 |     |
| RE     | Resultados extraordinários       |                     |                 | Cálculos Contabilísticos      |
| RF     | Resultados financeiros           |                     |                 | Cálculos Contabilísticos      |
| RI     | Resultados antes de impostos     |                     |                 | Cálculos Contabilísticos      |
| RL     | Resultados líquidos              |                     |                 | Cálculos Contabilísticos      |
| RO     | Resultados operacionais          |                     |                 | Cálculos Contabilísticos      |

## 6. Estrutura da informação a carregar

A importação dos dados de histórico é feita de acordo com as 9 dimensões
seguintes (conjuntos de dados):

-   Plano de Contas;

-   Entidades;

-   Centros de Custos;

-   Contabilidade Analítica;

-   Contabilidade Geral;

-   Contabilidade Orçamental;

-   Contabilidade Pública;

-   Cabeçalhos dos documentos contabilísticos;

-   Registos Contabilísticos Relacionados.

Nas subsecções seguintes, detalham-se os campos de cada dimensão.

### 6.1. Plano de Contas

| ID  | Campo              | Tipo         | Obrig| Descrição                |
|----|---|---|----|----|
| 4.1.1  | Ano                | Numérico (4) | Sim | Ano do exercício         |
| 4.1.2  | Conta              | Texto (50)   | Sim | Código da conta          |
| 4.1.3  | Nome               | Texto (100)  | Não | Nome da conta            |
| 4.1.4  | Tipo               | Texto (1)    | Não | (M)ovimentação/(A)cumulação              |
| 4.1.5  | Grau               | Numérico     | Não | Grau da conta            |
| 4.1.6  | Conta do exercício anterior        | Texto (50)   | Não | Conta homóloga no exercício fiscal anterior |
| 4.1.7  | Conta analítica    | Texto (50)   | Não | Código da conta analítica|
| 4.1.8  | Saldo inicial a crédito de balanço | Numérico (22,2) | Não | Valores de balanço N-1 a débito          |
| 4.1.9  | Saldo inicial a débito de balanço  | Numérico (22,2) | Não | Valores de balanço N-1 a crédito         |
| 4.1.10 | Saldo inicial a crédito de resultados | Numérico (22,2) | Não | Valores de resultados N-1 a débito       |
| 4.1.11 | Saldo inicial a débito de resultados  | Numérico (22,2) | Não | Valores de resultados N-1 a crédito      |
| 4.1.12 | Classificador económico            | Texto (50)   | Não | Classificador económico da conta         |
| 4.1.13 | Rubrica financeira | Texto (50)   | Não | Rubrica financeira da conta              |

### 6.2. Entidades

| ID  | Campo     | Tipo      | Obrig| Descrição   |
|----|----|----|----|---|
| 4.2.1  | Código    | Numérico  | Sim | Identificador numérico da entidade  |
| 4.2.2  | Nome      | Texto (100)  | Não | Designação da entidade              |
| 4.2.3  | Tipo      | Numérico  | Sim |<_a definir_>**Cada entidade pode configurar os tipos que quiser?** |
| 4.2.4  | Contacto  | Texto (100)  | Não | Contacto preferencial da entidade   |
| 4.2.5  | Morada    | Texto (100)  | Não | Endereço postal da entidade         |
| 4.2.6  | Telefone 1| Texto (15)   | Não | Contacto telefónico primário        |
| 4.2.7  | Telefone 2| Texto (15)   | Não | Contacto telefónico alternativo     |
| 4.2.8  | Telefone 3| Texto (15)   | Não | Contacto telefónico alternativo     |
| 4.2.9  | Fax       | Texto (15)   | Não | Contacto fax|
| 4.2.10 | Localidade| Texto (100)  | Não | Nome da localidade                  |
| 4.2.11 | Código Postal (4 algarismos) | Numérico  | Não | Primeiros 4 algarismos do Código Postal             |
| 4.2.12 | NIB 1     | Texto (21)   | Não | NIB da entidade                     |
| 4.2.13 | NIB 2     | Texto (21)   | Não ||
| 4.2.14 | N.º/código contribuinte   | Texto (25)   | Não | Identificador alfanumérico          |
| 4.2.15 | Observações               | Texto (1000) | Não ||
| 4.2.16 | Prazo de vencimento (dias)   | Numérico  | Não | N.º de dias de vencimento           |
| 4.2.17 | Código Postal (3 algarismos) | Texto (3) | Não | Últimos 3 algarismos do CP          |
| 4.2.18 | Fator de Aglutinação      | Numérico  | Sim ||
| 4.2.19 | Limite de crédito         | Numérico  | Não ||
| 4.2.20 | Email     | Texto (100)  | Não | Endereço de correio eletrónico      |

### 6.3. Centros de Custos

| ID | Campo         | Tipo     | Obrig| Descrição|
|---|----|---|----|----|
| 4.3.1 | Ano           | Numérico | Sim | Formato: 2016            |
| 4.3.2 | Identificador do Centro de Custo | Texto (10)  | Sim | Código do centro de custo|
| 4.3.3 | Nome          | Texto (100) | Não | Designação do centro de custo                    |
| 4.3.4 | Tipo          | Texto (1)   | Não | Identificador do tipo da conta: (**M**)ovimento ou (**A**)cumulação |
| 4.3.5 | Centro de custo de acumulação | Texto (20)  | Não | Código do centro de custo de acumulação          |

### 6.4. Contabilidade Analítica

| ID  | Campo              | Tipo         | Obrig| Descrição      |
|----|---|---|----|---|
| 4.4.1  | Entidade do documento | Numérico     | Sim | Identificador numérico da entidade                     |
| 4.4.2  | Tipo de documento  | Texto (2)    | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema |
| 4.4.3  | Ano de documento   | Numérico (4) | Sim | Identificador do ano           |
| 4.4.4  | N.º de documento   | Numérico     | Sim | Identificador do documento     |
| 4.4.5  | Ordem              | Numérico     | Sim | Ordem do registo contabilístico no documento           |
| 4.4.6  | Estado             | Numérico     | Não | Estado de contabilização (contabilizado ou não)        |
| 4.4.7  | Conta              | Texto (50)   | Não | Código da conta|
| 4.4.8  | Centro de custo    | Texto (20)   | Não |                |
| 4.4.9  | Conta analítica    | Texto (50)   | Não |                |
| 4.4.10 | Débito             | Numérico (22,2) | Não |                |
| 4.4.11 | Crédito            | Numérico (22,2) | Não |                |
| 4.4.12 | Descrição          | Texto (100)  | Não |                |

### 6.5. Contabilidade Geral

| ID  | Campo | Tipo         | Obrig| Descrição      |
|----|----|---|----|---|
| 4.5.1  | Entidade do documento | Numérico     | Sim | Identificador numérico da entidade                     |
| 4.5.2  | Tipo de documento     | Texto (2)    | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema |
| 4.5.3  | Ano do documento      | Numérico (4) | Sim | Identificador do ano           |
| 4.5.4  | N.º do documento      | Numérico     | Sim |                |
| 4.5.5  | Ordem | Numérico     | Sim | Posição do registo no documento|
| 4.5.6  | Estado de contabilização | Numérico     | Sim | Quais os estados possíveis? Contabilizado ou não-contab?               |
| 4.5.7  | Conta | Texto (50)   | Sim | Código da conta|
| 4.5.8  | Débito| Numérico (22,2) | Sim |                |
| 4.5.9  | Crédito               | Numérico (22,2) | Sim |                |
| 4.5.10 | Data contabilística   | Data         | Sim | Formato: 31/12/2016            |
| 4.5.11 | Descrição             | Texto (100)  | Não |                |

### 6.6. Contabilidade Orçamental

| ID  | Campo              | Tipo         | Obrig| Descrição      |
|----|---|---|----|---|
| 4.6.1  | Entidade do documento | Numérico     | Sim | Identificador numérico da entidade                     |
| 4.6.2  | Tipo de documento  | Texto (2)    | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema |
| 4.6.3  | Ano do documento   | Numérico (4) | Sim | Identificador do ano           |
| 4.6.4  | N.º do documento   | Numérico     | Sim | Código identificador do documento                      |
| 4.6.5  | Ordem              | Numérico     | Sim | Posição do registo no documento|
| 4.6.6  | Estado             | Numérico     | Sim |                |
| 4.6.7  | Conta              | Texto (50)   | Sim | Código da conta|
| 4.6.8  | Débito             | Numérico (22,2) | Sim |                |
| 4.6.9  | Crédito            | Numérico (22,2) | Sim |                |
| 4.6.10 | Data contabilística   | Data         | Sim | Formato: dia/mês/ano. Ex: 31/12/2016                   |
| 4.6.11 | Descrição          | Texto (100)  | Não |                |

### 6.7. Contabilidade Pública

| ID | Campo            | Tipo     | Obrig| Descrição        |
|---|---|---|----|---|
| 4.7.1 | Ano              | Numérico | Sim | Identificador do ano                     |
| 4.7.2 | Conta            | Texto (20)  | Sim | Código da conta  |
| 4.7.3 | D/R              | Texto (1)   | Sim | Despesa/Receita  |
| 4.7.4 | Nome             | Texto (100) | Não | Nome da conta    |
| 4.7.5 | Tipo             | Texto (1)   | Não | Identificador do tipo da conta: (M)ovimento ou (A)cumulação |
| 4.7.6 | Conta de acumulação | Texto (20)  | Não | Código do classificador económico de acumulação          |

### 6.8. Cabeçalhos dos documentos contabilísticos

| ID  | Campo        | Tipo         | Obrig| Descrição      |
|----|---|---|----|---|
| 4.8.1  | Entidade     | Numérico     | Sim | Identificador numérico da entidade                     |
| 4.8.2  | Tipo         | Texto (2)    | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema |
| 4.8.3  | Ano          | Numérico (4) | Sim | Identificador do ano           |
| 4.8.4  | Numero       | Numérico     | Sim |                |
| 4.8.5  | Data         | Data         | Sim | Formato: 31/12/2016            |
| 4.8.6  | Valor        | Numérico (22,2) | Sim |                |
| 4.8.7  | CONDATACONT  | Data         | Sim | Formato: 31/12/2016            |
| 4.8.8  | Arquivo      | Numérico     | Sim |                |
| 4.8.9  | Diário       | Numérico     | Sim |                |
| 4.8.10 | Criador      | Numérico (10)   | Não |                |
| 4.8.11 | Número 2     | Numérico (20)   | Não |                |
| 4.8.12 | Número Pagamento             | Texto (20)   | Não |                |
| 4.8.13 | Instituição Bancária         | Texto (50)   | Não |                |
| 4.8.14 | Valor da transferência bancaria | Numérico (22,2) | Não |                |
| 4.8.15 | Data vencimento              | Data         | Sim | Formato: 31/12/2016            |
| 4.8.16 | Dias vencimento              | Numérico     | Sim |                |
| 4.8.17 | Tipo pagamento               | Numérico (4) | Não |                |

### 6.9. Registos Contabilísticos Relacionados

| ID | Campo  | Tipo   | Obrig| Descrição     |
|---|----|---|----|----|
| 4.9.1 | Documento subsequente - Entidade               | Numérico  | Sim | Identificador numérico da entidade subsequente    |
| 4.9.2 | Documento subsequente - Tipo                   | Texto (2) | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema         |
| 4.9.3 | Documento subsequente - Ano                    | Numérico  | Sim | Ano do documento subsequente      |
| 4.9.4 | Documento subsequente – Nº                     | Numérico  | Sim |               |
| 4.9.5 | Nº de documentos subsequentes resultantes do documento precedente | Numérico  | Sim | Ex.: Nº de pagamentos com origem na mesma fatura  |
| 4.9.6 | Documento precedente - Entidade                | Numérico  | Sim | Identificador numérico da entidade precedente     |
| 4.9.7 | Documento precedente - Tipo                    | Texto (2) | Sim | Identificador alfanumérico do tipo de documento contabilístico do sistema         |
| 4.9.8 | Documento precedente - Ano                     | Numérico  | Sim | Documento imediatamente anterior a outro documento, conforme os fluxos financeiros do sistema. Ex: Cabimento (CB) precede o Compromisso (CM) |
| 4.9.9 | Documento precedente – Nº                      | Numérico  | Sim |               |
