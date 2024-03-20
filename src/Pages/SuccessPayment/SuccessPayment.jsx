import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router
import './SuccessPayment.css';
import Header from '../../components/Header/Header';

function SuccessPayment() {
    const [test, setTest] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        // Assuming you have a query string parameter named 'test'
        const testParam = queryParams.get('success');
		// console.log(testParam);
        if (testParam === 'true') {
            setTest(true);
        } else {
            setTest(false);
        }
    }, [location.search]);

    return (
        <>
            <Header />
            <div className='SuccessPayment'>
                <div className="container">
                    <div className="content">
                        <h2>{test ? "Successfully paid" : "Unsuccessfully paid"}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessPayment;
