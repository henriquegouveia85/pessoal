# Fluxo de trabalho

1. Faça as alterações necessárias nos arquivos do projeto
2. Commit e push para o GitHub:
   ```
   git add .
   git commit -m "descrição das alterações"
   git push
   ```
3. Automaticamente:
   - O GitHub Action (`.github/workflows/deploy.yml`) dispara
   - Ele chama o webhook do Netlify
   - O Netlify faz o deploy da branch `main`
   - O site é atualizado em: https://chic-banoffee-aff099.netlify.app
