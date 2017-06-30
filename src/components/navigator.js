import React from 'react'

const Navigator = ({prev,next,step}) => {
  let classPrev = "btn btn-primary";
  let classNext = "btn btn-primary";
  console.log('step %d', step);
  if (step === 1){
    classPrev += " disabled";
  }
  if (step >= 3){
    classNext += " disabled";
  }  
  return (
      <div className="col-md-12 text-center">
        <div className="btn-group" role="group" aria-label="Navigation button">        
          <div className="mr-3" role="group" aria-label="previous button">
            <button type="submit" className={classPrev} onClick={prev}>{'<'}</button>
          </div>
          <div className="mr-3" role="group" aria-label="next button">              
            <button type="submit" className={classNext} onClick={next}>{'>'}</button>
          </div>
        </div>
      </div>
  )
}

export default Navigator