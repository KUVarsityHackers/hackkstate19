import React from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import useForm from "react-hook-form";
import { ISession } from 'src/types';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import Stream from '../Stream'

let sessionId:any;
function EarnScreen (props: any) {

    const { register, handleSubmit } = useForm();
    const onSubmit =  async ( {name, publickey, title, subject, price}:any) => {
        const convertedValues: ISession = { instructor: {
                                                        name,
                                                        publickey
                                                    },
                                            title,
                                            subject,
                                            price,
                                            id: null
                                        };
        console.log(convertedValues);
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
            sessionId = response.code;
        } catch (error) {
            console.error('Error:', error);
          }
    }

    if(sessionId) {
        return (<Stream session={sessionId}/>)
    } else {
        return (
            <div className="Splash">
                <header className="App-header">
                    <p>Earn</p>
                </header>
                <body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>First name</label><br/>
                        <input className="tutorForm" name="name" ref={register}></input><br/>
                        <label>Title</label><br/>
                        <input className="tutorForm" name="title" ref={register}></input><br/>
                        <label>Subject</label><br/>
                        <input className="tutorForm" name="subject" ref={register}></input><br/>
                        <label>Price</label><br/>
                        <input className="tutorForm" name="price" ref={register}></input><br/>
                        <label>Public Key</label><br/>
                        <input className="tutorForm" name="publickey" ref={register}></input><br/>
                        <button type="submit">Submit</button>
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
    "publickey": string;
}
export default EarnScreen;