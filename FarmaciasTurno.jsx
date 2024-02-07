import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmaciasTurno = () => {
    const [farmaciasTurno, setFarmaciasTurno] = useState([]);
    const [filteredFarmacias, setFilteredFarmacias] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php')
            .then(response => {
                setFarmaciasTurno(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API', error);
            });
    }, []);

    useEffect(() => {
        const filtered = farmaciasTurno.filter(farmacia =>
            farmacia.local_nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFarmacias(filtered);
    }, [farmaciasTurno, searchTerm]);

    return (
        <div>
            <h2>FARMACIAS DE TURNO</h2>
            <input
                type="text"
                placeholder="Buscar farmacia..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredFarmacias.map(farmacia => (
                    <li key={farmacia.local_id}>{farmacia.local_nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default FarmaciasTurno;


