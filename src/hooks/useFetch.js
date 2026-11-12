import { useEffect, useState } from "react";
import axios from "axios";

// Hook reutilizável: busca os dados de uma URL e controla loading/erro
function useFetch(url) {
  const [resposta, setResposta] = useState({ url: null, data: null, error: false });

  useEffect(() => {
    if (!url) return;
    let cancelado = false;

    const getData = async () => {
      try {
        const response = await axios.get(url);
        if (!cancelado) setResposta({ url, data: response.data, error: false });
      } catch (error) {
        console.log("Error: ", error);
        if (!cancelado) setResposta({ url, data: null, error: true });
      }
    };
    getData();

    return () => {
      cancelado = true;
    };
  }, [url]);

  const loading = url !== null && resposta.url !== url;

  return {
    data: loading ? null : resposta.data,
    loading,
    error: loading ? false : resposta.error,
  };
}

export default useFetch;
