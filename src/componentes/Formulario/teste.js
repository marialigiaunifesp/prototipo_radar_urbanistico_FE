const variaveis = {
    processoJudicial: {
      label: "Processo Judicial",
      options: {
        numeroProcesso: "Número do Processo",
        nomeParteRequerente: "Nome da parte Requerente",
        nomeParteRequerida: "Nome da parte Requerida",
        RGParteRequerida: "RG da parte Requerida",
        RGParteRequerente: "RG da parte Requerente",
        CPFParteRequerida: "CPF da parte Requerida",
        CPFParteRequerente: "CPF da parte Requerente",
        numeroCartaPrecatorioOrigem: "Nº da Carta Precatório na Origem",
        nomeAdvogado: "Nome do Advogado",
        OAB: "OAB",
        numeroDocumentoDelegacia: "Nº do Documento na Delegacia",
        CDA: "CDA",
        classe: "Classe",
        area: "Área",
        assunto: "Assunto",
        foro: "Foro",
        fara: "Vara",
        juiz: "Juiz",
        confte: "Confte",
        dataMovimentacoes: "Data das Movimentações",
        despacho: "Despacho",
        codigoConsultaProcesso: "Código de consulta do processo",
        prazoManifestacaoJudicial: "Prazo para manifestação judicial",
      }
    },
    matriculaImovel: {
      label: "Matricula do Imóvel",
      options: {
        numeroMatricula: "Número matrícula",
        numeroMatriculaAntiga: "Número matrícula (antiga)",
        cartorioRegistroImoveis: "Cartório de Registro de Imóveis (CRI)",
        comarca: "Comarca",
        inscricaoImobiliaria: "Inscrição Imobiliária",
        endereco: "Endereço",
        bairro: "Bairro",
        regiao: "Regiao",
        denominacaoImovel: "Denominação do Imóvel",
        codigoINCRA: "Código INCRA",
        SICAR: "SICAR",
        SICARSP: "SICAR-SP",
        proprietario: "Proprietário",
        vendedor: "Vendedor",
        formaAquisicao: "Forma de Aquisição",
        dataRegistroTransacao: "Data do registro da Transação",
        CCIR: "CCIR",
      },
    },
    oficio: {
      label: "Ofício",
      options: {
        numeroOficio: "Número do ofício",
        orgaoOuInstituicaoRemetenteOficio:
          "Órgão ou Instituição Remetente do Ofício",
        comentarioSobreOficio: "Comentário sobre Ofício",
      },
    },
    conhecimentoLugar: {
      label: "Conhecimento do Lugar",
      options: {
        regiao: "Regiao",
      },
    },
    diversasFontes: {
      label: "Diversas Fontes",
      options: {
        CPFProprietario: "CPF do Proprietário",
        areaImovel: "Área do Imóvel",
        CCIR: "CCIR",
        unidade: "Unidade",
        CNPJ: "CNPJ",
        telefoneContato: "Telefone de Contato",
        emailContato: "E-mail de Contato",
        possuiPlantaParcelamento: "Possui Planta de Parcelamento",
        levantamentoPlanialtimetrico: "Levantamento Planialtimétrico",
        coordenadasAproximadasLocal: "Coordenadas Aproximadas do Local",
      },
    },
    contratoCompraVenda: {
      label: "Contrato de Compra e Venda",
      options: {
        nomeEmpreendimento: "Nome do Empreendimento",
      },
    },
    vistoria: {
      label: "Vistória",
      options: {
        energiaEletricaDomiciliar: "Energia elétrica domiciliar",
        abastecimentoAgua: "Abastecimento de água",
        coletaTratamentoEsgotoSanitario:
          "Coleta e Tratamento de Esgoto Sanitário",
        iluminaçãoPublica: "Iluminação Pública",
        drenagemAguasPluviais: "Drenagem de águas pluviais",
        pavimentacao: "Pavimentação",
        localParceladaAcessadaDiretamenteViaPublica:
          "Local parcelada acessada diretamente por via pública?",
        existenciaEdificacoesLocal: "Existência de edificações no local",
        quantidadeAproximadaEdificacoes: "Quantidade aproximada de edificações",
        usoConstatado: "Uso Constatado",
        pontoAtencao: "Ponto de atenção",
        lotesDemarcadosOuFechamentoArea:
          "Lotes demarcados ou fechamento da área?",
        existenciaColetaResiduosSolidosLocal:
          "Existência de coleta de resíduos sólidos no local",
        proximidadeLocalAtendidoTransporteColetivo:
          "Proximidade de local atendido por transporte coletivo",
      },
    },
    processoAdministrativo: {
      label: "Processo Administrativo",
      options: {
        advogadoParte: "Advogado da Parte",
        responsávelTecnicoParte: "Responsável técnico da parte",
        pontoFocalMoradores: "Ponto Focal dos Moradores",
        notificacao: "Notificação",
        prazoManifestacao: "Prazo para manifestação (notificação)",
        dataPublicacaoNotificacaoBoletimOficial:
          "Data de publicação da notificação em boletim oficial (quando houver)",
        recursoNotificacao: "Recurso de Notificação",
        processoREURB: "Processo de REURB (mestre)",
      },
    },
    boletimOficial: {
      label: "Boletim Oficial",
      options: {
        linkPublicaoEdital: "Link de publicação de edital",
      },
    },
    fichaCadastramentoSocioeconomico: {
      label: "Ficha de Cadastramento Socioeconômico",
      options: {
        fichaCadastramentoIndividual: "Ficha de cadastramento individual",
      },
    },
    legislacao: {
      label: "Legislação",
      options: {
        zonaUso: "Zona de uso",
      },
    },
    dataGEOAmbiente: {
      label: "DataGEO Ambiente",
      options: {
        autoInfracaoAmbiental: "Auto de Infração Ambiental (AIA)",
      },
    },
    IBGE: {
      label: "IBGE",
      options: {
        aglomeradoSubnormal: "Aglomerado subnormal",
        areaRisco: "Área de risco - BATER",
        Cod_Mun: "Cod_Mun",
      },
    },
    dadoGeografico: {
      label: "Dado Geográfico",
      options: {
        distanciaEquipamentoSaudeProximo:
          "Distância do equipamento de saúde mais próximo",
        distanciEquipamentoEducacaoProximo:
          "Distância do equipamento de educação mais próximo",
        proximidadeLocalAtendidoTransporteColetivo:
          "Proximidade de local atendido por transporte coletivo",
      },
    },
  };


console.log( Object.keys(variaveis))