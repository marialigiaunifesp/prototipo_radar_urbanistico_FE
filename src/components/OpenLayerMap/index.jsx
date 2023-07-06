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
          const staticUrl = 'https://ru-be-prototype.onrender.com/api/form-get-info-api/';

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
      url: 'https://ru-be-prototype.onrender.com/api/get-sicar/',
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

  const renderizarCamposNaoNulos = (objeto) =>
    Object.entries(objeto).map(([chave, valor]) => {
      if (valor !== null && typeof valor === 'object') {
        if (Object.values(valor).every((v) => v === null)) {
          return null;
        }
        return renderizarCamposNaoNulos(valor);
      }
      if (valor !== null) {
        if(chave.startsWith('id'))
          return null;
        return <p key={chave}>{chave}: {valor}</p>;
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
