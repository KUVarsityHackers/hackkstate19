import React, { useState } from 'react';
import '../App.css';
import ItemsCarousel from 'react-items-carousel';
import { ISession } from 'src/types';

function StreamSelect (props: any) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const withdraw = () => {
    fetch(`/address/` + props.address, {
      method: 'DELETE'
    })
  }

  let sessions : ISession[] = [
    {instructor: {name: "Andre", address: "012"}, subject: "math", title: ";)", price: "$22/hr", id: "032452"},
    {instructor: {name: "Nathan", address: "123"}, subject: "science", title: ";P", price: "$23/hr", id: "154363"},
    {instructor: {name: "John", address: "234"}, subject: "cool", title: ":)", price: "$24/hr", id: "23435352"},
    {instructor: {name: "Own", address: "345"}, subject: "read", title: ";D", price: "$25/hr", id: "3435453"},
    {instructor: {name: "Reece",address: "456"}, subject: "write", title: ";L", price: "$26/hr", id: "45462254"},
    {instructor: {name: "NAthan", address: "567"}, subject: "school", title: ";(", price: "$27/hr", id: "56463462"},
    {instructor: {name: "Colin", address: "678"}, subject: "two", title: "I)", price: "$28/hr", id: "632526436"},
    {instructor: {name: "emial", address: "789"}, subject: "yay", title: "B)", price: "$29/hr", id: "743243722"},
    {instructor: {name: "haryy", address: "890"}, subject: "no", title: "@)", price: "$30/hr", id: "82634725"},
    {instructor: {name: "ternht", address: "901"}, subject: "hello", title: ";:", price: "$32/hr", id: "913543161"}
  ]

  return (
    <div style={{"padding":"0 60px","maxWidth":1000,"margin":"0 auto"}}>
    <ItemsCarousel
        infiniteLoop={true}
        gutter={12}
        activePosition={'center'}
        chevronWidth={60}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={3}
        slidesToScroll={2}
        outsideChevron={true}
        showSlither={true}
        firstAndLastGutter={true}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={value => setActiveItemIndex(value)}
        rightChevron={'>'}
        leftChevron={'<'}
    >
        {Array.from(new Array(props.sessions.length)).map((_, i) =>
        <div
            key={i}
            style={{
              height: 400,
              backgroundColor: 'lightgray',
              borderWidth: '2px',
              borderColor: 'black',
              boxShadow: '3,3,4',
              borderRadius: '6px',
              marginTop: '10px'
            }}
            onClick={() => props.selectStream(props.sessions[i])}
        >
        <br/>
        <h2 style={{color:"gray"}}> {props.sessions[i].instructor.name} </h2>
        <hr/>
        <h1 style={{color:"black"}}>{props.sessions[i].title}</h1>
        <hr/>
        <h2 style={{color:"gray"}}>{props.sessions[i].subject}</h2>
        <hr/>
        <h3 style={{color:"black"}}>{props.sessions[i].price}</h3>
        
        </div>
        )}
    </ItemsCarousel>
    <div style={{display: 'flex', width: '100%', paddingTop: '5%'}}>
      <div style={{textAlign:'left', width: '50%', marginTop: 'auto', marginBottom: 'auto'}}>
        <button onClick={withdraw} style={{padding: '6px'}}>Withdraw Funds</button>
      </div>
      <div style={{float: 'right', width: '50%', textAlign: 'right'}}>
        <h3>XRP {props.balance < 0 ? 0 : props.balance}</h3>
      </div>
    </div>
    </div>
  );
}

export default StreamSelect;