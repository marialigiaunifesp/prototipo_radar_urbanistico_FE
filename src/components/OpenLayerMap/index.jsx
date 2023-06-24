import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
// import { Draw, Modify, Snap } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import axios from 'axios';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';

import MapContainer from './styled';

function OpenLayerMap() {
  const mapRef = useRef(null);
  const drawSourceRef = useRef(null);
  const modeRef = useRef('Point');

  const osmLayer = new TileLayer({
          source: new OSM(),
        });
  const mainLayers = [osmLayer];
  const mainView = new View({
        center: fromLonLat([-45.9741, -23.3066]),
        zoom: 12
      });
  const select = new Select();

  useEffect(() => {
    const map = new Map({
      layers: mainLayers,
      target: mapRef.current,
      view: mainView
    });
    const drawSource = new VectorSource({
      // format: new GeoJSON().readFeatures(data),
      format: new GeoJSON(),
      url: './sicar_area_imovel.geojson',
    });
    const drawLayer = new VectorLayer({
      source: drawSource
    });

    map.addLayer(drawLayer);

    // Remover as interações antigas
    // map.getInteractions().clear();
    map.addInteraction(select);

    // Adicionar as novas interações com base no valor atual do modeRef
    /* 
    if (modeRef.current === 'Point') {
      map.addInteraction(new Draw({ source: drawSource, type: 'Point' }));
    } else if (modeRef.current === 'Polygon') {
      map.addInteraction(new Draw({ source: drawSource, type: 'Polygon' }));
    }

    map.addInteraction(new Modify({ source: drawSource }));
    map.addInteraction(new Snap({ source: drawSource }));
    */
    drawSourceRef.current = drawSource;
    return () => {
      map.setTarget(null);
    };
  }, [mapRef]);

  const sendToForm = () => {
      // Aqui você pode obter os dados da feição selecionada, como ID ou outros atributos relevantes
  // var feicaoId = feature.getId();

  // Abra uma nova janela para edição dos dados
  const url = "form?id=";

  window.open(url);
  }

  select.on('select', ()=>{
    const popup = window.open("", "Pop-up", "width=400,height=300");
    const attrs = select.getFeatures().item(0);
    console.log(attrs.get('COD_IMOVEL'));
    const text = ['SICAR:  ', attrs.get('COD_IMOVEL')].join('');
    popup.document.write(text);



    const botao = popup.document.createElement("button");
    botao.innerHTML = "Editar Dados";
    botao.addEventListener("click", () => {
      sendToForm(text);
    });
    popup.document.body.appendChild(botao);
    
  });

  const handleModeChange = (newMode) => {
    if (newMode !== modeRef.current) {
      modeRef.current = newMode;
    }
  };

  
  /*
  const enviarParaAPI = () => {
    const features = drawSourceRef.current.getFeatures();
    const coord = features[0].getGeometry().getCoordinates();
    console.log(coord);
    const geojson = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {},
        geometry: {
        coordinates: [
          coord[0],
          coord[1]
          ],
        type: "Point"
      }}]};
      
    // Envie as features para a API aqui (Enviando coordenadas do primeiro ponto)
    axios.post('http://localhost:8000/api/coordinate-create/', geojson)
      .then(response => response.json())
      .then(data => {
        console.log('Dados salvos com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro ao salvar os dados:', error.message);
      });
      
  };
  */
  return (
    <Grid container spacing={2}>

      <Grid item>
        <Button variant="contained" color='secondary'
          onClick={() => handleModeChange('Point')}>Ponto</Button>
      </Grid>
      <Grid item>
        <Button  variant="contained" color='secondary'
        onClick={() => handleModeChange('Polygon')}>Polígono</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color='secondary'
          onClick={sendToForm}>Editar</Button>
      </Grid>
      <MapContainer ref={mapRef}/>
    </Grid>
  );
};

export default OpenLayerMap;