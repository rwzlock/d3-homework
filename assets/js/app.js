// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//load data
d3.csv("../../Data/cleaneddata.csv", function(error, data) {

    // Log an error if one exists
    if (error) return console.warn(error);
  
    // Print the tvData
    console.log(data);
  
    // Cast the hours value to a number for each piece of tvData
    data.forEach(function(d) {
      d.smokes = +d.smokes;
      d.obesity = +d.obesity;
    }); 

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.smokes; }));
  y.domain([0, d3.max(data, function(d) { return d.obesity; })]);
      
  // Add the scatterplot
  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 10)
      .attr("cx", function(d) { return x(d.smokes); })
      .attr("cy", function(d) { return y(d.obesity); })
      .append("text").text(function(d){ return d.abbr; });

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  // text label for the x axis
  svg.append("text")             
      .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top +20) + ")")
      .style("text-anchor", "middle")
      .text("% who smoke");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("% who are obese"); 

});

