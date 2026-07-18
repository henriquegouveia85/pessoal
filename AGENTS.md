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
   - O Netlify CLI faz o deploy dos arquivos
   - O site é atualizado em: https://chic-banoffee-aff099.netlify.app

> ⚠️ Toda alteração deve atualizar o `docs.md` com as explicações do que foi modificado.
