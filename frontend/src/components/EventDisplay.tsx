import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

function EventScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <div className="event-screen">
        <h2>No event data found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const event = state;
  const isUserGoing = event.attendees?.includes(auth.currentUser?.uid);

  const handleJoin = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to join an event");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const eventRef = doc(db, "events", event.id);

      if (isUserGoing) {
        // cancel RSVP
        await updateDoc(eventRef, {
          attendees: arrayRemove(auth.currentUser.uid),
          rsvpCount: increment(-1),
        });
        alert("RSVP cancelled!");
      } else {
        // add RSVP
        await updateDoc(eventRef, {
          attendees: arrayUnion(auth.currentUser.uid),
          rsvpCount: increment(1),
        });
        alert("You joined the event!");
      }

      // update local state to reflect change
      event.rsvpCount = isUserGoing
        ? (event.rsvpCount ?? 1) - 1
        : (event.rsvpCount ?? 0) + 1;

      if (!event.attendees) event.attendees = [];
      if (isUserGoing) {
        event.attendees = event.attendees.filter((id: string) => id !== auth.currentUser?.uid);
      } else {
        event.attendees.push(auth.currentUser.uid);
      }
    } catch (err) {
      console.error("Error updating RSVP:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimilar = () => {
    alert("Show similar events (filter by tags)");
  };

  return (
    <div className="event-screen">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="host-name">Hosted by {event.hostName ?? "Unknown"}</h2>

      <div className="container">
        <div className="topLeft">
          <img
            src={event.imageUrl || "/placeholder.jpg"}
            alt={event.title}
            className="panel-image"
          />
        </div>

        <div className="bottomLeft">
          <h3 className="event-title">{event.title}</h3>
          <div className="tags">
            {event.tags?.length > 0 ? event.tags.join(" • ") : "No tags"}
          </div>
        </div>

        <div className="rightSide">
          <h4>About this event</h4>
          <div className="desc">{event.description || "No description provided."}</div>

          <div className="extra-info">
            <p>
              <strong>Location:</strong> {event.location ?? "TBD"}
            </p>
            <p>
              <strong>Attendees:</strong> {event.rsvpCount ?? 0}
              {event.capacity ? ` / ${event.capacity}` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button
          className="action-button"
          onClick={handleJoin}
          disabled={loading || (event.capacity && event.rsvpCount >= event.capacity && !isUserGoing)}
        >
          {loading ? "Updating..." : isUserGoing ? "Cancel RSVP" : "Join Event"}
        </button>

        <button className="action-button secondary" onClick={handleSimilar}>
          Similar Events
        </button>
      </div>
    </div>
  );
}

export default EventScreen;