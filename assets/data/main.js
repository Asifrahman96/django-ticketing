d3.json(`data/eve.json`).then(function(data) {
  console.log(data);

  var svg = d3.select("#seats").call(
    d3
      .zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed)
  );

  function zoomed() {
    root.attr("transform", d3.event.transform);
  }

  var root = svg.append("g").attr("class", "root");

  var legend = root.append("g").attr("class", "legend");

  //var stage_settings = [{x: -80.000000, y: -40.000000, w: 700.500000, h: 91.000000 }];

  var stage = root.append("g").attr("class", "stage");

  var vvip = legend.append("g").attr("class", "vvip");
  var vip = legend.append("g").attr("class", "vip");
  var diamond = legend.append("g").attr("class", "diamond");
  var platinum = legend.append("g").attr("class", "platinum");
  var balcony = legend.append("g").attr("class", "balcony");
  var vvip_text = legend.append("g").attr("class", "vvip_text");
  var vip_text = legend.append("g").attr("class", "vip_text");
  var diamond_text = legend.append("g").attr("class", "diamond_text");
  var platinum_text = legend.append("g").attr("class", "platinum_text");
  var balcony_text = legend.append("g").attr("class", "balcony_text");

  vvip
    .append("circle")
    .attr("cx", 400.0)
    .attr("cy", 20.0)
    .attr("r", 8)
    .attr("fill", "#8e44ad");

  vvip_text
    .append("text")
    .text("25 KWD")
    .attr("x", 415.0)
    .attr("y", 24)
    .attr("fill", "black")
    .attr("font-size", "12px");

  vip
    .append("circle")
    .attr("cx", 480.0)
    .attr("cy", 20.0)
    .attr("r", 8)
    .attr("fill", "#2980b9");

  vip_text
    .append("text")
    .text("20 KWD")
    .attr("x", 495.0)
    .attr("y", 24)
    .attr("fill", "black")
    .attr("font-size", "12px");

  diamond
    .append("circle")
    .attr("cx", 560.0)
    .attr("cy", 20.0)
    .attr("r", 8)
    .attr("fill", "#00b894");

  diamond_text
    .append("text")
    .text("15 KWD")
    .attr("x", 575.0)
    .attr("y", 24)
    .attr("fill", "black")
    .attr("font-size", "12px");

  platinum
    .append("circle")
    .attr("cx", 635.0)
    .attr("cy", 20.0)
    .attr("r", 8)
    .attr("fill", "#f368e0");

  platinum_text
    .append("text")
    .text("12 KWD")
    .attr("x", 650.0)
    .attr("y", 24)
    .attr("fill", "black")
    .attr("font-size", "12px");

  balcony
    .append("circle")
    .attr("cx", 710.0)
    .attr("cy", 20.0)
    .attr("r", 8)
    .attr("fill", "#f1c40f");

  balcony_text
    .append("text")
    .text("10 KWD")
    .attr("x", 725.0)
    .attr("y", 24)
    .attr("fill", "black")
    .attr("font-size", "12px");

  stage
    .append("rect")
    .attr("x", 380.0)
    .attr("y", 40.0)
    .attr("width", 1000.5)
    .attr("height", 60.0)
    .attr("fill", "#2c3e50");

  stage
    .append("text")
    .text("STAGE")
    .attr("x", 350.0 + 1000.5 / 2)
    .attr("y", 40.0 + 60.0 / 2)
    .attr("dx", 0)
    .attr("dy", 10)
    .attr("fill", "rgba(255,255,255,1)")
    .attr("text-anchor", "middle")
    .attr("font-size", "30px");

  var seat = root
    .selectAll("g.dot")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "seat")
    .style("fill", "#16a085")
    .on("click", function() {
      d3.select(this).classed(
        "selected",
        d3.select(this).classed("selected") ? false : true
      );
      if (d3.select(this).classed("selected")) {
        d3.select(this)
          .style("fill", "black")
          .classed("selected", true);
      } else {
        d3.select(this)
          .style("fill", "#16a085")
          .classed("selected", false);
      }
    });

  seat
    .append("circle")
    .attr("class", "dot")
    .attr("style", "cursor: pointer")
    .attr("r", 12)
    .attr("cx", function(data) {
      return data.locX;
    })
    .attr("cy", function(data) {
      return data.locY;
    });
  // //hover effects
  // .on("mouseover", function(d, i) {
  //   d3.select(this)
  //     .transition()
  //     .duration("50")
  //     .attr("opacity", ".65");
  // })

  // .on("mouseout", function(d, i) {
  //   d3.select(this)
  //     .transition()
  //     .duration("50")
  //     .attr("opacity", "1");
  // })

  seat
    .append("text")
    .text(function(data) {
      return data.seattext;
    })
    .attr("x", function(data) {
      return data.locX;
    })
    .attr("y", function(data) {
      return data.locY;
    })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", "8px")
    .attr("style", "cursor: pointer")
    .attr("fill", "white");
});

//var selected;
//function click(d){
//if (!d3.select(this).classed("selected")) {
//    d3.select(this)
//      .style('stroke', 'black')
//    .classed("selected",true)
//}
//else {
//  d3.select(this)
//    .style('stroke', 'white')
//  .classed("selected",false);
//}

//}

// function selectDeselect(d) {
//   d3.event.stopPropagation();

//   var seat = d3.select(this);

//   if (seat.classed('selected') == false) {
//       seat.classed('selected', true);
//   } else {
//       seat.classed('selected', false);
//   }

// }

// var toggleColor = (function(){
//    var currentColor = "white";

//     return function(){
//         currentColor = currentColor == "white" ? "magenta" : "white";
//         d3.select(this).style("fill", currentColor);
//     }
// })();
