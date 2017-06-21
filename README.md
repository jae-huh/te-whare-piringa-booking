# Booking System

Built by [Luke Davison](https://github.com/luke-davison), [Jae Huh](https://github.com/Jae-Huh), [Paul Brabet](https://github.com/paul-brabet) and [Jack Daffron](https://github.com/daffron)

This project was created as our final project for our studies at Enspiral Dev Academy Auckland.

A community organisation had expressed a need for a booking system for its hall that would allow potential hall users to see what times the hall was available to be booked and what times had already been booked.  This was driven by a need for users to be able to book times themselves directly (which should reduce double booking mistakes) and a need for users to be able to see what times the hall was booked without also seeing who had booked.

The project was started on 15 June 2017 and "finished" on 21 June 2017".

## Setup

First clone the repo down and install the node modules.

In addition, you will need to have mongoDB installed.

In order for this to operate on your local machine you will need a .env file with the following variables:

MONGODB_URI=mongodb://(mongo admin user):(password)@localhost:27017/admin
CALLBACK=http://localhost:3000/callback
EMAIL=(working email address)
EMAIL_PASS=(password to that email address)

There are hardcoded variables (such as those relating to Auth0) that have been coded that we have not extracted which you may need to change.


