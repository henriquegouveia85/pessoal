# Fluxo de trabalho

1. Faça as alterações necessárias nos arquivos do projeto
2. **Atualize o `docs.md`** com a descrição do que foi alterado e como funciona
3. Commit e push para o GitHub:
   ```
   git add .
   git commit -m "descrição das alterações"
   git push
   ```
4. Automaticamente:
   - O GitHub Action (`.github/workflows/deploy.yml`) dispara
   - O Netlify CLI faz o deploy dos arquivos estáticos (HTML/CSS/JS)
   - O clasp faz o push do `Codigo.gs` e publica no Google Apps Script
    - O site é atualizado automaticamente

> ⚠️ Toda alteração deve atualizar o `docs.md` com as explicações do que foi modificado.

---

# Configuração em computador novo

## CLIs necessários

```bash
# Netlify CLI — deploy dos arquivos estáticos
npm install -g netlify-cli

# clasp — deploy do Google Apps Script
npm install -g @google/clasp
```

## Autenticações

```bash
# 1. Netlify — login via token
netlify login --access-token <TOKEN>
# Token salvo em: https://app.netlify.com/user/applications/personal

# 2. clasp — login no Google Apps Script
clasp login --no-localhost
# Abre link no navegador → autorizar → colar URL de volta no terminal
# Habilite a API em: https://script.google.com/home/usersettings
```

## Secrets do GitHub (já configurados)

No repositório > Settings > Secrets and variables > Actions:
- `NETLIFY_AUTH_TOKEN` — token do Netlify
- `CLASPRC_JSON` — credenciais do clasp (~/.clasprc.json)

## Script ID do Google Apps Script

`1q1zUs3W3cHfKz0tp_13z6cpw6Fo9aAKksjd__7Xn99yeOKBFASGh7S8m`

## Deploy ID do Google Apps Script (produção)

`AKfycbwVGX4sNDlau179tcFH3sGHnh3TBMTPpuBajcd4HMgny7GsODOQTKR43YXikkKn2yBwmg`

## Site ID do Netlify

`270bde21-56c9-4ee9-bf34-02e178dfb5fc`
