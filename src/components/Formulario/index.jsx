/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */


import React, { useState, useRef} from "react";
import axios from 'axios';
import './styled.css'
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

function Formulario() {
  const [formulario, setFormulario] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documento, setDocumento] = useState("");
  const [variavel, setVariavel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [referencia, setReferencia] = useState("");
  const [dataDocumento, setDataDocumento] = useState("");
  const codSicar = localStorage.getItem("sicar");
  const coordinates = localStorage.getItem("coordinates");
  const idSicar = localStorage.getItem("idSicar");

  const [addButton, setAddButton] = useState(false);
  const [areaAnalise, setAreaAnalise] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const form = useRef(formulario);


  const navigate = useNavigate();
  const variaveis = {
    processo_judicial: {
      label: "Processo Judicial",
      options: {
        numero_processo: "Número do Processo",
        nome_parte_requerente: "Nome da parte Requerente",
        nome_parte_requerida: "Nome da parte Requerida",
        rg_requerida: "RG da parte Requerida",
        rg_requerente: "RG da parte Requerente",
        cpf_requerida: "CPF da parte Requerida",
        cpf_requerente: "CPF da parte Requerente",
        numero_carta: "Nº da Carta Precatório na Origem",
        nomde_advogado: "Nome do Advogado",
        oab: "OAB",
        documento_delegacia: "Nº do Documento na Delegacia",
        cda: "CDA",
        classe: "Classe",
        area: "Área",
        assunto: "Assunto",
        foro: "Foro",
        fara: "Vara",
        juiz: "Juiz",
        confte: "Confte",
        data_movimentacoes: "Data das Movimentações",
        despacho: "Despacho",
        codigo_consulta_processo: "Código de consulta do processo",
        prazo_manifestacao_judicial: "Prazo para manifestação judicial",
      },
    },
    matricula_imovel: {
      label: "Matricula do Imóvel",
      options: {
        numero: "Número matrícula",
        numero_antigo: "Número matrícula (antiga)",
        cri: "Cartório de Registro de Imóveis (CRI)",
        comarca: "Comarca",
        inscricao_imobiliaria: "Inscrição Imobiliária",
        endereco: "Endereço",
        bairro: "Bairro",
        regiao: "Regiao",
        denominacao_imovel: "Denominação do Imóvel",
        codigo_incra: "Código INCRA",
        sicar: "SICAR",
        sicar_sp: "SICAR-SP",
        proprietario: "Proprietário",
        vendedor: "Vendedor",
        forma_aquisicao: "Forma de Aquisição",
        data_transacao: "Data do registro da Transação",
        ccir: "CCIR",
      },
    },
    oficio: {
      label: "Ofício",
      options: {
        numero: "Número do ofício",
        orgao:
          "Órgão ou Instituição Remetente do Ofício",
        comentario: "Comentário sobre Ofício",
      },
    },
    conhecimento_lugar: {
      label: "Conhecimento do Lugar",
      options: {
        regiao: "Regiao",
      },
    },
    diversas_fontes: {
      label: "Diversas Fontes",
      options: {
        cpf_proprietario: "CPF do Proprietário",
        area_imovel: "Área do Imóvel",
        ccir: "CCIR",
        unidade: "Unidade",
        cnpj: "CNPJ",
        telefone_contato: "Telefone de Contato",
        email_contato: "E-mail de Contato",
        possui_planta_parcelamento: "Possui Planta de Parcelamento",
        levantamento_planialtimetrico: "Levantamento Planialtimétrico",
        coordenada_aproxima: "Coordenadas Aproximadas do Local",
      },
    },
    contrato_compra_venda: {
      label: "Contrato de Compra e Venda",
      options: {
        nome_empreendimento: "Nome do Empreendimento",
      },
    },
    vistoria: {
      label: "Vistoria",
      options: {
        energia_eletrica: "Energia elétrica domiciliar",
        abastecimento_agua: "Abastecimento de água",
        coleta_tratamento_esgoto:
          "Coleta e Tratamento de Esgoto Sanitário",
        iluminacao_publica: "Iluminação Pública",
        drenagem_pluvial: "Drenagem de águas pluviais",
        pavimentacao: "Pavimentação",
        local_parcelada:
          "Local parcelada acessada diretamente por via pública?",
        existencia_edificacoes: "Existência de edificações no local",
        quantidade_aproximada_edificacoes: "Quantidade aproximada de edificações",
        uso_constatado: "Uso Constatado",
        ponto_atencao: "Ponto de atenção",
        lotes_demarcados:
          "Lotes demarcados ou fechamento da área?",
        coleta_residuos_solidos:
          "Existência de coleta de resíduos sólidos no local",
        proximidade_local_transporte:
          "Proximidade de local atendido por transporte coletivo",
      },
    },
    processo_administrativo: {
      label: "Processo Administrativo",
      options: {
        advogado_parte: "Advogado da Parte",
        responsavel_tecnico_parte: "Responsável técnico da parte",
        ponto_focal_moradores: "Ponto Focal dos Moradores",
        notificacao: "Notificação",
        prazo_manifestacao: "Prazo para manifestação (notificação)",
        data_publicacao_notificacao:
          "Data de publicação da notificação em boletim oficial (quando houver)",
        recurso_notificacao: "Recurso de Notificação",
        processo_reurb: "Processo de REURB (mestre)",
      },
    },
    boletim_oficial: {
      label: "Boletim Oficial",
      options: {
        link_publicao_edital: "Link de publicação de edital",
      },
    },
    ficha_socioeconomico: {
      label: "Ficha de Cadastramento Socioeconômico",
      options: {
        ficha_cadastramento_individual: "Ficha de cadastramento individual",
      },
    },
    legislacao: {
      label: "Legislação",
      options: {
        zona_uso: "Zona de uso",
      },
    },
    datageo_ambiente: {
      label: "DataGEO Ambiente",
      options: {
        AIA: "Auto de Infração Ambiental (AIA)",
      },
    },
    ibge: {
      label: "IBGE",
      options: {
        aglomerado_subnormal: "Aglomerado subnormal",
        area_risco: "Área de risco - BATER",
        cod_mun: "Cod_Mun",
      },
    },
    datageo: {
      label: "Dado Geográfico",
      options: {
        distancia_saude_proximo:
          "Distância do equipamento de saúde mais próximo",
        distancia_educacao_proximo:
          "Distância do equipamento de educação mais próximo",
        proximidade_local_atendido_transporte:
          "Proximidade de local atendido por transporte coletivo",
      },
    },
  };

  const handleAddInput = (event) => {
    setAddButton(true);
    setSubmitButton(false);
    event.preventDefault();
    if (documento && variavel && inputValue) {
      if (formulario.length === 0) {
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
      else {
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
      setAddButton(false);
    }
  };
  const handleCancelar = () => {
    navigate("/map");
  }

  const handleSubmit = async(event) => {
    const docs = {};
    const config = { headers: { 'content-type': 'multipart/form-data' } };  // Settings do formData
    event.preventDefault();

    if (documento !== "" && variavel !== "" && inputValue !== "" && areaAnalise !== "") {
      setSubmitButton(true);
      
  
      if (formulario.length === 0) {
        const firstForm = [
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
        ];
        form.current = firstForm;
      }
      else{
        form.current = formulario;
      }

      const formData = new FormData();
      if(selectedFile)
        formData.append('arquivo', selectedFile);
      console.log(formData);

      // Union of forms
      for (let i = 0; i < form.current.length; i += 1) {
        const name = form.current[i].documento;
        const variable = form.current[i].variavel;
        const val = form.current[i].valor;
        if (!(name in docs)) {
          docs[name] = {}
        }
        docs[name][variable] = val;
      }

      // Info from map
      const areaInfo = {
        // "COD_IMOVEL": codSicar
        "id_sicar": idSicar
      };

      const jsonList = form.current.map(
        ({
          areaAnalise,
          dataDocumento,
          referencia,
        }) => ({
          "areaAnalise": areaAnalise,
          "dataDocumento": dataDocumento,
          "referencia": referencia,
        })
      );
      const json = { ...areaInfo, ...docs, ...jsonList[0] };
      console.log(json);

      /*
      Sending all files via formdata
      Object.keys(jsonList).forEach((key) => {
        formData.append(key, jsonList[key]);
      });
      */
      // const urlForm = 'http://localhost:8000/api/form-create/';
      // const urlFile = 'http://localhost:8000/api/form-post-file/';
      const urlForm = 'https://gerenciall.onrender.com/api/form-create/';
      const urlFile = 'https://gerenciall.onrender.com/api/form-post-file/';
      // Envia json e arquivo
      axios.post(urlForm, json)
        .then(response => {
          // Verifica se o Form Data não é nulo
          if(formData.entries().next().value){
            formData.append('id_documento', response.data);
            axios.post(urlFile, formData, config)
            .then((res)=>{
              alert("Dados enviados com sucesso")
              console.log('Dados enviados com sucesso:', response.data);
              navigate("/map");
            })
            .catch((err) => console.log("File Upload Error"));
          }
          else{
            alert("Dados enviados com sucesso")
            navigate("/map");
          }
        })
        .catch(error => {
          alert('Erro ao enviar os dados');
          console.error('Erro ao enviar os dados:', error.message);
        });
    }

  };

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
    setReferencia("");
    setAreaAnalise("");
    setDataDocumento("");
    setVariavel("");
    setInputValue("");
  };



  return (
    <div className='index'>


      <form className="form-formulario" onSubmit={handleSubmit}>
        <p id="titulo-formulario">INSERIR DADOS DOCUMENTAIS CÓDIGO SICAR: {codSicar}</p>

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
                <input className="inserted-value" type="text" value={input.name} readOnly />
              </div>
              <div className="areaAnalise-box">
                <label>Área de análise</label>
                <input className="inserted-value" type="text" id="areaAnalise" value={input.areaAnalise} readOnly />
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
              <input
                id="areaAnalise"
                type="text"
                value={areaAnalise}
                onChange={(e) => setAreaAnalise(e.target.value)}
              />

              <small >Área que deseja inserir os documentos</small>
            </div>
          </div>
        </div>
        <div className="novo-dado">
          <div className="novo-dado-box">
            <button type="button" onClick={handleAddInput}>
              <figure id="image-novo-dado" alt="icone de soma" />
            </button>
            <p>Inserir outro dado</p></div>
          {addButton === true && (<p id="disclaim-button">Para inserir outro dado preencha todos os campos</p>
          )}
        </div>
        <div className="novo-file">
          <label htmlFor="input-file">
            <figure id="image-novo-file" alt="icone de anexo" />
            <input name = "arquivo" id = "input-file" type="file" onChange={(e) => {setSelectedFile(e.target.files[0]);}} /> 
          </label>
          <input type="file" id="input-file" />
          <p> Anexar Arquivo</p>

        </div>

        <div className="buttons">
          <div className="submit">
            <button className="button-form" type="submit">Finalizar</button>

          </div>

          <div className="cancelar">
            <button className="button-form" type="button" onClick={handleCancelar}>Cancelar</button>
          </div>

        </div>
        {(!submitButton) && (
          <p id="disclaim-button-finalizar">Para finalizar preencha todos os campos</p>)}
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
