import React, { useState, useEffect } from 'react';

const TerminalFeed = () => {
  const [events, setEvents] = useState([
    { type: 'sys', message: 'Establishing secure link...' }
  ]);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const response = await fetch('https://api.github.com/users/AnurupChowdhury05/events/public?per_page=3');
        if (!response.ok) throw new Error('API Limit');
        const data = await response.json();
        
        const parsedEvents = data.slice(0, 3).map(event => {
          let msg = '';
          if (event.type === 'PushEvent') {
            msg = `Pushed ${event.payload.commits?.length || 1} commit(s) to ${event.repo.name}`;
          } else if (event.type === 'CreateEvent') {
            msg = `Created ${event.payload.ref_type} in ${event.repo.name}`;
          } else if (event.type === 'WatchEvent') {
            msg = `Starred ${event.repo.name}`;
          } else {
            msg = `Activity (${event.type}) in ${event.repo.name}`;
          }
          return { type: 'git', message: msg };
        });
        
        setEvents([
          { type: 'sys', message: 'Connection established.' },
          ...parsedEvents
        ]);
      } catch (err) {
        setEvents([
          { type: 'sys', message: 'Neural link offline. Reverting to local cache.' },
          { type: 'log', message: 'Building: Enterprise LangGraph AI Platform' },
          { type: 'log', message: 'Deploying: Portfolio v2.0' }
        ]);
      }
    };
    
    // Slight delay to simulate connection
    setTimeout(fetchGitHub, 2000);
  }, []);

  return (
    <div className="terminal-feed glass-card reveal">
      <div className="terminal-feed-header">
        <span className="live-dot"></span>
        <span className="terminal-feed-title">LIVE_ACTIVITY_FEED</span>
      </div>
      <div className="terminal-feed-body">
        {events.map((ev, i) => (
          <div key={i} className="feed-line">
            <span className={`feed-type ${ev.type}`}>[{ev.type.toUpperCase()}]</span>
            <span className="feed-msg">{ev.message}</span>
          </div>
        ))}
        <div className="feed-line">
          <span className="feed-type sys">[SYS]</span>
          <span className="feed-msg">Awaiting command<span className="cursor-blink">_</span></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalFeed;
