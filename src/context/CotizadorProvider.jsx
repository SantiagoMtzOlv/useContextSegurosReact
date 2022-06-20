import { createContext, useState } from 'react';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers';

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: '',
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false);

    const handleChnageDatos = e =>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () =>{
        //Una base
        let resultado =2000

        //Diferencia de año
        const diferencia = obtenerDiferenciaYear(datos.year);

        //Hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100;

        //Americano 15%
        //Europeo 30%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca);

        //plan
        resultado *= calcularPlan(datos.plan);
        
        resultado = formatearDinero(resultado);
        //console.log(resultado)
        setCargando(true)
        
        setTimeout(() => {
            setResultado(resultado);
            setCargando(false);
        }, 3000)

    }

    return(
        <CotizadorContext.Provider
            value={{ 
                datos,
                error,
                resultado,
                cargando,
                setError,
                handleChnageDatos,
                cotizarSeguro
             }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext;