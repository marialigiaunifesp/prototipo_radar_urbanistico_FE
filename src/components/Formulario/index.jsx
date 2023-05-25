/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import axios from 'axios';

function Formulario() {
  const [documentoSelecionado, setDocumentoSelecionado] = useState("");
  const [variavelSelecionada, setVariavelSelecionada] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [referencia, setReferencia] = useState("");
  const [referenciaNotes, setReferenciaNotes] = useState("");
  const [dataDocumento, setDataDocumento] = useState("");
  const [areaAnalise, setAreaAnalise] = useState("");

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
      },
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
      label: "Vistoria",
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

  const handleAddInput = (event) => {
    event.preventDefault();
    if (documentoSelecionado && variavelSelecionada && inputValue) {
      setInputValues([
        ...inputValues,
        {
          documento: documentoSelecionado,
          variavel: variavelSelecionada,
          valor: inputValue,
          referencia,
          referenciaNotes,
          dataDocumento,
          areaAnalise,
        },
      ]);
      setReferencia("");
      setReferenciaNotes("");
      setDataDocumento("");
      setAreaAnalise("");
      setDocumentoSelecionado("");
      setVariavelSelecionada("");
      setInputValue("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValues.length > 0) {
      // aqui enviar os valores do formulário para o servidor
      const jsonList = inputValues.map(
        ({
          documento,
          variavel,
          valor,
          areaAnalise,
          dataDocumento,
          referencia,
        }) => ({
          "documento": variaveis[documento].label,
          "variavel": variaveis[documento].options[variavel],
          "valor": valor,
          "areaAnalise": areaAnalise,
          "dataDocumento": dataDocumento,
          "referenciaNotes": referenciaNotes,
          "referencia": referencia,
        })
      );

    console.log(jsonList);

    axios.post('URL_DA_SUA_API', jsonList)
    .then(response => {
      console.log('Dados enviados com sucesso:', response.data);
    })
    .catch(error => {
      console.error('Erro ao enviar os dados:', error);
    });

    }
  };

  const handleDocumentoChange = (event) => {
    setDocumentoSelecionado(event.target.value);
    setReferencia("");
    setReferenciaNotes("");
    setDataDocumento("");
    setAreaAnalise("");
    setVariavelSelecionada("");
    setInputValue("");
    console.log("Documento Selecionado", event.target.value);
  };
  const handleVariavelChange = (event) => {
    setVariavelSelecionada(event.target.value);

    console.log("Variavel Selecionado", event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleReferencia = (event) => {
    setReferencia(event.target.value);
  };

  const handleReferenciaNotes = (event) => {
    setReferenciaNotes(event.target.value);
  };

  const handleDataDocumento = (event) => {
    setDataDocumento(event.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const handleAreaAnalise = (event) => {
    setAreaAnalise(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="documento">Documento</label>
        <select
          id="documento"
          name="documento"
          value={documentoSelecionado}
          onChange={handleDocumentoChange}
        >
          <option value="">Selecione o Documento</option>
          {Object.entries(variaveis).map(([documento, { label }]) => (
            <option value={documento}>{label}</option>
          ))}
        </select>

        {(Object.keys(variaveis).includes(documentoSelecionado) && (
          <div>
            <label htmlFor="variavel">Variável</label>
            <select
              id="variavel"
              name="variavel"
              value={variavelSelecionada}
              onChange={handleVariavelChange}
            >
              <option value="">Selecione a Variável</option>
              {Object.entries(variaveis[documentoSelecionado].options).map(
                ([chave, valor]) => (
                  <option value={chave}>{valor}</option>
                )
              )}
            </select>
          </div>
        )) || (
          <div>
            <label>Variável</label>
            <select>
              <option value="">Primeiro Selecione o Documento</option>
            </select>
          </div>
        )}

        {(variavelSelecionada && (
          <div>
            <label htmlFor={variavelSelecionada}>
              {`Valor ${
                variaveis[documentoSelecionado].options[variavelSelecionada]}`}
            </label>
            <input
              id={variavelSelecionada}
              name={variavelSelecionada}
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        )) || (
          <div>
            <label>Valor</label>
            <input value="Selecione o Documento e a Variável" />
          </div>
        )}

        <div>
          <p>
            Indique onde você viu esse dado. Ex: Processo nº xxxxxx, link na
            internet, contrato, planta, etc.
          </p>
          <label htmlFor="referenciaNotes">Notas de Referência</label>
          <input
            id={referenciaNotes}
            value={referenciaNotes}
            onChange={handleReferenciaNotes}
          />
          <label htmlFor="referencia">Link da Referência</label>
          <input
            id={referencia}
            value={referencia}
            onChange={handleReferencia}
          />
          <label htmlFor="dataDocumento">Data do documento</label>
          <input
            id={dataDocumento}
            type="date"
            value={dataDocumento}
            onChange={handleDataDocumento}
          />
          <p>
            Data do documento de onde você pegou o dado. Se não souber informar,
            selecione a opção “Não sei”.
          </p>
          <label htmlFor="areaAnalise">Área de análise</label>

          <select>
            <option value="">dados</option>
          </select>

          <p>Selecionar uma das opções possíveis</p>
        </div>

        <button type="button" onClick={handleAddInput}>
          Adicionar
        </button>
        {inputValues.length > 0 && <button type="submit">Enviar</button>}
      </form>

      <ul>
        {inputValues.map(
          ({
            documento,
            variavel,
            valor,
            areaAnalise,
            dataDocumento,
            referencia,
            referenciaNotes,
          }) => (
            <li>
              <p>Documento: {variaveis[documento].label}</p>
              <p>Variável: {variaveis[documento].options[variavel]}</p>
              <p>Valor: {valor}</p>
              <p>Area Analise: {areaAnalise}</p>
              <p>Data Documento: {dataDocumento}</p>
              <p>Referência: {referenciaNotes}</p>
              <p>Link Ref.: {referencia}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Formulario;
