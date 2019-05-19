import React from 'react'
import FelixImg from '../images/felix.jpg';

const CompletedTasksImage = ({currentList}) => {
  var imageMessage = (currentList === '') ? 'Click on the [+] in the sidebar to create a new list!' : 'Nothing here yet.';
  return (
    <div className="TasksImageWrapper">
      <img className="felixTheCat" src={FelixImg} alt="Tasks are Complete."/>
      <li id="acu"><span className="wiredLink">{imageMessage}</span></li>
    </div>
  )
}

export default CompletedTasksImage