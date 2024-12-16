import { useState, useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AddWorkout() {
    const notyf = new Notyf();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Input states
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    function createWorkout(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/AddWorkout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setName("");
                    setDuration("");
                    notyf.success("Workout Added");
                } else {
                    notyf.error("Error: Something went wrong.");
                }
            });
    }

    return (
        <Container className="d-flex flex-column align-items-center mt-4">
            <h1 className="text-center mb-4">Add Workout</h1>

            {/* Form */}
            <Form className="col-md-6" onSubmit={createWorkout}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formDuration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout duration"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Form.Group>

                {/* Buttons */}
                <Row className="justify-content-center gap-3">
                    <Col xs="auto">
                        <Button variant="success" type="submit" onClick={createWorkout}>
                            Add Workout
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="danger" onClick={() => navigate('/addWorkout')}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
