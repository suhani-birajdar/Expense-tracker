import React from "react";

const Card = ({ title,amount ,bgColor}) => {

  return (
    <div className='Budget-container' style={{backgroundColor: bgColor}}>
      <p style={{fontSize:'24px',paddingTop:'40px'}}>{title}</p>
      <p style={{paddingTop: "0px",paddingLeft:'50px', width: '240px',margin: '0',fontSize:'40px'}}>₹{amount} </p>        
    </div>
  );
};

export default Card;
