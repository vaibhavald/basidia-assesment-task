import React, { useState, useEffect } from 'react'
import { Form,Button ,FormGroup, Media, Image, Container, Row, Col, Card, FormCheck} from 'react-bootstrap';
import { gapi } from 'gapi-script';

const SPREADSHEET_ID = '1dmN8WibC_8nvAdTtGXOFNo74EjeZx5cl4vU-UNq0Cnw'; //from the URL of your blank Google Sheet
const CLIENT_ID = '32857250398-fk549cd2ta12kf0bobakjbndue7hafjm.apps.googleusercontent.com'; //from https://console.developers.google.com/apis/credentials
const API_KEY = 'AIzaSyBB_Nd207F9MELMvcHBlhkDX2ufWAlZ2uo'; //https://console.developers.google.com/apis/credentials
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const Signup = () => {
    const [values, setValues] = useState({ email: "", password: "", name: "", c_password: "" })

    const handleChange = event => {
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: event.target.value,
        });
    }

    useEffect(() => {
        handleClientLoad();
    });

    const handleClientLoad = () => { 
        gapi.load('client:auth2', initClient);
    }

    const updateSignInStatus = (isSignedIn) => {
        if (isSignedIn) {
            console.log("Signed In");
        }
      }

    const initClient = () => { 
        gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(function() {
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }


    const onFormSubmit = (event) => {
        if(values.password != values.c_password) {
            alert("Password and Confirm passowrd does not match");
        } else {
            event.preventDefault();
            const params = {
                spreadsheetId: SPREADSHEET_ID,
                range: 'Sheet1',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
            };
            const valueRangeBody = {
                'majorDimension': 'ROWS', 
                'values': [[values.name,values.email,values.password]]
            };
            let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
            request.then(function (response) {
                alert("Registration Successful");
                
            }, function (reason) {
                console.error('error: ' + reason.result.error.message);
            });
        }
    }

    return (
        <div>
            <Container className="w-75 d-flex justify-content-center border border-darken-1 mt-5">
                <Row className="container-fluid">
                    <Col>
                    <h3 className="d-flex">Signup</h3>
                    <form onSubmit={onFormSubmit} class="">
                        <FormGroup>
                            <input  class="form-control col-md-8" type="text" name="name" placeholder="Your Name" value={values.name} onChange={handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            
                            <input class="form-control col-md-8" type="email" name="email" placeholder="Your Email" value={values.email} onChange={handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <input class="form-control col-md-8" type="password" name="password" placeholder="Your Password" value={values.password} onChange={handleChange}></input>
                        </FormGroup>
                        <FormGroup>
                            <input class="form-control col-md-8" type="password" name="c_password" placeholder="Repeat Your password" onChange={handleChange}></input>
                        </FormGroup>
                        <Form.Group className="d-flex" class="form-control" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I agree to all statements in Terms of service" />
                        </Form.Group>
                        <Button className="float-left mb-3" color="primary" type="submit">
                            Register
                        </Button>
                    </form>
                    </Col>
                    <Col>
                        <Media>
                            <Image src="signup-image.webp"></Image>
                        </Media>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup
