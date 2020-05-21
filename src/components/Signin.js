import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { Form,Button ,FormGroup, Media, Image, Container, Row, Col, Card, FormCheck} from 'react-bootstrap';

const SPREADSHEET_ID = '1dmN8WibC_8nvAdTtGXOFNo74EjeZx5cl4vU-UNq0Cnw'; //from the URL of your blank Google Sheet
const CLIENT_ID = '32857250398-fk549cd2ta12kf0bobakjbndue7hafjm.apps.googleusercontent.com'; //from https://console.developers.google.com/apis/credentials
const API_KEY = 'AIzaSyBB_Nd207F9MELMvcHBlhkDX2ufWAlZ2uo'; //https://console.developers.google.com/apis/credentials
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';



const SignIn = () => {
    const [values, setValues] = useState({ email: "", password: "", name: "" });
    const [logInStatus, setStatus] = useState({is_login:""})

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
        }).then(function () {
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }


    const onFormSubmit = (event) => {
            event.preventDefault();
            const params = {
                spreadsheetId: SPREADSHEET_ID,
                range: 'Sheet1',
            };
            let request = gapi.client.sheets.spreadsheets.values.get(params);
            request.then(function (response) {
                var login_data     = JSON.stringify(response.result.values);
                var login_data     = JSON.parse(login_data);

                for (var i=0; i < login_data.length; i++) {
                    if(login_data[i][1] === values.email && login_data[i][2] === values.password) {
                        
                        setStatus({
                            ...logInStatus,
                            is_login: true
                        });
                        localStorage.setItem('is_login', true);
                        window.location.reload();
                    } else {
                        console.log("Error in Logging In");
                    }
                }
            }, function (reason) {
                console.error('error: ' + reason.result.error.message);
            });
    }
    
    return (
        <div>
            {
            (logInStatus.is_login == true) ? <Redirect from="/signin" to="/home" /> :  
                <Container className="w-75 d-flex justify-content-center border border-darken-1 mt-5">
                    <Row className="container-fluid">
                        <Col>
                            <Media>
                                <Image src="signin-image.webp"></Image>
                            </Media>
                        </Col>
                        <Col>
                            <h3 className='d-flex mt-4'>Sign In</h3>
                            <form onSubmit={onFormSubmit} className="mt-5">
                                <FormGroup>
                                    <input class="form-control col-md-5" type="email" name="email" placeholder="Your Name" onChange={handleChange} value={values.email}></input>
                                </FormGroup>
                                <FormGroup>
                                    <input class="form-control col-md-5" type="password" name="password" placeholder="Your Password" onChange={handleChange} value={values.password}></input>
                                </FormGroup>
                                <Form.Group className="d-flex" class="form-control" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button className="float-left" type="submit">Log In</Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
}

export default SignIn
