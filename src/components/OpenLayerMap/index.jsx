/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable  react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState, useContext } from 'react';
import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import axios from 'axios';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import './styled.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/auth';

function OpenLayerMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [content, setContent] = useState('');
  const [sicarNumber, setSicarNumber] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [formulario, setFormulario] = useState([]);
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
  const [idSicar, setIdSicar] = useState('');
  const navigate = useNavigate();
  const { sicar } = useContext(AuthContext);

  const closerRef = useRef(null);
  const drawSourceRef = useRef(null);
  const [mode, setMode] = useState('Point');
  const selectRef = useRef(new Select());
  const overlayRef = useRef(null);

  const sendToForm = () => {

    localStorage.setItem("sicar", sicarNumber);
    localStorage.setItem("coordinates", coordinates);
    localStorage.setItem("idSicar", idSicar);

    navigate("/formulario");
  }

  const handleMapClick = (e) => {
    const selectInstance = selectRef.current;

    setTimeout(() => {
      const features = selectInstance.getFeatures();
      if (features) {
        const attrs = features.item(0);

        if (attrs) {
          const text = ['SICAR:  ', attrs.get('cod_imovel')].join('');
          // const staticUrl = 'http://localhost:8000/api/form-get-info-api/';
          const staticUrl = 'https://gerenciall.onrender.com/api/form-get-info-api/';

          axios.get([staticUrl, attrs.getId()].join(''))
            .then((response) => {
              setFormulario(response.data);
            })
            .catch((err) => {
              setFormulario([]);
              console.log("not found");
            })
          setIdSicar(attrs.getId());
          setSicarNumber(attrs.get('cod_imovel'));
          setCoordinates(attrs.getGeometry().getCoordinates());  // Atualizando o estado com o novo conteúdo
          setContent(text);  // Atualizando o estado com o novo conteúdo
          overlayRef.current.setPosition(e.coordinate);
        }
      }
    }, 500);
  }

  const handleCloseClick = () => {
    if (overlayRef.current) {
      overlayRef.current.setPosition(undefined);
    }
    closerRef.current.blur();
    return false;
  };

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const mainView = new View({
      center: fromLonLat([-45.9741, -23.3066]),
      zoom: 12
    });

    const overlay = new Overlay({
      element: containerRef.current,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    overlayRef.current = overlay;

    const map = new Map({
      layers: [osmLayer],
      target: mapRef.current,
      view: mainView,
      overlays: [overlay],
    });

    const drawSource = new VectorSource({
      format: new GeoJSON(),
      // url: './sicar_area_imovel.geojson',
      // url: 'http://localhost:8000/api/get-sicar/', 
      url: 'https://gerenciall.onrender.com/api/get-sicar/',
    });

    const drawLayer = new VectorLayer({
      source: drawSource
    });

    map.addLayer(drawLayer);
    map.addInteraction(selectRef.current);
    map.on('click', e => handleMapClick(e));

    drawSourceRef.current = drawSource;
    /**
     * Create an overlay to anchor the popup to the map.
     */

    return () => {
      map.setTarget(null);
      map.un('click', handleMapClick);

    };
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const getLabel = (chave) => {
    const categoriaEncontrada = Object.keys(variaveis).find(categoria => variaveis[categoria].options[chave]);
  
    return categoriaEncontrada ? variaveis[categoriaEncontrada].options[chave] : chave;
  }
  
  const renderizarCamposNaoNulos = (objeto) => 
    Object.entries(objeto).map(([chave, valor]) => {
      if (valor !== null && typeof valor === 'object') {
        return Object.values(valor).every((v) => v === null) ? null : renderizarCamposNaoNulos(valor);
      }
      if (valor !== null && !chave.startsWith('id')) {
        const label = getLabel(chave);
        return <p key={chave}>{label}: {valor}</p>;
      }
      return null;
    });
  
  

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color='secondary'
            onClick={() => handleModeChange('Point')}>Ponto</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color='secondary'
            onClick={() => handleModeChange('Polygon')}>Polígono</Button>
        </Grid>
      </Grid>
      <div className="box-map">
        <div className="map" ref={mapRef} />
        <div id="popup" className="ol-popup" ref={containerRef}>
          <a href="#" id="popup-closer" className="ol-popup-closer" ref={closerRef} onClick={handleCloseClick}> </a>
          <div id="popup-content"> {content} </div>
          <div className="popup-form-container">
            {formulario.map((item, index) => (
              <div key={index}>
                {renderizarCamposNaoNulos(item)}
              </div>
            ))}

          </div>
          {content && (<div className='send-form'>
            <Button variant="contained" color='secondary'
              onClick={sendToForm}>Editar</Button>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default OpenLayerMap;
