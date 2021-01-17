d3.json(document.getElementById('apiLink').value).then(function (data) {
    console.log(data);
  
    var msgs = ["No Seats Selected Yet.", "Purchase", " tickets", "1 ticket", " for ", "Seats you are trying to book are not in the same row !", "You cannot leave an empty seat that creates a gap"];
    var svg = d3.select("#seats").call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", zoomed)
    );
  
    function zoomed() {
      root.attr("transform", d3.event.transform);
    }
  
    var gap_detection_enabled = true
    var root = svg.append("g").attr("class", "root");
    var stage = root.append("g").attr("class", "stage");
    //var stage_settings = [{x: -80.000000, y: -40.000000, w: 700.500000, h: 91.000000 }];
    var stage = root.append("g").attr("class", "stage");
    var not_same_row = false;
    var has_gap = false;
    var gap_seat = null;
    gap_detection_enabled = true;
  
    //stage 
    stage
      .append("rect")
      .attr("x", 500.0)
      .attr("y", 80.0)
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
      .attr("y", 65.0 + 60.0 / 2)
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
      .attr("r", function (data) {
        return data.r;
      })
      .attr("rp", function (data) {
        return data.rp;
      })
      .attr("rt", function (data) {
        return data.rt;
      })
      .attr("section", function (data) {
        return data.section;
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
              .classed("na",true)
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
      // .attr("r", 9)
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
        return (data.rt + data.sname);
      })
  
      .attr("x", function (data) {
        // return data.x/0.980;
        return (data.x * 1) + 12;
        // return data.x;
      })
  
      .attr("y", function (data) {
        // return data.y/0.84;
        return (data.y * 1) + 7;
        // return data.y;
      })
  
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "text-before-edge")
      // .attr("dominant-baseline", "central")
      .attr("font-size", "8px")
      .attr("letter-spacing", "1px")
      .attr("style", "cursor: pointer")
      .attr("fill", "white");
  
    // if (data.rp != "none") {
    //   var rowtext = root.append('text').attr('class', 'rt').text(data.rt).attr('font-size', '10px').attr('fill', 'rgba(255,255,255,0.5)').attr('dominant-baseline', 'central').style("visibility", "hidden");
    //   if (data.rp == "top")
    //     rowtext.attr('x', data.x + 8).attr('y', data.y - 10).attr('text-anchor', 'middle');
    //   if (data.rp == "left")
    //     rowtext.attr('x', data.x - 8).attr('y', data.y + 8).attr('text-anchor', 'end');
    //   if (data.rp == "right")
    //     rowtext.attr('x', data.x + 24).attr('y', data.y + 8).attr('text-anchor', 'start');
    //   if (data.rp == "bottom")
    //     rowtext.attr('x', data.x + 8).attr('y', data.y + 26).attr('text-anchor', 'middle');
    // }
  
    function get_s(s) {
      return s.attr('rt') + s.attr('sname');
    }
  
    function get_ps(s) {
      var ps = root.select("[sname='"+ (+s.attr('sname')-1) +"'][r ='"+ s.attr('r') + "'][section='"+s.attr('section')+"']");
      if (ps.node() != null) {
        if (Math.abs(ps.attr('x')-s.attr('x')) < 35 && Math.abs(ps.attr('y')-s.attr('y') < 35 )) {
          return ps
        } 
      }
      return null;
    }
  
    function get_ns(s) {
      var ps = root.select("[sname ='"+ (+s.attr('sname')+1)+"'][r ='"+ s.attr('r') + "'][section='"+s.attr('section')+"']");
      if (ps.node() != null) {
        if (Math.abs(ps.attr('x')-s.attr('x')) < 35 && Math.abs(ps.attr('y')-s.attr('y') < 35 )) {
          return ps
        }
      }
      return null;
    }
  
    //function to add seats to purchase form
    function updatePurchase() {
      var tickets_count = root.selectAll(".selected").size();
  
      var total_price = 0;
      var seatId = "";
      var seatName = "";
  
      not_same_row = false;
      has_gap = false;
  
      $("#tickets").html("");
      $("#alerts").html("");
  
      if (tickets_count == 0) {
        $("#alerts").append("<div class='alert alert-blue text-center alert-sm small m-0'>" + msgs[0] + "</div>");
      } else {
        var row = null;
        document.getElementById("btnPurchase").disabled = false
        root.selectAll(".selected").each(function () {
          var s = d3.select(this);
          var pk = s.attr('id'), c = s.attr('color'), sname = s.attr('sname'), price = s.attr('price'), rt = s.attr('rt'), sn = d3.select(s.node().parentNode).attr('name'), name = +s.attr('sname'), p = s.attr('price'), r = +s.attr('r'), section=s.attr('section');
  
          if (row != null && row != r) {
            not_same_row = true;
          }
  
          row = r;
  
          var ps = get_ps(s);
          var ns = get_ns(s);
  
          if (ps != null && !ps.classed("selected") && !ps.classed("na")) {
            var pps = get_ps(ps); 
            if (pps == null || pps.classed("selected") || pps.classed("na")) {
              has_gap = true;
              gap_seat = ps;
            }
          }
  
          if (ns != null && !ns.classed("selected") && !ns.classed("na")) {
            var nns = get_ns(ns);
            if (nns == null || nns.classed("selected") || nns.classed("na")) {
              has_gap = true;
              gap_seat = ns;
            }
          }
          
          $("#tickets").append('<tr style="background:' + c + '"><td class="t2"><p> ' + rt + '</p></td><td class="t2"><p> ' + sname + '</p></td><td class="t3"><p>' + price + ' KWD</p></td></tr>');
          total_price += +s.attr('price');
          seatId += (+s.attr('id') + ',');
          seatName += (s.attr('sname') + ',');
          // console.log(total_price, seatId, seatName);
        })
      }
  
      if (not_same_row) {
        $("#alerts").append("<div class='alert alert-danger text-center mt-1 alert-sm small m-0'>" + msgs[5] + "</div>");
        document.getElementById("btnPurchase").disabled = true
      }
  
      if (has_gap && gap_detection_enabled) {
        $("#alerts").append("<div class='alert alert-danger text-center mt-1 alert-sm small m-0'>" + msgs[6] + " : " + get_s(gap_seat) + "</div>");
        document.getElementById("btnPurchase").disabled = true
      }
  
      if (tickets_count == 1) {
        $("#totalAmount").html('<div class="alert alert-green">' + msgs[1] + " " + msgs[3] + msgs[4] + total_price + 'KWD</div>');
      } else if (tickets_count > 1) {
        $("#totalAmount").html('<div class="alert alert-green">' + msgs[1] + " " + tickets_count + msgs[2] + msgs[4] + total_price + 'KWD</div>');
      } else {
        $("#totalAmount").html("");
        document.getElementById("btnPurchase").disabled = true
      }
      
      document.getElementById('ticketTotal').value = total_price;
      document.getElementById('seatId').value = seatId;
      document.getElementById('seatName').value = seatName;
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
  
      if (has_gap && gap_detection_enabled) {
        alert(msg[6]);
        return false;
      }
  
      if (not_same_row) {
        if (confirm(msg[5])) {
          $("#btnPurchase").submit();
        }
        return false;
      }
    }
  });
  