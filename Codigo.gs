const PASTA_ID = '1c9ZZsg7TpM_cHbWFxFqeOw2SymYQqfqW';
const ARQUIVO_PAUSA = 'galeria_pausada.txt';

function doPost(e) {
  try {
    Logger.log('INICIO doPost');
    if (!e || !e.postData) {
      return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'postData vazio'})).setMimeType(ContentService.MimeType.JSON);
    }
    const data = JSON.parse(e.postData.contents);
    const acao = data.acao || 'upload';

    if (acao === 'pausar') {
      const pausar = data.pausar;
      const pasta = DriveApp.getFolderById(PASTA_ID);
      try {
        const arquivos = pasta.getFilesByName(ARQUIVO_PAUSA);
        while (arquivos.hasNext()) arquivos.next().setTrashed(true);
      } catch (err) {}
      if (pausar) {
        const blob = Utilities.newBlob('PAUSADO', 'text/plain', ARQUIVO_PAUSA);
        pasta.createFile(blob);
      }
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, pausada: pausar})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'definir_fullscreen') {
      const ativo = data.ativo === true || data.ativo === 'true';
      const pasta = DriveApp.getFolderById(PASTA_ID);
      try {
        const arquivos = pasta.getFilesByName('fullscreen_auto.txt');
        while (arquivos.hasNext()) arquivos.next().setTrashed(true);
      } catch (err) {}
      if (ativo) {
        const blob = Utilities.newBlob('ATIVO', 'text/plain', 'fullscreen_auto.txt');
        pasta.createFile(blob);
      }
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, ativo: ativo})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'verificar_fullscreen') {
      const pasta = DriveApp.getFolderById(PASTA_ID);
      const arquivos = pasta.getFilesByName('fullscreen_auto.txt');
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, ativo: arquivos.hasNext()})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'definir_modo') {
      const modo = data.modo || 'cover';
      const pasta = DriveApp.getFolderById(PASTA_ID);
      try {
        const arquivos = pasta.getFilesByName('modo_exibicao.txt');
        while (arquivos.hasNext()) arquivos.next().setTrashed(true);
      } catch (err) {}
      const blob = Utilities.newBlob(modo, 'text/plain', 'modo_exibicao.txt');
      pasta.createFile(blob);
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, modo: modo})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'verificar_modo') {
      const pasta = DriveApp.getFolderById(PASTA_ID);
      const arquivos = pasta.getFilesByName('modo_exibicao.txt');
      let modo = 'cover';
      if (arquivos.hasNext()) modo = arquivos.next().getBlob().getDataAsString().trim();
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, modo: modo})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'verificar_pausa') {
      const pasta = DriveApp.getFolderById(PASTA_ID);
      const arquivos = pasta.getFilesByName(ARQUIVO_PAUSA);
      const pausada = arquivos.hasNext();
      return ContentService.createTextOutput(JSON.stringify({sucesso: true, pausada: pausada})).setMimeType(ContentService.MimeType.JSON);
    }

    if (acao === 'deletar') {
      const idArquivo = data.id;
      if (!idArquivo) {
        return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'ID não fornecido'})).setMimeType(ContentService.MimeType.JSON);
      }
      try {
        DriveApp.getFileById(idArquivo).setTrashed(true);
        return ContentService.createTextOutput(JSON.stringify({sucesso: true})).setMimeType(ContentService.MimeType.JSON);
      } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: err.toString()})).setMimeType(ContentService.MimeType.JSON);
      }
    }

    if (acao === 'exportar') {
      try {
        const pasta = DriveApp.getFolderById(PASTA_ID);
        const arquivos = pasta.getFiles();
        const fotos = [], mensagens = [];
        const convidadosSet = new Set();
        while (arquivos.hasNext()) {
          const arquivo = arquivos.next();
          if (arquivo.isTrashed()) continue;
          if (arquivo.getMimeType().startsWith('image/')) {
            const descricao = arquivo.getDescription() || '';
            let nome = 'Convidado', mensagem = '';
            if (descricao) {
              const partes = descricao.split(': ');
              if (partes.length > 1) { nome = partes[0]; mensagem = partes.slice(1).join(': '); }
              else nome = descricao;
            }
            fotos.push({ nome: arquivo.getName(), nomeConvidado: nome, mensagem: mensagem, data: arquivo.getDateCreated(), url: arquivo.getUrl() });
            if (nome !== 'Convidado') convidadosSet.add(nome);
            if (mensagem) mensagens.push({nome: nome, mensagem: mensagem, data: arquivo.getDateCreated()});
          }
        }
        let relatorio = 'RELATÓRIO DO CASAMENTO - Maria Paula & Wilson\n';
        relatorio += 'Gerado em: ' + new Date().toLocaleString('pt-BR') + '\n';
        relatorio += '=====================================\n\n';
        relatorio += '📊 ESTATÍSTICAS:\n';
        relatorio += '- Total de fotos: ' + fotos.length + '\n';
        relatorio += '- Total de convidados únicos: ' + convidadosSet.size + '\n';
        relatorio += '- Total de mensagens: ' + mensagens.length + '\n\n';
        relatorio += '💬 MENSAGENS DOS CONVIDADOS:\n';
        relatorio += '-------------------------------------\n';
        mensagens.forEach(m => {
          relatorio += '\n' + m.nome + ' (' + m.data + '):\n"' + m.mensagem + '"\n';
        });
        relatorio += '\n\n📸 LISTA DE FOTOS:\n';
        relatorio += '-------------------------------------\n';
        fotos.forEach(f => {
          relatorio += '\n- ' + f.nome + '\n  Convidado: ' + f.nomeConvidado + '\n';
          if (f.mensagem) relatorio += '  Mensagem: "' + f.mensagem + '"\n';
          relatorio += '  Link: ' + f.url + '\n';
        });
        const blob = Utilities.newBlob(relatorio, 'text/plain', 'Relatorio_Casamento_' + new Date().getTime() + '.txt');
        const arquivoRelatorio = pasta.createFile(blob);
        return ContentService.createTextOutput(JSON.stringify({
          sucesso: true, url: arquivoRelatorio.getUrl(),
          stats: { totalFotos: fotos.length, totalConvidados: convidadosSet.size, totalMensagens: mensagens.length }
        })).setMimeType(ContentService.MimeType.JSON);
      } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: err.toString()})).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // UPLOAD DE FOTO
    const base64Image = data.image;
    const nomeConvidado = data.nome || 'Convidado';
    const mensagem = data.mensagem || '';
    if (!base64Image) {
      return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'imagem vazia'})).setMimeType(ContentService.MimeType.JSON);
    }

    // Rate limit: max 1 upload a cada 5 segundos por nome
    const props = PropertiesService.getScriptProperties();
    const chaveRate = 'rate_' + nomeConvidado;
    const ultimoEnvio = parseFloat(props.getProperty(chaveRate)) || 0;
    const agora = Date.now();
    if (agora - ultimoEnvio < 5000) {
      return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'Aguarde alguns segundos antes de enviar outra foto.'})).setMimeType(ContentService.MimeType.JSON);
    }
    props.setProperty(chaveRate, agora.toString());

    const bytes = Utilities.base64Decode(base64Image);
    if (bytes.length > 3 * 1024 * 1024) {
      return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: 'Imagem muito grande. Máximo permitido: 3MB.'})).setMimeType(ContentService.MimeType.JSON);
    }
    const timestamp = new Date().getTime();
    const nomeArquivo = nomeConvidado + '_' + timestamp + '.jpg';
    const blob = Utilities.newBlob(bytes, 'image/jpeg', nomeArquivo);
    const pasta = DriveApp.getFolderById(PASTA_ID);
    const arquivo = pasta.createFile(blob);
    arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    if (mensagem) arquivo.setDescription(nomeConvidado + ': ' + mensagem);
    else arquivo.setDescription(nomeConvidado);
    Logger.log('SUCESSO: ' + arquivo.getId());
    return ContentService.createTextOutput(JSON.stringify({sucesso: true, id: arquivo.getId()})).setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    Logger.log('ERRO: ' + erro.toString());
    return ContentService.createTextOutput(JSON.stringify({sucesso: false, erro: erro.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const pasta = DriveApp.getFolderById(PASTA_ID);
    const arquivos = pasta.getFiles();
    const fotos = [];
    while (arquivos.hasNext()) {
      const arquivo = arquivos.next();
      if (arquivo.isTrashed()) continue;
      if (arquivo.getMimeType().startsWith('image/')) {
        try { arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (err) {}
        fotos.push({
          id: arquivo.getId(),
          nome: arquivo.getName(),
          data: arquivo.getDateCreated().getTime(),
          url: 'https://lh3.googleusercontent.com/d/' + arquivo.getId(),
          descricao: arquivo.getDescription() || ''
        });
      }
    }
    fotos.sort((a, b) => b.data - a.data);
    return ContentService.createTextOutput(JSON.stringify(fotos)).setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({erro: erro.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
