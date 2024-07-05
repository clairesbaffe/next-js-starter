'use client';

import { useState } from 'react';

const MqttPublishComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    setLoading(true);
    setError(null);

    const message = { ind: 1, time: 8 };

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: 't/p/idTracker', message: message }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || 'An error occurred while publishing the message',
        );
      }

      console.log(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MqttPublishComponent;
