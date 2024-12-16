import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="text-center">
                <Col>
                    <h1>Welcome to Zuitt Workouts</h1>
                    <p>Your Workout Tracker!</p>
                    {user.id ? (
                        <Link to="/addWorkout">
                            Add Workout
                        </Link>
                    ) : (
                        <Link to="/login">
                            Login to get Started
                        </Link>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
