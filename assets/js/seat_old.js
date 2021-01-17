d3.json(document.getElementById('apiLink').value).then(function (data) {
    console.log(data);
  
    var msgs = ["No Seats Selected Yet.", "Purchase", " tickets", "1 ticket", " for ",];
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
    //var stage_settings = [{x: -80.000000, y: -40.000000, w: 700.500000, h: 91.000000 }];
    var stage = root.append("g").attr("class", "stage");
  
    //stage 
    stage
      .append("rect")
      .attr("x", 500.0)
      .attr("y", 40.0)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", 600.0)
      .attr("height", 40.0)
      .attr("fill", "#1e272e");
  
    //stage Text
    stage
      .append("text")
      .text("STAGE")
      .attr("x", 300.0 + 1000.5 / 2)
      .attr("y", 26.0 + 60.0 / 2)
      .attr("dx", 0)
      .attr("dy", 10)
      .attr("fill", "rgba(255,255,255,1)")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px");
  
    //drawing Seats by getting data from the api 
    var seat = root
      .selectAll("g.dot")
      .data(data)
      .enter()
      .append("g")
      .attr("id", function (data) {
        return data.id;
      })
      .attr("sname", function (data) {
        return data.sname;
      })
      .attr("price", function (data) {
        return data.price;
      })
      .attr("color", function (data) {
        return data.color;
      })
  
      .attr("class", "seat")
      .style("fill", function (data) {
        if (data.is_booked === true) {
          return 'rgb(178, 190, 195)';
        } else {
          return data.color;
        }
      })
  
      //checking seat is booked or not
      //Selecting seat and unselecting seats
      .on("click", function (data) {
        var currentBgColor = document.getElementById(data.id).style.fill;  ///rgb(23, 32, 42)
        if (currentBgColor == 'rgb(178, 190, 195)') {
          console.log('clicked on booked seat');
          return;
        }
        if (data.is_booked === false) {
          d3.select(this).classed("selected", d3.select(this).classed("selected") ? false : true)
          if (d3.select(this).classed("selected")) {
            d3.select(this)
              .style('fill', '#27ae60')
              .classed("selected", true)
            updatePurchase(data);
          } else {
            d3.select(this)
              .style('fill', data.color)
              .classed("selected", false)
            removeSeat(this);
            // document.getElementById("btnPurchase").disabled = true
          }
        }
      }
      );
  
    //Seat Customization
    seat
      .append("rect")
      .attr("class", "dot")
      .attr("style", "cursor: pointer")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("height", function (data) {
        return data.radius;
      })
      .attr("width", function (data) {
        return data.radius;
      })
      .attr("x", function (data) {
        return data.x;
      })
      .attr("y", function (data) {
        return data.y;
      });
  
    //Text on top of seats
    seat
      .append("text")
      .text(function (data) {
        return data.sname;
      })
  
      .attr("x", function (data) {
        // return data.x/0.980;
        return (data.x * 1) + 12;
      })
  
      .attr("y", function (data) {
        // return data.y/0.84;
        return (data.y * 1) + 6;
      })
  
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "text-before-edge")
      .attr("font-size", "9px")
      .attr("letter-spacing", "1px")
      .attr("style", "cursor: pointer")
      .attr("fill", "white");
  
    //function to add seats to purchase form
    function updatePurchase() {
      var tickets_count = root.selectAll(".selected").size();
      // console.log(tickets_count)
      var total_price = 0;
      var seatId = "";
      var seatName = "";
      $("#tickets").html("");
      $("#alerts").html("");
      $("#totalAmount").html("");
      if (tickets_count == 0) {
        $("#alerts").append("<div class='alert alert-warning text-center alert-sm m-0'>" + msgs[0] + "</div>");
      } else {
        // var row = null;
        document.getElementById("btnPurchase").disabled = false
        root.selectAll(".selected").each(function (data) {
          var s = d3.select(this);
          var pk = s.attr('id'), c = s.attr('color'), sname = s.attr('sname'), price = s.attr('price');
          //  sn = d3.select(s.node().parentNode).attr('name'), name = +s.attr('sname'), p = s.attr('price');
          $("#tickets").append('<tr style="background:' + c + '"><td class="t2"><p> ' + sname + '</p><td class="t3"><p>' + price + ' KWD</p></td><td><i id="btn-remove" class="fas fa-times-circle"></i></td></tr>');
          total_price += +s.attr('price');
          seatId += (+s.attr('id') + ',');
          seatName += (s.attr('sname')+',');
          console.log(total_price, seatId, seatName);
        });
      }
  
      // document.getElementById('hdSeatId').value = document.getElementById('hdSeatId').value + (reviewTotal.rows[i].cells[3].innerText) + ',';
      // if (tickets_count == 1) {
      //   $("#totalAmount").html('<div class="alert alert-dark">' + msgs[1] + " " + msgs[3] + msgs[4] + total_price + 'KWD</div>');
      // } else {
      //   $("#totalAmount").html('<div class="alert alert-dark">' + msgs[1] + " " + tickets_count + msgs[2] + msgs[4] + total_price + 'KWD</div>');
      // } 
      // if (tickets_count > 0) {
      //   $("#totalAmount").html('<div class="alert alert-dark">' + msgs[1] + " " + tickets_count +  msgs[2] + msgs[4] + total_price + 'KWD</div>');
      // } else if (tickets_count = 0){
      //   $("#totalAmount").html(""); 
      // }
  
      if (tickets_count == 1) {
        $("#totalAmount").html('<div class="alert alert-dark">' + msgs[1] + " " + msgs[3] + msgs[4] + total_price + 'KWD</div>');
      } else if (tickets_count > 1) {
        $("#totalAmount").html('<div class="alert alert-dark">' + msgs[1] + " " + tickets_count + msgs[2] + msgs[4] + total_price + 'KWD</div>');
      } else{
        $("#totalAmount").html("");
        document.getElementById("btnPurchase").disabled = true
      }
      // document.getElementById('ticketTotal').value = total_price;
      // document.getElementById('seatId').value = seatId;
      // document.getElementById('seatName').value = seatName;
    }
  
    //function to remove seats from purchase form
    function removeSeat(pk) {
      root.select("[pk='" + pk + "']").classed('selected', false);
      console.log('Seat Removed');
      updatePurchase();
    }
  
    function doPurchase() {
      var tickets_count = root.selectAll(".selected").size();
      if (tickets_count == 0) {
        alert(msgs[0]);
        console.log('no seats selected')
        return false;
      }
      $("#btnPurchase").submit();
    }
  
    // $(document).ready(function () {
    //   var button = document.getElementById("purchase");
    //   button.onclick = function () {
    //     doPurchase();
    //   }
    // });
  });
  
  
  
  
  
  
  
  
  
  