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

    // let state = {
    //       result: 'No result'
    //     }
      
    // let handleScan = (data) => {
    //       if (data) {
    //         state = {
    //           result: data
    //         };
    //       }
    //     };
    // let handleError = err => {
    //       console.error(err)
    //     };


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

    const handeleCodeChange = (val) => {
        console.log(val.target.value);
        updateCode(val.target.value);
    }
    if(sessionId) {
        return (<EarnStream streamId={sessionId} address={addressId}/>)
    } else {
        return (
            <div id="Form">                
                <body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="formNames">First name</label><br/>
                        <input className="tutorForm" name="name" ref={register}></input><br/>
                        <label className="formNames">Title</label><br/>
                        <input className="tutorForm" name="title" ref={register}></input><br/>
                        <label className="formNames">Subject</label><br/>
                        <input className="tutorForm" name="subject" ref={register}></input><br/>
                        <label className="formNames">Price</label><br/>
                        <input className="tutorForm" name="price" ref={register}></input><br/>
                        <label className="formNames">Address</label><br/>
                        <input className="tutorForm" name="address" onChange={(val) => handeleCodeChange(val)} value={code} ref={register}></input><br/>
                        <button type="submit">Submit</button>
                    </form>
                </body>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '70%' }}
                />
                </div>
              <p>Scan Wallet Address QR </p>
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