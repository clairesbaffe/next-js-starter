# Hive Tracking System with Next.js, Mapbox, and MQTT

## Technologies Used
- Next.js - React framework for web development
- Mapbox - Interactive maps integration
- MQTT - Real-time communication between trackers and the application
- Prisma - ORM for database management
- Vercel - Hosting and deployment of the application

## Project Overview
This web application was developed during an internship for a startup specializing in electronic beekeeping scales. The main objective is to allow beekeepers to track their hives in real time and receive alerts in case of suspicious movement, reducing the risk of theft.

## Key Features
### Interactive Map with Mapbox
- Real-time display of tracker positions.
- Filtering system for trackers based on their status: active, paused, alert, off.
- Special display for trackers in alert mode, showing multiple coordinates to track the last suspicious movements.

### Tracker Management
- Adding and removing trackers.
- Associating trackers with hives.
- Updating tracker statuses (e.g., switching from "alert" to "active").

### Real-time Notification System
- When a tracker changes status (e.g., enters pause mode), an MQTT message is sent to the Mosquitto broker.
- Notifications work even when the application runs in the background.

### Filtering and Position History
- Filtering trackers based on their state.
- Viewing position history for precise movement tracking.

## Technical Challenges and Solutions
### Learning Next.js and React
- Gained expertise in state management and integrating Mapbox.
- Implemented a dynamic filtering system for trackers on the map.

### Managing Status and Timing
- Implemented a cron-like mechanism to automatically pause and reactivate trackers.
- Ensured consistency between tracker states and real-time display.

### Integrating MQTT
- Used the mqtt library to enable real-time communication with the tracker.
- Synchronized updates between the API and the user interface to ensure data accuracy.

## Results
- Fully functional application: Deployed on Vercel, enabling efficient real-time tracker management.
- Optimized hive tracking: With Mapbox and MQTT integration, users can monitor their hives and receive alerts for suspicious movements.

## Installation and Setup
### Prerequisites
- Node.js >= 16
- A Mapbox account (for API key)
-   An MQTT broker (e.g., Mosquitto)

### Installation

```sh
pnpm install
```

### Configuration
Create a .env.development.local file and add:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=YourMapboxAPIKey
MQTT_BROKER_URL=YourMQTTBrokerURL
```
Add the connexion to your database.


### Running the application
```sh
pnpm dev
```

The application will be available at `http://localhost:3000`.

Production is available at any time at [here](https://next-js-starter-lyart.vercel.app/tracker).
