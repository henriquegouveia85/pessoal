# Galeria de Fotos - Casamento

Sistema de galeria interativa para eventos, onde convidados enviam fotos que aparecem em tempo real no telão.

## Estrutura

### 📄 Páginas

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página de upload para convidados. Envio por câmera ou galeria com limite de 50 fotos por pessoa. |
| `galeria.html` | Telão ao vivo. Mostra fotos em destaque + mural com rolagem automática e slideshow. |
| `admin.html` | Painel administrativo com estatísticas, moderação, filtro, deleção em lote, gráfico de atividade. |
| `qrcode.html` | Gera QR code com os links do evento para compartilhar. |
| `intrucoes.html` | Instruções de configuração e uso do sistema. |

### ⚙️ Backend

| Arquivo | Descrição |
|---------|-----------|
| `Codigo.gs` | Google Apps Script que gerencia upload, listagem, moderação e exportação via Google Drive. |

### 📁 modelo comercial/

Versão alternativa com arquivos separados para cada funcionalidade e configuração centralizada em `config.js`.

## Funcionalidades

- **Upload de fotos** via câmera ou galeria do celular
- **Moderação** ativável: fotos pendentes aguardam aprovação antes de aparecer no telão
- **Mensagens**: convidados podem deixar recados junto com as fotos (ativável/desativável no admin)
- **Slideshow** automático (5 min de inatividade) ou manual (tecla **S**)
- **Modos de exibição**: cover, contain, blur, fill (tecla **B**)
- **Tela de agradecimento** (tecla **A**)
- **Painel admin** com gráfico de atividade por horário, exportação de relatório, e controle de pausa
- **Offline**: fotos enviadas sem conexão entram em fila e são enviadas automaticamente quando a internet volta

## Deploy

O deploy é automático via GitHub Actions. Ao fazer push na branch `main`:

1. O GitHub Action é disparado
2. O Netlify CLI faz o deploy dos arquivos estáticos
3. O site é atualizado automaticamente

> ⚠️ O arquivo `Codigo.gs` (Google Apps Script) é atualizado automaticamente via GitHub Actions usando o **clasp** (CLI do Google Apps Script).

## README

O arquivo `README.md` na raiz do projeto é a página inicial do repositório no GitHub. Contém links, instruções de uso e setup local.

## Licença

Este projeto está licenciado sob a **GNU General Public License v2**.
