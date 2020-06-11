import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiMap } from 'react-icons/fi'
import Header from '../../components/Header'
import { ecoletaApi } from '../../services/AxiosProvider'

import './styles.css'

interface Point {
  imageUrl: string;
  name: string;
  email: string;
  lat: number;
  lng: number;
  items: Item[];
}

interface Item {
  title: string;
}

const ViewPoints = () => {
  const [points, setPoints] = useState<Point[]>([])

  useEffect(() => {
    ecoletaApi.get('points', {
      params: {
        city: 'Salvador',
        uf: 'BA',
        items: [1, 2, 3, 4, 5, 6]
      }
    }).then(response => {
      setPoints(response.data.points)
    })

  }, [])

  return (
    <div id="page-view-points" style={{backgroundColor: 'white'}}>
      <div className="content">
        <Header
          ButtonIcon={FiArrowLeft}
          buttonLabel='Voltar para a página inicial'
          buttonDestination='/' />
        <main>
          <span id='point-counter'>
            <strong>{points.length} pontos</strong> encontrados
          </span>
          <ul className="points-grid">
            {points.map(point => (
              <li>
                <img src={point.imageUrl} alt={point.name} />
                <div>
                  <h1>{point.name}</h1>
                  <span>{point.email}</span>
                  <h3>
                    {
                      point.items
                      .map(item => item.title)
                      .join(", ")
                    }
                  </h3>
                  <a
                    href={`https://www.google.com/maps/search/${point.lat},+${point.lng}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <span><FiMap size={24} color='#322153'/></span>
                    <strong style={{color:'#322153'}}>Abrir no Google Maps</strong>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default ViewPoints;
