Project description:
This is a Hacker News project. It fetches data from the Hacker News API and displays news and comments. 
I have used React, TypeScript and Material-UI.

#Instructions for starting the project:

1. Clone the repository from Github using `git clone https://github.com/KichukEgor/HackerNews.git`.
2. Navigate to the project directory using `cd HackerNews`.
3. Install the necessary dependencies using `npm install`.
4. Start the project using `npm start`.
5. Open your browser and go to http://localhost:3000 to view the app.

Also you can visit github-pages [website](https://kichukegor.github.io/HackerNews/)


#Product Requirements

Main page
• Shows the latest 100 news in a list sorted by date, most recent on top.
• Each news contains:
  ⁃ Name
  ⁃ rating
  ⁃ author's nickname
  ⁃ publication date
• By clicking on the news, you go to the news page
• The list of news should be automatically updated once a minute without user intervention
• The page should have a button to force refresh of the news list

News Page
• Must contain:
  ⁃ link to the news
  ⁃ news title
  ⁃ date
  ⁃ author
  ⁃ comment counter
  ⁃ list of comments in the form of a tree
• Root comments are loaded immediately upon entering the page, nested - by clicking on the root
• The page should have a button to force refresh of the list of comments
• The page should have a button to return to the list of news

Technical requirements
• Application developed using React
• Using TypeScript
• Used the official Hacker News API (https://github.com/HackerNews/API). Hacker News API calls and data processing are made directly from the frontend
• Routing done using React Router V6
  (https://reactrouter.com/en/main) • Any UI framework of your choice (as an example of MUI (https://mui.com/)).
  ⁃ You can also use pure css, the main thing is to be beautiful
• Application must be launched at localhost:3000
• When clicking on links, the page does not reload
• The source code of the solution must be posted from your Github account (http://github.com/) with a Readme file with instructions for launching

