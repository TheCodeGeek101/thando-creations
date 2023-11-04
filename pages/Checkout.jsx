import React, { useContext, useState } from 'react'
import StepperControl from '../components/Auth/StepperControl'
import Stepper from '../components/Auth/Stepper';
import Shipping from '../components/Auth/steps/Shipping';
import Payment from '../components/Auth/steps/Payment';
import PlaceOrder from '../components/Auth/steps/PlaceOrder';
import Complete from '../components/Auth/steps/Complete';
import { Store } from '../contexts/StoreContext';
// import StepperContext from '../contexts/StepperContext';
import Header from "../components/Header";

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1); 
    
    const steps = [
        "Shipping Address",
        "Payment Method",
        "Place Order",
        "Complete"
    ];
    const displayStep = (step) => {
            switch(step){
                case 1:
                    return <Shipping/>
                case 2:
                    return <Payment/>
                case 3:
                    return <PlaceOrder/>
                case 4:
                    return <Complete/>
                default:
            }
    }

    const handleClick = (direction) => {
        // 
        let newStep = currentStep;
         direction == "next" ? newStep++ : newStep--;
        //  check if steps are within bounds
        newStep > 0 && newStep < steps.length && setCurrentStep(newStep);
    }
  return (
    <div>
    <Header/>
    <div className='md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white '>
        {/* Stepper */}
        <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep}/>
        </div>
     
        <div className="my-10 p-10">
            {/* Display components */}
            {displayStep(currentStep)}
        </div>
      
        {/* Navigation controls */}
        <StepperControl
           handleClick={handleClick}
           currentStep={currentStep}
           steps={steps}

        />
    </div>
    </div>

  )
}

export default Checkout