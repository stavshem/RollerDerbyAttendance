function generate_attendance_chart(element_to_append_to, attendance_data) {
  var width  = 900;
  var height = 900;
  var good_score_color = "#31B404";
  var bad_score_color  = "#FA5858";

  var widthScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);

  var color = d3.scale.linear()
    .domain([0, 100])
    .range([bad_score_color, good_score_color]);

  var axis = d3.svg.axis()
    .scale(widthScale);

  var canvas = d3.select(element_to_append_to)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(20, 20)");

  // display person's attendance line. line's color and width is a function of attendance value
  canvas.selectAll("rect")
    .data(attendance_data)
    .enter()
    .append("rect")
    .attr("width", 10)
    .attr("height", 40)
    .attr("fill", function(d) {return color(d.attendance)})
    .attr("y", function(d, i) { return i * 55})
    .transition()
    .duration(3000) // d3 animation for the attendance line
    .attr("width", function(d) {return widthScale(d.attendance);});

  // display person's image
  canvas.selectAll("image")
    .data(attendance_data)
    .enter()
      .append("image")
      .attr("xlink:href", function(d) {return d.img_path;})
      .attr("width", 50)
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", function (d, i) { return i * 55;});

  // display person's attendance as text
  canvas.selectAll("text")
    .data(attendance_data)
    .enter()
      .append("text")
      .attr("class", "number")
      .attr("fill", "black")
      .attr("x", 40)
      .attr("y", function(d, i) { return i * 55 })
      .text(function(d) {return d.attendance + "%"});

  canvas.append("g")
        .attr("transform", "translate(0, 810)")
        .call(axis);
};
