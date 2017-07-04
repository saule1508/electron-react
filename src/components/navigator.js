import React from 'react'

const STYLE = {'btn':{'minWidth': 50, 'padding': 10, 'marginRight': 10}}

const Navigator = ({prev,next,step}) => {
  let classPrev = "btn btn-primary";
  let classNext = "btn btn-primary";
  if (step === 1){
    classPrev += " disabled";
  }
  if (step >= 4){
    classNext += " disabled";
  }  
  return (
      <div className="col-md-12 text-center">
        <div className="btn-group" role="group" aria-label="Navigation button">        
            <button type="submit" className={classPrev} style={STYLE.btn} onClick={prev}>{'<'}</button>
            <button type="submit" className={classNext} style={STYLE.btn} onClick={next}>{'>'}</button>
        </div>
      </div>
  )
}

export default Navigator