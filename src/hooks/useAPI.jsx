import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
        };
    
        fetchData();
    }, [url]);
    
    return { data, loading };
    }

export default useAPI;
// https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete