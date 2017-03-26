# Project

## Project Links

### Website URL
https://fantasy-genius.herokuapp.com/

### Video URL


### Documentation URL
https://fantasy-genius.herokuapp.com/documentation.html


## Project Proposal

### Project title
FantasyGenius

### Team members
- Vethushaan Akilathasan
- Joshua Greenslade

### Description of web application
The application that we plan on developing is going to be a sports fantasy league site.

### Description of the key features that will be completed by the Beta version
- Features below will be implemented for one sport
- Users will be able to signin/up, create or join a league
- Users can only be in one league
- Users will be able to draft players for their team (no 2 players in a league can have the same player, but people in 2 different legues can)
- Users will be able to view their points for a specific day/week/month/overall
- Users will be able to compare themselves with the other people in their league
- Users will be able to trade players with others in their league
- Users will be able to sign or release players
- if a user signs or releases a player the change will not officially take effect until the next day (cannot gain points for someone they just traded for/signed)
- stats will be calculated for each user at the end of the day
- after stats are calculated then player transactions will take place
- users can decide who on their team will play each day
- users participate in daily matches with the opponent being randomly selected

### Description of additional features that will be complete by the Final version
- All features including ones in beta version will be implemented for 4 sports(baseball, basketball, football, hockey)
- Users will have a choice of how to signin/up (on the site, through facebook/twitter, etc.)
- ensure that users cannot draft players out of turn
- allow users to choose which sport they would like to play
- users can be in a league for each sport
- allow users to plan their rosters a week in advance
- ensure that players are put in thier appropriate position
- league admin can view/modify their league profile (name, password, picture)
- restrict user's team to have a max number or players or make them stay under a budget
- have a timeout of drafting it the user takes to long either skip their turn or give them a random player
- optional: users will be able to see score predictions for real-life games

### Description of the technology that you will use
- We will be using bootstrap as the framework for our frontend because of its robustness and extensive documentation, meaning that we can hopefully learn it quickly and it will satisfy all of our needs
- We will be using the MySportsFeeds API to retrieve all of our data, this is a free REST API which we will use to retrieve all of the games and statistics

### Description of the technical challenges
- One of the main challenges we will have is allowing users to have the ability to communicate with one another, therefore notifying users when a change has been made
- The draft will be another issue since multiple users will have to run concurrently and changes will have to be sent to other users quickly
- Learning Bootstrap may also be a challenge since we have not used it before
