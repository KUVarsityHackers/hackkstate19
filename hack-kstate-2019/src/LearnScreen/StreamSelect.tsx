import React, { useState } from 'react';
import '../App.css';
import ItemsCarousel from 'react-items-carousel';
import { ISession } from 'src/types';

function StreamSelect (props: any) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  let sessions : ISession[] = [
    {instructor: {name: "Andre", publickey: "012"}, subject: "math", title: ";)", price: "$22/hr", id: "032452"},
    {instructor: {name: "Nathan", publickey: "123"}, subject: "science", title: ";P", price: "$23/hr", id: "154363"},
    {instructor: {name: "John", publickey: "234"}, subject: "cool", title: ":)", price: "$24/hr", id: "23435352"},
    {instructor: {name: "Own", publickey: "345"}, subject: "read", title: ";D", price: "$25/hr", id: "3435453"},
    {instructor: {name: "Reece",publickey: "456"}, subject: "write", title: ";L", price: "$26/hr", id: "45462254"},
    {instructor: {name: "NAthan", publickey: "567"}, subject: "school", title: ";(", price: "$27/hr", id: "56463462"},
    {instructor: {name: "Colin", publickey: "678"}, subject: "two", title: "I)", price: "$28/hr", id: "632526436"},
    {instructor: {name: "emial", publickey: "789"}, subject: "yay", title: "B)", price: "$29/hr", id: "743243722"},
    {instructor: {name: "haryy", publickey: "890"}, subject: "no", title: "@)", price: "$30/hr", id: "82634725"},
    {instructor: {name: "ternht", publickey: "901"}, subject: "hello", title: ";:", price: "$32/hr", id: "913543161"}
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
        {Array.from(new Array(sessions.length)).map((_, i) =>
        <div
            key={i}
            style={{
            height: 400,
            background: 'url(https://placeimg.com/380/200/nature)'
            }}
            onClick={() => props.selectStream(i).sessionId}
        >
        {sessions[i].instructor.name}<br/>
        {sessions[i].title}<br/>
        {sessions[i].subject}<br/>
        {sessions[i].price}<br/>

        </div>
        )}
    </ItemsCarousel>
    </div>
  );
}

export default StreamSelect;