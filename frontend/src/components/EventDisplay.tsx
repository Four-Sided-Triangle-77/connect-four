import "./EventDisplay.css";
import profilePic from './assets/components.jpeg';
function EventScreen() {
  const JoinEvent = () => {
    alert("Event Joined");
  };
/* make sure to implement actual button functions */
  const GetSimilar = () => {
    alert("Similar Events");
  };
  return (
    
    <div>
      <h2>Example event</h2>
        <div className="container">
        <div className="topLeft">
          <img src={profilePic} alt="Profile" className="panel-image" />
        </div>
        <div className="bottomLeft">Name of Event
          <div className="tags">CoolGuy, UF Student, Harambe</div>
        </div>
        <div className="rightSide">Description, requirements, other info
          <div className="desc">Epic cool pool party, bring vibes, vibes required</div>
        </div>
    </div>
    <div className="button-container">
        <button className="action-button" onClick={JoinEvent}>
          Join Event
        </button>
        <button className="action-button" onClick={GetSimilar}>
          Similar Events
        </button>
      </div>

    </div>
  );
  
}


export default EventScreen;