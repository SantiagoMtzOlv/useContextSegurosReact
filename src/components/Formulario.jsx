import { Fragment } from 'react';
import {MARCAS, YEARS, PLANES} from '../constants';
import useCotizador from '../hooks/useCotizador';

import Error from './Error';

const Formulario = () => {

    const { datos, error, setError, handleChnageDatos, cotizarSeguro } = useCotizador();

    const handleSubmit = e =>{
        e.preventDefault();

        if(Object.values(datos).includes('')){
           setError('Todos los campos son obligatorios')
           return;
        }

        setError('');
        cotizarSeguro();
    }

  return (
    <>
        {error && <Error />}

        <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="marca" className="block mb-3 font-bold text-gray-400 uppercase">Marca</label>
                <select name="marca" id="marca" className="w-full p-3 bg-white border border-gray-200" onChange={e => handleChnageDatos(e)}>
                    <option value={datos.marca} disabled>-- Selecciona Marca --</option>
                    {MARCAS.map(marca => (
                        <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="my-5">
                <label htmlFor="year" className="block mb-3 font-bold text-gray-400 uppercase">Año</label>
                <select name="year" id="year" value={datos.year} className="w-full p-3 bg-white border border-gray-200" onChange={e => handleChnageDatos(e)}>
                    <option value="" disabled>-- Selecciona Año --</option>
                    {YEARS.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="my-5">
                <label htmlFor="" className="block mb-3 font-bold text-gray-400 uppercase">Plan</label>
                <div className="flex gap-3 items-center">
                    {PLANES.map(plan => (
                        <Fragment key={plan.id}>
                            <label>
                                {plan.nombre}
                            </label>
                            <input type="radio" name="plan" id="plan" value={plan.id} onChange={e => handleChnageDatos(e)}/>
                        </Fragment>
                    ))}
                </div>
            </div>
            <input type="submit" value="Cotizar" className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold' />
        </form>
    </>
  )
}

export default Formulario