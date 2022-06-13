import React , { useState, useEffect }from 'react'
import {  getInventory, updateInventory } from '../../../services/inventoryService';
import { InventoryNew } from './inventoryNew';
import {Link} from 'react-router-dom';

export const Inventory = () => {
  const [valueForm, setValueForm] = useState({});
  const [inventories, setInventories] = useState([]);
  
  const [openModal, setOpenModal] = useState(false);

  
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  const handleGetInventories = async () => {
    try {
      const resp = await getInventory();
      setInventories(resp.data)
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetInventories();
  }, []);
  return (
    <div className="container" >
      <div className=" mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          inventories.map((inven) => {
            return(
              <div className="col" key={inven._id}>
                <div className="card">
                  <img src={inven.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Caracteristicas</h5>
                    <p className="card-text">Serial: {inven.serial}</p>
                    <p className="card-text">Marca: {inven.brand.name}</p>
                    <p className="card-text">Descripcion: {inven.description}</p>
                    <p className="card-text">Precio: {inven.price}</p>
                    <p className="card-text">
                      <Link to={`inventory/edit/${inven._id}`}>
                        Ver mas...
                      </Link>
                    </p>

                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
      {
        openModal ? <InventoryNew handleOpenModal={handleOpenModal}
        handleGetInventories={handleGetInventories}/>:
        (<button className='fab' onClick={() => handleOpenModal()}><i className="fa-solid fa-plus"></i></button>)
      }

     
      
    </div>

  )
}
