import React, { useEffect } from 'react';
import { Table,Card, Row, Col, Container} from 'react-bootstrap';
const Home = () => {

    const state_wise_data = require('./state_wise_data.json');
    const renderTable = (states, index) => {
        return (
            <tr key={index}>
                <td>{states.State}</td>
                <td>{states.Confirmed}</td>
                <td>{states.Active}</td>
                <td>{states.Recovered}</td>
                <td>{states.Deaths}</td>
            </tr> 
        )
    }
        return (
            <div>
                <Row>
                    <Col className="container d-flex justify-content-start">
                        <Container>
                            <input type="text" class="form-control mb-4 mt-5 w-50"></input>
                            <div class="w-50">
                                <Table striped bordered hover variant="light">
                                    <thead>
                                        <tr>
                                        <th>State/UT</th>
                                        <th>Confirmed</th>
                                        <th>Active</th>
                                        <th>Recovered</th>
                                        <th>Deceased</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {state_wise_data.map(renderTable)}
                                    </tbody>
                            </Table>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </div>
        );
}

export default Home;