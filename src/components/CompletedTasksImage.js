import React from 'react'
import FelixImg from '../images/felix.jpg';

const CompletedTasksImage = ({currentListName}) => {
  var imageMessage = currentListName ? 'Nothing here yet.' : 'Click on the [+] in the sidebar to create a new list!';
  return (
    <div className="TasksImageWrapper">
      <img className="felixTheCat" src={FelixImg} alt="Tasks are Complete."/>
      <li id="acu"><span className="wiredLink">{imageMessage}</span></li>
    </div>
  )
}

export default CompletedTasksImage