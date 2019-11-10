import React, {Component} from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import useForm from "react-hook-form";
import { ISession } from 'src/types';
import { string } from 'prop-types';
import Stream from '../Stream'
import EarnStream from './EarnStream';
import QrReader from 'react-qr-reader'
import { useState, useEffect } from 'react';

let sessionId:any;
let addressId:any;
function EarnScreen (props: any) {
    const [ code, updateCode ] = useState("");
    const [ qrRead, updateQrRead ] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit =  async ( {name, address, title, subject, price}:any) => {
        const convertedValues: ISession = { instructor: {
                                                        name,
                                                        address: code
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


    let state = {
        result: ''
    }
      
    const handleScan = (data) => {
        if (data !== null) {
            updateCode(data.slice(7));
        }
    };

    const handleError = (err) => {
        console.error(err)
    };

    const handeleCodeChange = (val) => updateCode(val.target.value);

    const toggleQr = () => updateQrRead(!qrRead); 

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
                        <input className="tutorForm" placeholder="XRP Wallet Address" name="address" onChange={(val) => handeleCodeChange(val)} value={code} ref={register}></input><br/>
                        <button type="submit" id="submit">Submit</button>
                    </form>
                    <button id="toggleQr" onClick={()=>toggleQr()}>Toggle QR Reader</button>
                </body>

                {qrRead ? 
                    (<div style={{display: 'flex', justifyContent: 'center'}}>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '70%' }}
                    />
                    </div>)
                    :
                    <div></div>}
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