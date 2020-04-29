# SunnyHUB

Sobre: SunnyHUB foi criada para pioneirizar no Brasil o modelo de TPO ("third-party ownership") para sistemas fotovoltaicos, como os populares nos Estados Unidos e Austrália "solar leasing" e "solar PPA".
Em outras palavras, queremos que as pessoas possam ter em suas casas energia mais limpa e mais barata, por meio da energia solar, sem precisar comprar os caros equipamentos. O modelo é muito mais acessível, com uma barreira de entrada muito menor, contribuindo para a nossa visão de um Brasil funcionando com energia do Sol. Ainda nessa década, queremos energizar 400.000 residências.

## Estrutura

Esse repositório possui tanto o site, quanto a função lambda (AWS Serverless) para lidar com a submissão do contato de e-mail.

### Website

Há o arquivo index.html, com o esqueleto do site. Os demais arquivos estão distribuídos nas pastas "Resources" (arquivos próprios) e "Vendors" (arquivos vindo de fontes externas).
Há os arquivos: style.css (estilo, layout); queries.css (usei para tornar o site responsivo); script.js (efeitos em cliques).

### Lambda

Função (AWS Lambda) que atua como proxy do formulário de contato, para poder enviar o e-mail de contato (usando AWS SES), prevenindo o flood do formulário, com uma blacklist (usando AWS DynamoDB).

## Deploy

O site é atualizado automaticamente ao commitarmos na master, usando Github Actions.
