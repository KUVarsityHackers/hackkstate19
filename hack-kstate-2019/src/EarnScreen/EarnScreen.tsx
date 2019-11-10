import React from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import useForm from "react-hook-form";
import { ISession } from 'src/types';
import { string } from 'prop-types';
import Stream from '../Stream'
import EarnStream from './EarnStream';

let sessionId:any;
let addressId:any;
function EarnScreen (props: any) {

    const { register, handleSubmit } = useForm();
    const onSubmit =  async ( {name, address, title, subject, price}:any) => {
        const convertedValues: ISession = { instructor: {
                                                        name,
                                                        address
                                                    },
                                            title,
                                            subject,
                                            price,
                                            id: null
                                        };
        const url = 'session';
        const data = convertedValues;

        try {
            const request =( await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                'Content-Type': 'application/json'
                }
            }));
            const  response = await request.json();
            sessionId = response;
            
            addressId = address;
        } catch (error) {
            console.error('Error:', error);
          }
    }

    if(sessionId) {
        return (<EarnStream streamId={sessionId} address={addressId}/>)
    } else {
        return (
            <div id="Form">
                <p id ="tutorTitle">Session Information</p>
                <body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className="tutorForm" placeholder="Name" name="name" ref={register}></input><br/>
                        <input className="tutorForm" placeholder="Title" name="title" ref={register}></input><br/>
                        <input className="tutorForm" placeholder="Subject" name="subject" ref={register}></input><br/>
                        <input className="tutorForm" placeholder="Price" name="price" ref={register}></input><br/>
                        <input className="tutorForm" placeholder="Address" name="address" ref={register}></input><br/>
                        <button type="submit" id="submit">Submit</button>
                    </form>
                </body>
            </div>
        );
    }
}
interface formSubmit {
    "name": string;
    "title": string;
    "subject": string;
    "price": string;
    "address": string;
}
export default EarnScreen;