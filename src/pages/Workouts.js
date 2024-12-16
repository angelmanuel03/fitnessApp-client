import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function MyWorkouts() {
    const { user } = useContext(UserContext);
    const notyf = new Notyf();
    const [workouts, setWorkouts] = useState([]);

    // Fetch user workouts
    const fetchData = () => {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.workouts)) {
                    setWorkouts(data.workouts);
                } else {
                    notyf.error('Failed to load workouts.');
                }
            })
            .catch(() => {
                notyf.error('Error connecting to the server.');
            });
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">My Workouts</h1>
            {workouts.length > 0 ? (
                <Row className="g-4">
                    {workouts.map((workout) => (
                        <Col md={6} key={workout._id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{workout.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Duration:</strong> {workout.duration} minutes
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center">
                    <p>No workouts found. Start adding your workouts!</p>
                </div>
            )}
        </Container>
    );
}
