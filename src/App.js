import './App.css';
import {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [tank, setTank] = useState('')
    const [mpg, setMpg] = useState('')
    const [distance, setDistance] = useState('')
    const [result, setResult] = useState('')
    const [h2Class, setH2Class] = useState('');
    const [road, setRoad] = useState('')
    const [fuel, setFuel] = useState('')
    const [needRoad, setNeedRoad] = useState('')
    const [fuelNeed, setFuelNeed] = useState('')
    const [carClass, setCarClass] = useState('static');
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setTank('')
        setMpg('')
        setDistance('')
        setModal(!modal);
    }

    const onCalculate = () => {
        const carDistance = tank * mpg;
        let reality, haveFuel, failDistance, needFuel;
        if (carDistance >= distance) {
            setResult('Yes')
            setCarClass('moving')
            reality = +carDistance - +distance
            haveFuel = reality / +mpg
            setRoad(reality.toFixed(2))
            setFuel(haveFuel.toFixed(2))
        } else {
            setResult('No')
            setCarClass('not-moving')
            failDistance = +distance - +carDistance
            needFuel = failDistance / +mpg
            setNeedRoad(failDistance.toFixed(2))
            setFuelNeed(needFuel.toFixed(2))
        }
        toggle()
    }

    const click = () => {
        setTank('')
        setMpg('')
        setDistance('')
        setCarClass('static')
        setResult('')
        setModal(!modal);
    }

    const reset = () => {
        setTank('')
        setMpg('')
        setDistance('')
        setCarClass('static')
        setResult('')
    }

    useEffect(() => {
        if (result === 'Yes') {
            setCarClass('moving');
            setResult(`Arrived! You have ${fuel} gallons extra and you can drive another ${road} miles!`)
        } else if (result === 'No') {
            setCarClass('not-moving');
            setResult(`You've not arrived! You need ${fuelNeed} gallons more to drive another ${needRoad} miles!`)
        }
    }, [fuel, fuelNeed, needRoad, result, road]);

    useEffect(() => {
        if (carClass === 'moving') {
            setH2Class('green');
        } else if (carClass === 'not-moving') {
            setH2Class('red');
        }
    }, [carClass]);

    return (
        <div className="App">
            <h1>Gas Mileage Calculator</h1>
            <div>
                <div className='button-container'>
                    <Button color="primary" onClick={click}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={reset}>
                        Reset
                    </Button>
                </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Create New Trip</ModalHeader>

                    {(tank <= 0 || mpg <= 0 || distance <= 0) &&
                        <ModalFooter>
                            <p className="error">Please enter a number greater than 0</p>
                        </ModalFooter>}
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="tank">Gallons :</label>
                            <input className="form-control" min='0' value={tank}
                                   onChange={(e) => setTank(e.target.value)} name='distance' type='number'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mpg">MPG :</label>
                            <input className="form-control" min='0' value={mpg}
                                   onChange={(e) => setMpg(e.target.value)} name='distance' type='number'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="distance">Distance :</label>
                            <input className="form-control" min='0' value={distance}
                                   onChange={(e) => setDistance(e.target.value)} name='distance' type='number'/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            disabled={tank === '' || mpg === '' || distance === '' || tank <= 0 || mpg <= 0 || distance <= 0}
                            color="primary" onClick={onCalculate}>
                            Submit
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div>
                <img src={require('./road.jpg')} alt="Road" className="road"/>
                <div className={carClass}>
                    <img src={require('./retro-pick-up-car.png')} alt="Car" className="car"/>
                </div>
            </div>
            <h2 className={h2Class}>
                {result}
            </h2>

            {/*<h2 className={`${carClass === 'moving' ? 'green' : 'red'}`}>*/}
            {/*    {result}*/}
            {/*</h2>*/}
        </div>
    );
}

export default App;
