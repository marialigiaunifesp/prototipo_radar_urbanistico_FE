import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Draw, Modify, Snap } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MapContainer from '../../styles';

function OpenLayerMap() {
  const mapRef = useRef(null);
  const drawSourceRef = useRef(null);
  const modeRef = useRef('Point');

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: mapRef.current,
      view: new View({
        center: fromLonLat([-45.8875, -23.1794]),
        zoom: 13
      }),
    });

    const drawSource = new VectorSource();
    const drawLayer = new VectorLayer({
      source: drawSource
    });

    map.addLayer(drawLayer);

    // Remover as interações antigas
    map.getInteractions().clear();

    // Adicionar as novas interações com base no valor atual do modeRef
    if (modeRef.current === 'Point') {
      map.addInteraction(new Draw({ source: drawSource, type: 'Point' }));
    } else if (modeRef.current === 'Polygon') {
      map.addInteraction(new Draw({ source: drawSource, type: 'Polygon' }));
    }

    map.addInteraction(new Modify({ source: drawSource }));
    map.addInteraction(new Snap({ source: drawSource }));

    drawSourceRef.current = drawSource;

    return () => {
      map.setTarget(null);
    };
  }, [mapRef]);

  const handleModeChange = (newMode) => {
    if (newMode !== modeRef.current) {
      modeRef.current = newMode;
    }
  };

  const enviarParaAPI = () => {
    const features = drawSourceRef.current.getFeatures();
    // Envie as features para a API aqui (exemplo fictício)
    fetch('http://sua-api.com/salvar-dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(features)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Dados salvos com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro ao salvar os dados:', error);
      });
  };

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
          onClick={enviarParaAPI}>Salvar</Button>
      </Grid>
      <MapContainer ref={mapRef}/>
    </Grid>
  );
};

export default OpenLayerMap;
