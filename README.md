# Te Whare Piringa Booking System

Te Whare Piringa needed a booking system for its hall that would allow members of the community to see what times the hall was available to be booked and what times had already been booked.  This was driven by a need for members to be able to book times themselves directly (which should reduce double booking mistakes) and see what times the hall was booked without also seeing who held the booking.

## Dev Environment Setup

First clone the repo down and install the node modules with `npm install`.

Be sure you have Docker and Docker Compose installed.

Rename `.env.example` to `.env` and edit it to have the correct values.

Start the MongoDB database using `docker-compose up`. Add ` -d` to the end if you don't need to see the logs and want to free up a terminal window.

After the images are downloaded (first time only) and the services are running, the Mongo Express admin interface can be found on [http://localhost:8081](http://localhost:8081) if you want to view/edit the data in the database. The username is `admin` and the password is `pass`. Create a new database called `te-whare-piringa`.

If you want to add some example bookings, run `npm run seed` in your terminal from the root of the project. This will create 3 bookings from 8am to 6pm:

* An unconfirmed one for today
* A confirmed one for tomorrow
* A confirmed one for yesterday

Run the app with `npm run dev` and it will be running on [http://localhost:3000](http://localhost:3000).
