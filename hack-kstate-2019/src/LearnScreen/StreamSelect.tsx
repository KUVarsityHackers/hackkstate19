import React, { useState } from 'react';
import '../App.css';
import ItemsCarousel from 'react-items-carousel';

function StreamSelect (props: any) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  let sessions = [
    {name: "Andre", subject: "math", topic: "calc 2", title: ";)", price: "$22/hr"},
    {name: "Nathan", subject: "science", topic: "physics", title: ";P", price: "$23/hr"},
    {name: "John", subject: "cool", topic: "cste2", title: ":)", price: "$24/hr"},
    {name: "Own", subject: "read", topic: "coloring 2", title: ";D", price: "$25/hr"},
    {name: "Reece", subject: "write", topic: "prog 2", title: ";L", price: "$26/hr"},
    {name: "NAthan", subject: "school", topic: "test 2", title: ";(", price: "$27/hr"},
    {name: "Colin", subject: "two", topic: "urt 2", title: "I)", price: "$28/hr"},
    {name: "emial", subject: "yay", topic: "fruit 2", title: "B)", price: "$29/hr"},
    {name: "haryy", subject: "no", topic: "pool 2", title: "@)", price: "$30/hr"},
    {name: "ternht", subject: "hello", topic: "were 2", title: ";:", price: "$32/hr"}
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
            onClick={() => props.selectStream(i)}
        >
        {sessions[i].name}<br/>
        {sessions[i].title}<br/>
        {sessions[i].subject}<br/>
        {sessions[i].topic}<br/>
        {sessions[i].price}<br/>

        </div>
        )}
    </ItemsCarousel>
    </div>
  );
}

export default StreamSelect;