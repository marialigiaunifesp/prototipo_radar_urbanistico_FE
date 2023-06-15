/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */


import React, { useState } from "react";
import axios from 'axios';
import './styled.css'
import { v4 as uuid } from 'uuid';

function Formulario() {
  const [formulario, setFormulario] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documento, setDocumento] = useState("");
  const [variavel, setVariavel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [referencia, setReferencia] = useState("");
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
    if (documento && variavel && inputValue) {
      if(formulario.length === 0){
        setFormulario([
          ...formulario,
          {
            documento: documento,
            nameDocumento: variaveis[documento].label,
            variavel: variavel,
            nameVariavel: variaveis[documento].options[variavel],
            valor: inputValue,
            referencia: referencia,
            dataDocumento: dataDocumento,
            areaAnalise: areaAnalise,
            id: uuid()
          }
        ]);
      }
      else{
        setFormulario([
          ...formulario,
          {
            documento: documento,
            nameDocumento: variaveis[documento].label,
            variavel: variavel,
            nameVariavel: variaveis[documento].options[variavel],
            valor: inputValue,
            id: uuid()
          }
        ]);
      }
        setReferencia("");
        setDataDocumento("");
        setAreaAnalise("");
        setDocumento("");
        setVariavel("");
        setInputValue(""); 
      }
    

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formulario.length > 0) {
      // aqui enviar os valores do formulário para o servidor
      const formData = new FormData();

      if (selectedFile)
        formData.append(selectedFile.name, selectedFile);


      const jsonList = formulario.map(
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
          "referencia": referencia,
        })
      );
      console.log(jsonList);

      Object.keys(jsonList).forEach((key) => {
        formData.append(key, jsonList[key]);
      });

      console.log(formData);

      axios.post('URL_DA_SUA_API', formData)
        .then(response => {
          console.log('Dados enviados com sucesso:', response.data);
        })
        .catch(error => {
          console.error('Erro ao enviar os dados:', error.message);
        });

    }
  };

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
    setReferencia("");
    setDataDocumento("");
    setAreaAnalise("");
    setVariavel("");
    setInputValue("");
  };

  // eslint-disable-next-line no-unused-vars
  const handleAreaAnalise = (event) => {
    setAreaAnalise(event.target.value);
  };


  return (
    <div className='index'>


      <form onSubmit={handleSubmit}>
        <p id="titulo-formulario">INSERIR DADOS DOCUMENTAIS</p>

        {formulario.map((input) => (
          <div key={input.id} className="form-box">
            <div className="flex-box">
              <div className="documento-box">
                <label>Documento</label>
                <input className="inserted-value" type="text" value={input.nameDocumento} readOnly />
              </div>
              <div className="variavel-box">
                <label>Variável</label>
                <input type="text" className="inserted-value" value={input.nameVariavel} readOnly />
              </div>
              <div className="valor-box">
                <label >{`${input.nameVariavel}`}</label>
                <input className="inserted-value" type="text" id="valor" value={input.valor} readOnly />
              </div>
            </div>
            <div className="flex-box">
              <div className="referencia-box">
                <label>Referência</label>
                <input className="inserted-value" type="text" value={input.referencia} readOnly />
              </div>
              <div className="data-box">
                <label>Data do documento</label>
                <input className="inserted-value"  type="text" value={input.name} readOnly />
              </div>
              <div className="areaAnalise-box">
                <label>Área de análise</label>
                <input className="inserted-value" type="text"  id="areaAnalise" value={input.areaAnalise} readOnly />
              </div>
            </div>
          </div>
        ))}


        <div className="form-box">
          <div className="flex-box">
            <div className="documento-box">
              <label htmlFor="documento">Documento</label>
              <select
                id="documento"
                name="documento"
                value={documento}
                onChange={handleDocumentoChange}>
                <option value="" disabled selected> </option>
                {Object.entries(variaveis).map(([documento, { label }]) => (
                  <option value={documento}>{label}</option>
                ))}
              </select>
              <small >
                Selecione o documento ao qual o dado se refere. Ex: Matrícula do imóvel.
              </small>
            </div>

            {(Object.keys(variaveis).includes(documento) && (
              <div className="variavel-box">
                <label htmlFor="variavel">Variável</label>
                <select
                  id="variavel"
                  name="variavel"
                  value={variavel}
                  onChange={(e) => setVariavel(e.target.value)}
                >
                  <option value="" disabled selected>Selecione a Variável</option>
                  {Object.entries(variaveis[documento].options).map(
                    ([chave, valor]) => (
                      <option value={chave}>{valor}</option>
                    )
                  )}
                </select>
                <small>
                  Escolha que dado você vai inserir.
                </small>
              </div>
            )) || (
                <div className="variavel-box">
                  <label>Variável</label>
                  <select>
                    <option value="" disabled selected> </option>
                  </select>
                  <small >
                    Escolha que dado você vai inserir.
                  </small>
                </div>
              )}

            {(variavel && (
              <div className="valor-box">
                <label htmlFor={variavel} >
                  {variaveis[documento].options[variavel]}
                </label>
                <input
                  id="valor"
                  name={variavel}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <small >
                  Informação referente ao dado que você vai inserir.
                </small>
              </div>
            )) || (
                <div className="valor-box">
                  <label>Valor</label>
                  <input type="text" id="valor" name="valor" />
                  <small >
                    Informação referente ao dado que você vai inserir.
                  </small>
                </div>
              )}
          </div>

          <div className="flex-box">
            <div className="referencia-box">
              <label htmlFor="referencia">Referência</label>
              <input
                id={referencia}
                type="text"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}

              />
              <small >
                Indique onde você viu esse dado. Ex: Processo nº xxxxxx, link na
                internet, contrato, planta, etc.
              </small>
            </div>

            <div className="data-box">
              <label htmlFor="dataDocumento">Data do documento</label>
              <input
                id={dataDocumento}
                type="date"
                value={dataDocumento}
                onChange={(e) => setDataDocumento(e.target.value)}
              />
              <small >
                Data do documento de onde você pegou o dado. Se não souber informar, deixe em branco.
              </small>
            </div>

            <div className="areaAnalise-box">
              <label htmlFor="areaAnalise">Área de análise</label>
              <select id="areaAnalise">
                <option value="" disabled selected> </option>
              </select>

              <small >Selecionar uma das opções possíveis</small>
            </div>
          </div>
        </div>

        <div className="novo-dado">
          <button type="button" onClick={handleAddInput}>
            <figure id="image-novo-dado" alt="icone de soma" />
          </button>
          <p>Inserir outro dado</p>
        </div>

        <div className="novo-file">
          <label htmlFor="input-file" onChange={(e) => setSelectedFile(e.target.files[0])}>
            <figure id="image-novo-file" alt="icone de anexo" />
          </label>
          <input type="file" id="input-file" />
          <p> Anexar Arquivo</p>

        </div>

        {(formulario.length > 0 &&
          (
            <div className="submit">
              <button type="submit">Finalizar</button>
            </div>
          )
        )}
      </form >

      <div className="janela-avisos">
        <p id="titulo-janela-avisos">JANELA DE AVISOS</p>
        <p>PÁGINA DE DOCUMENTOS
          Escolha no menu lateral o que quer visualizar.
          Insira cada campo de dados que você tiver. Tudo bem se você não tiver todos os dados agora! Depois você pode editar e refinar seu trabalho.
        </p>
      </div>
    </div>
  );
}

export default Formulario;
