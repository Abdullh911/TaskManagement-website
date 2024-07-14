import React, { useEffect } from 'react';


const DoneCard = (props) => {
    useEffect(()=>{
    })
    function calculateTimeTaken(startTime, endTime) {
      let start = parseTime(startTime);
      let end = parseTime(endTime);
      if (end < start) {
          end.setDate(end.getDate() + 1);
      }
      let timeDifference = (end - start) / (1000 * 60);
      return timeDifference;
  }
  
  function parseTime(timeString) {
      let [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) {
          hours += 12;
      } else if (period === 'AM' && hours === 12) {
          hours = 0;
      }
      return new Date(0, 0, 0, hours, minutes);
  }
  return (
    <div className="donecard-wrapper">
      <div style={{ backgroundColor: props.color }} className="donecard">
        <h2>{props.content}</h2>
        <p>taken time:{calculateTimeTaken(props.time,props.doneTime)} mins</p>
      </div>
    </div>
  );
}

export default DoneCard;
