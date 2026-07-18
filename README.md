# 📸 Galeria de Fotos - Casamento

**Maria Paula & Wilson — 18 de Setembro de 2026**

Sistema interativo onde os convidados enviam fotos pelo celular e elas aparecem em tempo real no telão da festa.

## ✨ Funcionalidades

- **Upload** por câmera ou galeria direto do celular (limite de 50 fotos por convidado)
- **Mensagens**: convidados deixam recados junto com as fotos
- **Moderação**: ative o filtro no admin para aprovar/rejeitar antes de exibir
- **Telão ao vivo**: mural com rolagem automática + destaque em tempo real
- **Slideshow**: inicia automaticamente após 5 min de inatividade ou com tecla **S**
- **Modos de exibição**: cover, contain, blur, fill (tecla **B**)
- **Painel admin**: gráfico de atividade, busca por nome, seleção em lote, download individual, exportar relatório
- **Offline**: fotos enviadas sem conexão entram em fila e sobem automaticamente quando a internet volta

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML + CSS + JS puro |
| Backend | Google Apps Script + Google Drive |
| Hospedagem | Netlify (deploy automático) |
| CI/CD | GitHub Actions |

## 📂 Estrutura

```
├── index.html          # Upload dos convidados
├── galeria.html        # Telão ao vivo / slideshow
├── admin.html          # Painel administrativo
├── qrcode.html         # QR code do evento
├── intrucoes.html      # Instruções de uso
├── Codigo.gs           # Google Apps Script (backend)
├── .github/workflows/  # GitHub Action (deploy automático)
└── modelo comercial/   # Versão alternativa modular
```

## 🔧 Desenvolvimento Local

```bash
# 1. Clone o repositório
git clone https://github.com/henriquegouveia85/pessoal.git
cd pessoal

# 2. Instale as CLIs necessárias
npm install -g netlify-cli @google/clasp

# 3. Autentique
netlify login --access-token SEU_TOKEN
clasp login --no-localhost

# 4. Edite os arquivos e faça push
git add .
git commit -m "descrição das alterações"
git push
```

> O GitHub Action faz o deploy automático no Netlify (arquivos estáticos) e no Google Apps Script (via clasp).

## 📄 Licença

GNU General Public License v2 — veja [LICENSE](LICENSE).
