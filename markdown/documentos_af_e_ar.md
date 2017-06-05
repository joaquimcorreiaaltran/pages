# DOCUMENTOS DE ANULAÇÃO DE FATURAS E ANULAÇÃO DE RECEITAS

# Índice

1.  [Introdução](#introducao)
2.  [Criação de novo tipo de documento – Anulação de Faturas (AF)](#af)
3.  [Criação de novo tipo de documento – Anulação de Receita (AR)](#ar)


<a name="introducao"></a>

# 1.	Introdução

Em conformidade com as recomendações da Autoridade Tributária e Aduaneira (AT), não é
possível anular diretamente uma fatura. A anulação do movimento de uma fatura é feita
através da emissão de uma nota de crédito.

Desta forma, no sistema SICC houve a necessidade de documentar os seguintes:

-   AF - Anulação de faturas (P2 + NC);
-   AR - Anulação de receitas (FD + CC).

Sem reflexo para a contabilidade, o que se pretende com estes dois tipos de documentos é a
regularização dos mesmos, de modo a que o seu impacto no final seja 0.

Assim, pretende-se com o seguinte capítulo mostrar a posição destes novos documentos no
novo desenho de fluxograma, bem como explicar o respetivo procedimento de regularização.

<a name="af"></a>

# 2. Criação de novo tipo de documento – Anulação de Faturas (AF)

# Índice

No fluxograma do ciclo da despesa, irá surgir um novo tipo de documento designado de AF (anulação de faturas).

Este novo tipo de documento surgirá assim no fluxograma:

![fluxograma despesa.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/fluxograma_despesa.png)

Proveniente exclusivamente do P2 ou da NC (exceto RAP), este novo tipo de documento obriga o utilizador a selecionar pelo menos uma fatura e uma NC com o objetivo do resultado final ter valor “0” para proceder ao registo de anulação.


Desta forma, no menu:

![Anulação P2eNc.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/Anula%C3%A7%C3%A3o_P2eNc.png)

Estes movimentos não são refletidos na contabilidade, sendo que o principal objetivo dos
documentos selecionados (P2 e NC) seja a sua regularização, não necessitando de registos
contabilísticos.

O número do documento pode ser atribuído pelo sistema. Na tela abaixo demonstrada,
foram adicionados campos de procura dos documentos que permitem a associação entre NC
e P2.

![Anulação de faturas AF.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/AF.png)

Ao premir o botão “imprimir”, o comando redireciona para a tela abaixo mostrada, na qual o utilizador escolhe os critérios de seleção da impressão:

![Image_A.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/Image_A.png)

Na impressão, o resultado da Anulação de Faturas deve ser:

![Image_B.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/Image_B.png)

<a name="ar"></a>

# 3. Criação de novo tipo de documento – Anulação de Receita (AR)

No fluxograma do ciclo da receita, irá surgir um novo tipo de documento designado de AR (anulação de Receitas).

Este novo tipo de documento surgirá assim no fluxograma:

![fluxograma receita.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/fluxograma_receita.png)

Proveniente exclusivamente de, FD e CC (exceto RNAP), este novo tipo de documento obrigam o utilizador a selecionar pelo menos uma FD e uma CC com o objetivo do resultado final ter valor “0” para proceder ao registo de anulação de receita.

Desta forma, no menu:

![anulação FD e CC.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/anula%C3%A7%C3%A3o_FD_e_CC.png)

Estes movimentos não são refletidos na contabilidade, sendo que o principal objetivo dos
documentos selecionados (FD e CC) seja a sua regularização, não necessitando de registos
contabilísticos.

O número do documento pode ser atribuído pelo sistema. Na tela abaixo demonstrada, foram adicionados campos de procura dos documentos que permitem a associação entre CC e FD.

![Anulação de Receitas AR.png](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/AR.png)

**Nota**: Estes novos documentos devem aparecer no extrato de entidade.

Nas restantes listagens de gestão de terceiros o documento P2 e NC ficam como regularizados.

Ao premir o botão “imprimir”, o comando redireciona para a tela abaixo mostrada, na qual o utilizador escolhe os critérios de seleção da impressão:

![Encontro_de_Contas](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/Encontro_de_Contas.png)

Na impressão, o resultado da Anulação de Receita ou Anulação de Faturas deve ser:

![resultado_da_impessao](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/resultado_da_impessao.png)

![resultado_da_impessao2](https://spmssicc.github.io/pages/markdown/assets/documentos_af_e_ar/resultado_da_impessao2.png)
