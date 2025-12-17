import { useEffect } from "react";
import "./notif.css"; 

export function Notif({ notifications, setNotifications }) {
  useEffect(() => {

    if (notifications.length > 0) {
      const timer = setTimeout(() => {
 
        setNotifications((prev) => prev.slice(1)); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]); 


  if (notifications.length === 0) return null;

  return (
    <div className="notifContainer">
      {notifications.map((notif) => ( 
        <div
          key={notif}
          className={`notif ${notif.type}`}
        >
          <p>{notif.message}</p> 
        </div>
      ))}
    </div>
  );
}


