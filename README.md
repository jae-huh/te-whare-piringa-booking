# Booking System

Built by [Luke Davison](https://github.com/luke-davison), [Jae Huh](https://github.com/Jae-Huh), [Paul Brabet](https://github.com/paul-brabet) and [Jack Daffron](https://github.com/daffron)

This project was created as our final project for our studies at Enspiral Dev Academy Auckland.

A community organisation had expressed a need for a booking system for its hall that would allow potential hall users to see what times the hall was available to be booked and what times had already been booked.  This was driven by a need for users to be able to book times themselves directly (which should reduce double booking mistakes) and a need for users to be able to see what times the hall was booked without also seeing who had booked.

The project was started on 15 June 2017 and "finished" on 21 June 2017".

## Setup

First clone the repo down and install the node modules with `npm install`.

Be sure you have Docker and Docker Compose installed.

Rename `.env.example` to `.env` and edit it to have the correct values.

Start the MongoDB database using `docker-compose up`.

## Todos

1. Update all dependencies
1. Replace `react-modal-dialog` with `react-modal`
1. Refactor `api-router.js` into multiple route modules
1. Fix Google Maps on the homepage
1. Ava :arrow_right: Jest
1. Refactor `client/actions/index.js`
1. Update the README file
1. Sanitise exceptions
1. Make sure email is sent when booking is added
