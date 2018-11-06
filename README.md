# [TOP*SIX*DASHBOARD](https://top-six-dashboard.herokuapp.com/) | developed by Minesh Kothari

<br />
<br />

## Overview

### What is TOP*SIX*DASHBOARD?

Essentially, the **TOP**SIX**DASHBOARD** is a data-rich dashboard allowing you to compare the statistics of six of the biggest teams in English football.

### What Does It Do?

This dashboard enables you to dive into the stats of your favourite Premier League teams and compare them with other title contenders over the years. You can now visualise the journey of your favourite teams in this data rich dashboard analysing their end of season results and comparing them with the remaining title rivals.

### How Does It Work?

**TOP**SIX**DASHBOARD** uses a collection of tools to present data in intuitive visualisations. MongoDB is used to store the data, whilst Flask, a Python microframework, is used to retrieve data from MongoDB and present this on the browser. JavaScript libraries such as D3.js, DC.js and Crossfilter.js is used to achieve beautiful data visualisation techniques.

<br />
<br />

## Features

### Features Implemented

Comparing the 'Big Six' Teams (Home page):
1. Team Selector - Filter results based on the team(s) selected
2. Year Selector - Filter results based on the period selected

Analysing Individual Teams (Team pages):
1. Position Selector - Filter results based on the position the teams finished in
2. Year Selector - Filter results of individual teams based on the period selected

### Features yet to be implemented

Reset Filter Buttons
1. Reset All button on Homepage
2. Reset All button on Man United Page
3. Reset All button on Man City Page
4. Reset All button on Chelsea Page
5. Reset All button on Arsenal Page
6. Reset All button on Spurs Page
7. Reset All button on Liverpool Page

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

This dashboard relies on many tools and technologies for it to function properly. A large proportion of these have been configured in such a way that you would not be required to make any additional changes to the files for these to work. However, there are some aspects you will need to be take into consideration when choosing to make changes to the dashboard.

**Prerequisites:**
```
Python 2.7.14
MongoDB 3.6.2
```

### Forking The Repo

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

### Making Changes

Amongst many of the tech, the **TOP**SIX**DASHBOARD** uses Python 2.7 to power the dashboard. You will need to ensure you have this version of Python installed on your PC for optimal usability. This project uses several Python packages and it is recommended having these installed on your local machine using a virtual environment for the project to function and run properly.

**virtualenv:**

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

**MongoDB:**

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

### Creating Pull Requests

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

*All tests were done on a Windows 10 64-bit PC unless otherwise stated*

### Prototyping

The initial stages of this project was to ensure the database had been established and configured correctly, ensuring Flask is able to extract the data from MongoDB. The CSV file had data which was up to date for two teams with dummy data entered for the remainder.

This file was then uploaded to MongoDB, with Flask taking care of retrieving the data and returning this back to the browser.

Once I was content the database was configured correctly, I then populated the CSV with real data, updating the collection on MongoDB in the process.

### Routing

Once the basic setup for the index page was complete, it was then a good time to configure the remainder of pages needed for the project. This included setting up page templates and routing them with Flask using ```render_template```. 

### UX/UI Testing

UX/UI tests were carried out to ensure the dashboard was functional. These test were conducted with every new implementation and every change, no matter how big or small. This proved an excellent way of identifying and thwarting any issues, reducing the time spent on bug fixes to a small fraction.

### Responsive Design

Manual testing was conducted to ensure the dashboard was as responsive as possible. This was a recurring testing approach to ensure the dashboard worked well with all screen sizes after every new implementation. 

Some of the use cases includes:
1. Ensure the navbar was behaving as I envisioned it
2. Breakpoint for each columns were set correctly for charts
3. Ensuring the charts were responsive

See the **Report > Responsive Design** section for more details.

### Cross-Browser Testing

Manual cross-browser testing was undertaken after each major implementation of the project. This included the implmentation of the navbar, inclusion of various charts, and the footer amoungst many others. 

The purpose of conducting these test was to ensure the dashboard functioned well across the most popular browsers for Windows, listing any problems to resolve before deployment.

Some of the notable issues included the use of Bootstrap's flexbox on Microsoft's Internet Explorer and Edge.

The dashboard was again tested right before the project was deployed to ensure any issues were rectified or listed before the site went live.

Further tests took place after the site was deployed.

**Desktop Browsers Tested:**
```
Google Chrome 69
Firefox 62.0.2
Microsoft Edge 42
Internet Explorer 11
```

**Mobile Browsers Tested:**
```
Samsung Internet (Samsung S8)
Chrome (Samsung S8, iPhone 6S)
Safari (iPhone 6S)
```

<br />
<br />

## Deployment

**TOP**SIX**DASHBOARD** is deployed on [Heroku](https://www.heroku.com/), a cloud platform designed enabling you to build, deliver monitor and scale apps directly on the cloud.

### Heroku

Creating an app on Heroku is relatively easy. Once it has been installed on your computer, you can create your new app from within the terminal in just a few commands.

Heroku servers use Ubuntu Server, which is one of the most popular operating systems for running web servers.

### Gunicorn

One of the many Python packages used for this project is **Gunicorn**. Gunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX. It's a pre-fork worker model. The Gunicorn server is broadly compatible with various web frameworks, simply implemented, light on server resources, and fairly speedy.

In other words, this is exactly what we need as Heroku uses Ubuntu Server.

Gunicorn was installed on the virtualenv using ```pip install gunicorn```. 

### Procfiles

The Procfile is a file that’s used by Heroku to tell it what to do with the application once it’s been deployed.



Procfile:

```web: gunicorn premierLeague:app```

Using the Windows operating system, as second Procfile was needed called **Procfile.windows**:

```web: python premierLeague.py```


### mLab

<br />
<br />

## Report

Want to learn about some of the known issues/bugs/limitations with this project? Continue reading to find out more. Perhaps, you will find a solution, or a better solution and if so - feel free to create a pull request with your changes.

### Responsive Design

**The Graphs**

Ensuring the dashboard maintained a responsive design was of paramount importance. This proved particularly tricky when setting the ```.width``` property of each chart in JavaScript.

Using absolute width values in my *graph.js* file meant that regardless of the screen size, the width of each chart would remain the same causing unwanted side scrolling the smaller the screen size became.
```javascript
.width(450)
```

This was remedied by using a bit of JavaScript magic setting the width of the chart to be the same as the width of the parent container by using:
```javascript
.width($(this).parent().width())
```

However, this approach did not come without its drawbacks and led to further complications. Although the charts would take up 100% of the parent container width on page load, when resizing the screen, they would maintain their inital width, thus making it non-responsive once again. 

In order to combat the new issue, the use of JavaScript's ```$(window).resize(function()``` followed by another instance of ```dc.renderAll(); ``` proved to be the smoking gun to solve any chart responsiveness problems. See the code example below:

```javascript
$(window).resize(function() {
    yearSelectorManUnited
        .width($(this).parent().width());

dc.renderAll();
});
```

**x Axis Ticks**

Having the ticks horizonatal along the x axis created issues on smaller devices where the text would overlap over another becoming illegible.

This required some CSS manipulation to transform and rotate the text thus solving responsive issues.

```sass
@media (max-width: 768px)
  .dc-chart
    .axis.x
      .tick text
        transform: translate(17px,13px) rotateZ(60deg)
```

### DC Charts

DC did not come without its flaws. Although DC is an excellent charting library delivering great functionality, *dc.css* includes a ```float: left;``` rule to all *divs* with the class of *dc-chart*:

```css
div.dc-chart {
    float: left;
}
```

When using floats in CSS, this will break the DOM element from its parent container causing the parent to collapse. This caused adverse effects to the charts as you could no longer interact with them. This also caused further issues with the hover effects placed on each graph. One eventual fix was to override the rule by adding custom CSS as seen below: 

```css
.dc-chart {
    float: none !important;
}
```

### Erroneous Values in Dataset

Manchester City did not participate in the Premier League during the 1999/00 (2000) and 2001/02 (2002) seasons, where they played in the lower division of English football. Representing this information on the dashboard didn't prove as straightforward. Although this did not pose a problem for many of the charts, it did however cause a great deal of concern with the **Position Chart**.

Entering '0' as **all** of the values for the effected years on the csv file when generating the data meant their position for those years would also be set at '0'. This gave a false illusion on the **Position Chart** where their *line* was even higher than those teams who not only participated in the Premier League, but those who won the competition, finished runners-up and so forth.

In order to solve this problem, a custom JavaScript function was created in an attempt to omit any values not in between '1' and '20' and return *false*, however this method proved fruitless and did not change the chart properties:

```javascript
function createPosGroup(dimension, teamName, attribute) {
    return dimension.group().reduceSum(function (d) {
        if ((d["team"]== teamName) && (d["position"] >= 1) && (d["position"] <= 20)) {
            return d[attribute];
        } else {
            return false;
        }
    });
}
```

After a lenghty period of time trying to find a solution, I eventually resorted to using the value '20' for their position during the affected years to portray their struggling start, even though they did not take part in the Premier League.

### PieChart Legends

DC comes equipped with a feature to add legends to your charts, and for the most part, this proved to be a great addition imporving the UX/UI of the data dashboard. However, this came with its own challenges.

Teams such as Manchester City and Tottenham Hotspur had 13 and 11 different position finishes in the Premier League respectively. This meant the *DC Legend* was too wide to fit horizontally and would not fit vertically within the SVG element without causing responsive issues. Attempts were made to split the legend on two lines but  seemed this seems like a limitation in DC.js. 

The legend was subsequently removed for the affected two teams.

### Snag with Crossfilter.js

There were minor rendering issues with the ```.barChart```'s when filtering selections using *Year Selector*. This only occurred when selecting years either starting from the year 2000, ending at the year 2018 or both.

The bar for the year 2000 and/or 2018 would get partially chopped out from view of the ```chart-body``` element inside the SVG.

As the bar charts were using the *Form Guide* for the range, it soon became apparent that an extra year was needed to each end of the *Form Guide*'s .xAxis to allow for extra space around the bar charts.

In order to solve this issue, the following code was added to the *Form Guide*:
```javascript
var minYearBoundary = new Date(yearDim.bottom(1)[0]["year"]-1, 0,1);
var maxYearBoundary = new Date(yearDim.top(1)[0]["year"]+1, 0,1);

formGuideManUnited
        ...
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        ...
```

Subsequently, the ```.barChart```'s were configured as shown below:
```javascript
goalsChartManUnited
    ...
    .rangeChart(formGuideManUnited)
    .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
    ...
```

### barChart xUnits

The DC documentation isn't particularly clear on how to set the widths of bar charts, making it difficult to style them to be in-keeping with the rest of the site.   

To partially solve this, CSS was used to manipulate the bar width:

```sass
.dc-chart rect.bar
  width: 19px

@media (max-width: 520px)
  .dc-chart rect.bar
    width: 8px
```

Using this approach came with its own drawbacks however: 
1. These bars were not dynamic requiring constant maintainence - meaning they would overlap on smaller screen sizes, or when more data gets added in the future
2. The bars were offset to the right and not in the centre
3. They didn't particularly work on any browser other than Google Chrome

This required urgent attention, and after a bit of [research](https://github.com/dc-js/dc.js/issues/137), the importance of the ```xUnits``` function became apparent.

```javascript
.xUnits(function(){return 19;}) // SET BAR WIDTH
.centerBar(true)
.barPadding(0.25) // SET PADDING BETWEEN BARS
```

This method ensured the bars were dynamic and fixed the cross-browser issues which came with the CSS manipulation.

### Streamline JavaScript code

In Software or Web development, it's always beneficial to write [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) code. Writing DRY code makes it effecient for a computer process the information improving load times.

During the initial testing stages for this project, it became apparent that a more streamlined function would be required in order to prevent hundreds and thousands of repeated lines of code in order to gather all the data required. 

Repeating seven lines of code for six teams and then to repeat them for each attribute would not only became unmanagable, but a very inefficient way of coding.

```javascript
var manUnitedPointsByYear = yearDim.group().reduceSum(function (d) {
    if (d["team"]=="MANCHESTER UNITED"){
        return d["points"];
    } else {
        return 0
    }
});

var manCityPointsByYear = yearDim.group().reduceSum(function (d) {
    if (d['team']=="MANCHESTER CITY"){
        return d['points'];
    } else {
        return 0;
    }
});
...

```

A masterful function was written with the help of Yoni Lavi to come up with an effecient way of grouping data based on three parameters.

```javascript
function createGroup(dimension, teamName, attribute) {
    return dimension.group().reduceSum(function (d) {
        if (d["team"]== teamName){
            return d[attribute];
        } else {
            return 0;
        }
    });
}
```

What would have been 49 lines of code per team was eventually condensed down to just 7. That's one line per attribute/group:
```javascript
// GROUPS
var manUnitedPointsByYear = createGroup(yearDim, "MANCHESTER UNITED", "points");
var manUnitedGoalsByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_for");
var manUnitedGoalsConcByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_against");
var manUnitedGoalDifference = createGroup(yearDim, "MANCHESTER UNITED", "goal_difference");
var manUnitedWins = createGroup(yearDim, "MANCHESTER UNITED", "won");
var manUnitedDrawn = createGroup(yearDim, "MANCHESTER UNITED", "drawn");
var manUnitedLosses = createGroup(yearDim, "MANCHESTER UNITED", "lost");
```

### Separate JavaScript Files For Teams

Having all the chart properties on a single *graph.js* file caused issues with rendering them on different pages. The charts would render perfectly well on the index page but failed to load on the individual team pages. It was a paramount to visualise data for individual teams on separate pages and a fix was needed to ensure graphs were being rendered on each page.

A working outcome for this was to create individual JavaScript files for each page and utilise Python's [Jinja](http://jinja.pocoo.org/docs/2.10/) templating to pull only the necessary JavaScript Files for that page.

```python
{% block page_specific_js %}
    <script src="{{ url_for ('static', filename='js/manchesterunited.js')}}"></script>
{% endblock %}
```

### .rangeChart Property

I had issues in rendering certain graphs after the two *selector* charts on any given page.

For instance, where a user would filter the teams from the *Team Selector* and a range from the *Year Selector* on the [homepage](https://top-six-dashboard.herokuapp.com/), the *Points Chart* would update based on the selection, however, the *Position Chart* would not.

A similar issue would occur on any of the team pages. Once the filters are in place, the *Form Chart* will update based on what the user has selected, however, any subsequent charts which follow would not.

With this issue, the ```.rangeChart``` property was used to target the previous chart making each chart dependent on the one before it.

Adding this property on the charts would remedy the issue and all the charts would render as they should dependent on the filter being applied. 

### Reset Feature

As with DC, Crossfilter hadn't come without its limitations either. 

If a user was to remove any filter set on the *Year Selector* by deselecting the range applied on that chart, in theory this should reset the filter applied on all other charts on that page after *Crossfilter* has done its magic.

Unfortunately, this didn't quite go according to plan and some of the charts do not reset in occurdance with the filter being deselected. Similar to the issue with the  ```.rangeChart``` above, this only affect the graphs which were dependent on the previous graph.

One way of combatting the issue would be to implement a 'Reset' button on each page. This should clear all existing filters on the page without the need to refresh the browser. 

This feature is yet to be implemented.

### Multiple Menus

The **TOP**SIX**DASHBOARD** uses an elegant menu system making it an effective way to navigate through the various different pages improving the User Experience. 

Bootstrap's *Navbar* and *Dropdown* features came handy when implementing the menu system. Well, for the mobile view at least. There wasn't any additional functionality required and to implement this using Bootstrap was a bonus as it does everything that was required. The only thing I did change was the Hamburger menu which added elegant hover and toggle animations.

For the desktop view, it would have been great to utilise the larger 'real estate' on the screen and have an "always on" dropdown menu with the links to all the different team pages. However, overriding the original Bootstrap navbar made the markup and CSS particularly messy and would not function as intended also causing issues with a perfectly working mobile navigation which was in place.

The best way to circumvent this would be to code two different menus and utilise Bootstrap's ```d-none``` class to hide desktop menu on smaller screens and ```d-md-block d-lg-block d-xl-block``` classes to show the menu on larger screens. 

The opposite was done for the mobile menu, where the DOM element was hidden on larger devices.

