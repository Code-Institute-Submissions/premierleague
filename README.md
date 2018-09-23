# [TOP*SIX*DASHBOARD](https://top-six-dashboard.herokuapp.com/) | developed by Minesh Kothari

<br />
<br />

## Overview

### What is TOP*SIX*DASHBOARD?

Essentially, the **TOP**SIX**DASHBOARD** is a data-rich dashboard allowing you to compare the statistics of six of the biggest teams in English football.

### What does it do?

This dashboard enables you to dive into the stats of your favourite Premier League teams and compare them with other title contenders over the years. You can now visualise the journey of your favourite teams in this data rich dashboard analysing their end of season results and comparing them with the remaining title rivals.

### How does it work?

**TOP**SIX**DASHBOARD** uses a collection of tools to present data in intuitive visualisations. MongoDB is used to store the data, whilst Flask, a Python microframework, is used to retrieve data from MongoDB and present this on the browser. JavaScript libraries such as D3.js, DC.js and Crossfilter.js is used to achieve beautiful data visualisation techniques.

<br />
<br />

## Features

Comparing the 'Big Six' Teams (Home page):
1. Team Selector - Filter results based on the team(s) selected
2. Year Selector - Filter results based on the period selected

Analysing Individual Teams (Team pages):
1. Position Selector - Filter results based on the position the teams finished in
2. Year Selector - Filter results of individual teams based on the period selected

<br />
<br />

## Technologies Implemented

- HTML5

As with every website or web based app, the use of Hypertext Markup Language is paramount. HTML5 has been used as the markup for this project as this would enable use of many of the new semantics to keep the structure of this project clear and in keeping with the latest industry standards.

- CSS

As with markup, Cascading Style Sheets are essential when controlling the layout of the website. Custom CSS was used in this project in conjunction with Bootstrap 4 to style **TOP**SIX**DASHBOARD** enhancing user interaction and delivering exceptional user experience.

- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction)

The Bootstrap framework was used for this project to utilise various components such as Bootstrap's Navbar, Grid, Variables and many other utilities.

- [SASS](https://sass-lang.com)

I used **SASS** as my chosen CSS preprocessor. This is a great way to import custom styles and override the original Bootstrap library. I also have the added benefit of using variables and mixins along with other cool tricks. 

- [NPM](https://www.npmjs.com/)

Node Package Manager was used to install Bootstrap 4 on this project. This approach is ideal as it allows greater flexibility when overriding Bootstrap's original Sass files.

- JavaScript

Custom JavaScript was used on this project as well as other JavaScript libraries such as jQuery, dc.js, d3.js and crossfilter.js. Custom JavaScript was used primarily for the mobile toggle menu button and responsive design choices.

- [DC.js](https://dc-js.github.io/dc.js/)

Dc.js is a JavaScript library used to make interactive dashboards in JavaScript. By clicking and selecting different events in graphs, you can filter the entire dashboard to drill into a particular event.

- [D3.js](https://d3js.org/)

D3.js is a JavaScript library which can be used to create rich data visualizations. D3 takes data which you provide, usually through an external file, and helps bring that data to life using HTML, CSS, and SVG.

- [Crossfilter.js](http://square.github.io/crossfilter/)

Crossfilter.js is a JavaScript plugin used to slice and dice JavaScript arrays. This allows Dc.js to easily manipulate the data table that the graphs use, so they can refresh with the filtered data.

- [Python](https://www.python.org/)

Python is the Back-end programming language used for this project, primarily for the functionalities of Flask and its open library of essential packages. 

- Flask

Flask, a Python microframework is used for this project to route the app to various pages and retrieve data stored on MongoDB, returning it back to the browser.

- [MongoDB](https://www.mongodb.com/)

The Premier League data used for this project is being stored on MongoDB.

<br />
<br />

## Contributing

The **TOP**SIX**DASHBOARD** is a personal project created as part of my Full Stack Web Development course for [Code Institute](https://www.codeinstitute.net/). With that being said, it would be amazing to see the community getting involved by making or suggesting some really interesting changes to this dashboard.

**Things to consider:**

This dashboard relies on many tools and technologies for it to function properly. A large proportion of these have been configured in such a way that you would not be required to make any additional changes to the files for these to work. However, there are some aspects you will need to be taken into consideration if you choose to make changes to the dashboard.

**Prerequisites:**
```
Python 2.7.14
MongoDB 3.6.2
```

### Forking the repo

1. Firstly, you will need to fork the repository. To do this, you will need to click on the **Fork** button in the top-right corner of this page.
2. You will now need a copy of these files on your computer to make changes. To do this, you will need to clone or download the repo you forked in the previous step onto your local computer:
	- Click on the green **Clone or download** button
	- Under **Clone with HTTPS**, copy the clone URL for the repository
	- Open your Git terminal
	- Type ```git clone``` followed by the URL copied in the second step. This should look something like the following:
```console
$ git clone https://github.com/YOUR-USERNAME/premierleague.git
```
3. Once you have the file path all written down, go and hit Enter on your keyboard to request the clone.

And we’re done! Well almost.

### Making changes

Amongst many of the tech, the **TOP**SIX**DASHBOARD** uses Python 2.7 to power the dashboard. You will need to ensure you have this version of Python installed on your PC for optimal usability. This project uses several Python packages and it is recommended having these installed on your local machine using **virtualenv** for the project to function and run properly. 

Included in the repo, you should find a folder called **_env_** which will have all the dependencies pre-installed for you, so all you will need to do is ensure this environment is activated when working on the project.

To do this: 
1. You will first need to locate the path of the project's root folder on your computer.
2. Then, you will need to open up your terminal and activate the virtualenv by typing the file path to the root folder followed by ```\env\Scripts\activate```. This should look something like:
```console
$ C:\Users\YourName\YourFolder\premierLeague\env\Scripts\activate
```

Alternatively, you can create your own virtual environment and install the dependencies using **_pip_** by running the following command from the root folder in your terminal: (please note - you will need to have *pip* installed as a Python package for this to work)
```console
$ pip install -r requirements.txt
```

You will also need to configure MongoDB locally to render the charts properly and see how your changes will affect them. The dashboard is pulling in data from the NoSQL database and it is recommended to have MongoDB 3.6.2 or later installed on your PC.

Once MongoDB is installed, go ahead and complete the following steps to import the data to the NoSQL database. 
1. Run MongoDB by running the ```mongod``` command in your terminal.
2. Once this is all up set up, leave the prompt running as it is and open another terminal.
3. ```cd``` into where the *premier_league.csv* file from the repo is kept.
4. Import the *csv* file to MongoDB by running the following command on the new open terminal:

```console
$ mongoimport -d premierLeague -c projects --type csv --file premier_league.csv --headerline
```

Now you're all set to make changes.

### Creating pull requests

Now that you've made changes to the dashboard, you can submit a pull request to the master branch to await approval. To do this:
1. Navigate to the [origianl repository](https://github.com/mineshkothari/premierleague "https://github.com/mineshkothari/premierleague")
2. Click on **New pull request** on the right of the Branch menu
3. On the compare page, click **compare across forks**
4. Confirm that the *base fork* is the repository you'd like to merge into
5. Use the *head fork* drop-down menu to select your fork, then use the compare branch drop-down menu to select the branch you made your changes in
6. Type a little description for your pull request
7. If you do not want to allow anyone with push access to the upstream repository to make changes to your PR, unselect **Allow edits from maintainers**
8. Click **Create pull request**

For further information about forking a repository, please click [here](https://help.github.com/articles/fork-a-repo/).

For further information about creating pull requests, please click [here](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

<br />
<br />

## Testing

The **TOP**SIX**DASHBOARD** has undergone rigorous testing with each new implementation to ensure every aspect of this dashboard is working robustly.

### Responsive Design

Ensuring the dashboard maintained a responsive design was of paramount importance. This proved particularly tricky when setting the ```.width``` property of each chart in JavaScript.

Using absolute width values in my *graph.js* file meant that regardless of the screen size, the width of each chart would remain the same causing unwanted side scrolling the smaller the screen size became.

This was remedied by using a bit of JavaScript magic setting the width of the chart to be the same as the width of the parent container by using:
```console
.width($(this).parent().width())
```

However, this approach did not come without its drawbacks and led to further complications. Although the charts would take up 100% of the parent container width on page load, when resizing the screen, they would maintain their inital width, thus making it non-responsive once again. 

In order to combat the new issue, the use of JavaScript's ```$(window).resize(function()``` followed by another instance of ```dc.renderAll(); ``` proved to be the smoking gun so solve chart responsiveness. See the code example below:

```console
    $(window).resize(function() {
        yearSelectorManUnited
            .width($(this).parent().width());

    dc.renderAll();
    });
```


