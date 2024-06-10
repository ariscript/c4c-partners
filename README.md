# c4c-partners

This is my implementation of the C4C technical challenge for Fall 2024.

## Setup

This project requires [Node](https://nodejs.org) (and its included `npm`).

Tested on Node v20.13.1 and npm v10.8.0.
If your system has `nvm` installed, you can run `nvm use` in this repository
to automatically get a working installation.

1. Clone this repository (or download a zip archive of the main branch).
2. Open a terminal at the root of the cloned repository.
3. Run `npm i`.
4. Run `npm run dev` to start run both the frontend and backend locally.
5. Open `http://localhost:3000/` in your browser to look at the page.
6. To stop the server, type `^C` (Control-C) in ther terminal window.

## Bonus Features

I implemented the following bonus features as described in the challenge
document.

-   Searching by organization name
-   Ability to edit organization details
-   Persistent data across application restarts
    -   Reads data from a file on start, and writes to it on exit

## App Overview

This project is split into the frontend and the backend, so I'll go over each
of thsoe individually.

### Frontend

The frontend of this project uses [React](https://react.dev) and has two major
components, the `PartnerTile` and `Dashboard`.

The PartnerTile component shows the data for a given partner, and also the UI
to edit the partner's data, and delete that partner.
The Dashboard shows a list of PartnerTile components, a button to create a new
partner, and a search bar.
The New Partner button creates a new PartnerTile with default information,
which can then be edited to contain the new data desired by the user.

### Backend

The backend for this app consists of one route, `http://localhost:4000/`, and
does different tasks based on the method.

-   `GET`: Return all currently registered partners.
-   `POST`: Create a new partner.
    -   Returns 200 with the updated partner list on success.
    -   Returns 409 with an error if a partner with that name already exists.
-   `PUT`: Edits an existing partner.
    -   Returns 200 with updated partner list on success.
    -   Returns 404 with an error if no partner with that name exists.
-   `DELETE`: Deletes an existing partner.
    -   Returns 200 with updated partner list on success.
    -   Returns 404 with an error if no partner with that name exists.

When starting the app, the backend reads from a file called `data/partners.json`
to load starting data. This file is expected to be a valid JSON array of
`PartnerDetails` objects. If the file contains an empty array, the app uses
default data for testing purposes. This can be avoided by deleting the default
object and adding some other data to it instead.

When the server shuts down, the backend saves the current partners list into the
same file.

## Design Decisions

By the wise words of the great Ben Lerner, I have made some design decisions.
It is now time to document them.

### Unique Names

All partners in the list must have different names, and the name field is
being used almost as the primary ID.
Names are used to find which partner to edit or remove for the requests that
operate on existing data.

### Edit Mode

My PartnerTile has a boolean state value that represents whether that partner
is being edited. This gives it functionality similar to having two components
that are being conditionally switched on the same boolean flag.

I could've implemented two different components, but I felt like having it all
in one was easier to think about and organize. It also bundles the edit
functionaltiy nicely with displaying components individually.

### New Partner Button

I have a button that creates a new partner tile, that makes some interesting
descisions.

#### Search must be clear

I require that the search bar is clear, since in most cases, the search query
would not contain the default partner name for something that was just added.
This could be confusing for the user since they won't see any feedback
indicating that a new tile was indeed created.
Requiring the search be off solves this issue since the new tile is guaranteed
to be shown.

#### Default partner data

When creating a new partner tile, it gets automatically populated with some
default data.
The name that gets generated looks something like `"New Partner <hex>"`.
This was made to ensure that if the user created multiple new partners at once
without editing a previous one, it won't result in a name collision.
This also avoids me having to do too much extra work to be able to change
data for a new partner, since users can just create and then edit the data
just as usual.
This data generation also comes with a sample image from
[picsum](https://picsum.photos).

## Reflections

Since I've had a lot of experience with web developement before (at least on
the frontend side), I had few isseus getting the frontend working.
I was able to get the partner list working relatively quickly, and focused
most of my time on making the backend work and easy to use.
I also spent a lot of time on getting the CSS to look just right.

I refrained from adding a proper database since that's what the challenge
document told me to do, but for a more serious project, I would definitely
work on using something like PostgreSQL.

I didn't implement authentication because I wasn't familiar on how to properly
handle security, or use OAuth, especially without a database set up for this
purpose.
I also wanted to avoid external services like Firebase as much as possible
since they just serve to add complexity, and might be a bad choice if this
app were to scale to something bigger.
If I had enough time to learn how to correctly handle secure data, I would've
added authentication (and probably a database as well).

The bonus features I added here were ones I could easily implement with the
architecture I already had in place.
I made the editing UI before the creation workflow, so I decided to use
what I had so far to finish off implementing creation as well - which resulted
in getting a bonus feature almost for free alongside a required feature
(creating new partners).
I also added searching because it was relatively simple to filter the array
given to me by the backend to only those that included a search query.
For data persistence, I wanted to minimize the number of file reads and writes
I did for performance reasons, as too many writes to a file (i.e., on every
change to the underlying data) can cause slowdowns. So, I decided on only doing
a read at the beginning of execution, and writing at the end.

## License

This project is Free Software, licensed under [AGPL 3.0 or later](LICENSE).

However, Since this is a submission for a competitive challenge, this license
does not take effect until the end of the submission period
(June 13, 2024 11:59 PM ET).
Until this time has passed, this application is not free for other submissions
to use.
