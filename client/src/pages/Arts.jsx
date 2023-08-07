import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';


const Arts = () => {
    const [arts,setArts] = useState([])
    
    
    useEffect(() => {
        const fetchAllArts = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/arts")
                setArts(res.data);
            }catch (err) {
                console.log(err)
            }
}  ;
fetchAllArts();
}, []);

console.log(arts);

const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/arts/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <div>
            <Logo />
<h4><div>
La Bague Monde - Les Duckstones - Les Look on the Fire - Les Fashion TShirts - Les Charming Charm - Les Stickers on the Wall

 



    </div></h4>
   <div>       
<h1> <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Arts in Wow-Arts.com
        </Link>
      </button>    </h1> 

      </div>  
      <div className="Cabinet">
<h3>Cabinet de Curiosités, Galerie de Vente de produits authentiques, d’éditions limitées, de collections tendances sages ou délirantes en mouvement perpétuel. Simplement Chic!!!</h3>
</div>
<div className="arts"> 


{arts.map((art) => (
          <div key={art.id} className="art">
            <img src={art.cover} alt="" />
            <h2>{art.title}</h2>
            <p>{art.description}</p>
            <span>{art.price} €</span>
            <div>
            <button className="delete" onClick={() => handleDelete(art.id)}>Delete</button>
            
            <button className="update">
              <Link
                to={`/update/${art.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};
export default Arts;
