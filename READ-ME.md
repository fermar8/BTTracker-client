# Basketball Training Tracker



## Description

With Basketball training tracker teams will be able to setup trainings in a calendar and monitor player progress.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up to the app as a user so that I can start using the tracker
- **Login:** As a user I can login to the app either as an admin or a player
- **Logout:** As a user I can logout from the app so no one else can use it
- **View Player List**: As a user I want to be able to see a player list
- **Add Player**: As a user I want to add a player to my team
- **Edit Player**: As a user I want to edit a player on my team
- **Delete Player**: As a user I want to delete a player from my team
- **Add Trainings** As a user I can add training days to the calendar
- **Delete Trainings** As a user I can delete a training day on the calendar
- **View Trainings** As a user I can view a particular training for a set date
- **Edit Trainings** As a user I can edit a particular training for a set date
- **View Team Stats** As a user I want to see how my players and overall team are doing in training

## Backlog

Coach profile:

- See my profile and display history of exercises/notes
- Add new stats/customize stats

Create player profile:

- Add a player user role
- Add player profile and display his performance history

Add team model and possibility to edit background and icons



# Client / Frontend

## React Router Routes (React App)

| Path            | Component      | Permissions                | Behaviour                                                    |
| --------------- | -------------- | -------------------------- | ------------------------------------------------------------ |
| `/`             | HomePage       | public `<Route>`           | Home page                                                    |
| `/signup`       | SignupPage     | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`        | LoginPage      | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login |
| `/team`         | TeamPage       | user only `<PrivateRoute>` | Shows all players in the team                                |
| `/team/add`     | TeamPage       | user only `<PrivateRoute>` | Adds a new player to the team and shows the list of players with edit buttons |
| `/team/:id`     | EditPlayerPage | user only `<PrivateRoute>` | Details of a player to edit or delete                        |
| `/calendar/`    | CalendarPage   | user only `<PrivateRoute>` | Displays current team calendar and a pop-up to add, edit or delete a training |
| `/calendar/:id` | TrainingPage   | user only `<PrivateRoute>` | Details of a training to edit or delete                      |
| `/stats/`       | TeamStatsPage  | user only `<PrivateRoute>` | View all players stats for the user's team                   |
|                 |                |                            |                                                              |
|                 |                |                            |                                                              |

## Components

- HomePage
- SignupPage
- LoginPage
- Navbar
- PopUp
- TeamPage
- EditPlayerPage
- CalendarPage
- TrainingPage
- TeamStatsPage

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
- Team Service
  - team.getOne(id) //coachId
- Player Service
  - player.getPlayer(id) //playerId
  - player.createPlayer(player) // Obj with player data
  - player.updatePlayer(id, player) //id and Obj with player data
  - player.deletePlayer(id)
- Training Service
  - training.getAll(id) //gets all trainings for the coachId
  - training.getOne(id) //trainingId
  - training.updateOne(id, training) 
  - training.delete(id)
- Stats Service
  - stats.list()



# Server / Backend

## Models

```javascript
const coachSchema = new Schema ({
   	username: {type: String, unique: true},
    team: {type: String, unique: true},
    teamImage: String,
  	coachImage: String,
    email: String,
	password: String,
    players: [{type: mongoose.Schema.ObjectId, ref: "Player"}]
    trainings: [{type: mongoose.Schema.ObjectId, ref: "Training"}],
 })
```

``` javascript
const playerSchema = new Schema ({
    name: {type: String},
 	number: {type: String},
    team: {type: mongoose.Schema.ObjectId, ref: "Coach"}
    image: {type: String},
    email: {type: String},   
})
```

``` javascript
const trainingSchema = new Schema ({
    coach: {type: mongoose.Schema.ObjectId, ref: "Coach"}
    date: Date,
    exercises: {type: String},
    notes: {type: String},
    stats: [{type: mongoose.Schema.ObjecId, ref: "TrainingPerformance"}]
 })                                
```

```javascript
const trainingPerformanceSchema = new Schema ({
    date: Date,
    player: {type: mongoose.Schema.ObjectId, ref: "Player"},
    attendance: {type: Boolean},
    coachComments: {type: String},                                 
    ftAttempted: {type: Number},
    ftConverted: {type: Number},
    twoPAttempted: {type: Number},
    twoPConverted: {type: Number},
    threePAttempted: {type: Number},
    threePConverted: {type: Number},
    
})
```





## API Endpoints (backend routes)

| HTTP Method | URL                 | Request Body                                             | Success status | Error Status | Description                                                  |
| ----------- | ------------------- | -------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/team`        | Saved session                                            | 200            | 404          | Check if user is logged in and return team page              |
| POST        | `/auth/signup`      | {username, team, coachImage, teamImage, email, password} | 201            | 404          | Checks if fields not empty (422) and user doesn't exist (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`       | {username, password}                                     | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`      | (empty)                                                  | 204            | 400          | Logs out the user                                            |
| GET         | `/api/team`         |                                                          |                | 400          | Shows all players for current coach team                     |
| GET         | `/api/team/stats`   |                                                          | 201            | 400          | Gets team stats                                              |
| GET         | `/api/players/:id`  | {id}                                                     |                |              | Shows specific player                                        |
| POST        | `/api/players`      | {name, number,image, email}                              | 201            | 400          | Creates and saves a new player                               |
| PUT         | `/api/players/:id`  | {name, number, image, email}                             | 200            | 400          | Edit a specific player                                       |
| DELETE      | `/api/players/:id`  | {id}                                                     | 201            | 400          | Deletes players from the team                                |
| GET         | `/api/training`     |                                                          |                | 400          | Shows all trainings for the current coach                    |
| GET         | `/api/training/:id` | {id}                                                     |                |              | Shows specific training                                      |
| POST        | `/api/training`     | {date, exercises, notes, stats}                          | 200            | 404          | Adds a training                                              |
| PUT         | `/api/training/:id` | {date, exercises, notes, stats}                          | 201            | 400          | Edit specific training                                       |
| DELETE      | `/api/training/:id` | {id}                                                     | 200            | 400          | Deletes specific training                                    |
| GET         | `/api/team/stats`   |                                                          | 201            | 400          | Gets team stats                                              |



## Links

### Trello

[My Trello board](https://trello.com/b/ybPlde17/bball-training-project) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/fermar8/BTTracker-client)

[Server repository Link](https://github.com/fermar8/BTTracker-server)

[Deployed App Link](http://heroku.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com/)

