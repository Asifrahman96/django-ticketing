d3.json(document.getElementById('apiLink').value).then(function (data) {
  console.log(data);

  d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
        this.parentNode.insertBefore(this, firstChild);
      }
    });
  };

  var str = navigator.userAgent;
  var i = str.indexOf("Instagram");
  if (str.indexOf("Instagram") != -1 && str.indexOf("Android") == -1) { 
    $("#purchaseform").addClass("pullup");
  }

  var msgs = ["No Seats Selected Yet..", "Purchase", " tickets", "1 ticket", " for ", "Oops! The seats you have selected are not on the same row.", "You cannot leave an empty seat that creates a gap"];
  var currency = " KWD";
  var stage_text = "STAGE";
  var stage_dir_text = "STAGE DIRECTION";

  var gap_detection_enabled = true
  var stage_settings = { x: 500, y: 80, w: 600.500000, h: 40.000000 };
  var svg = d3.select('#seats');
  var root = svg.append('g').attr('class', 'root');
  var zoom = d3.zoom();
  var nhidden = true;
  var shidden = true;
  var not_same_row = false;
  var has_gap = false;
  var gap_seat = null;
  var default_scale = null;

  var show_section_names = true;
  gap_detection_enabled = true;

  function shadeColor2(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  function invertColor(hexcolor) {
    hexcolor = hexcolor.substring(1);
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 435) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  var svg = d3.select("#seats").call(
    d3
      .zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed)
  );

  function zoomed() {
    root.attr("transform", d3.event.transform);
  }

  var stage = root.append('g').attr('class', 'stage');

  stage.append('rect')
    .attr('x', stage_settings.x)
    .attr('y', stage_settings.y)
    .attr('width', stage_settings.w)
    .attr('height', stage_settings.h)
    .attr('fill', '#222f3e')
    .attr('rx', 6);

  stage.append('text')
    .text(stage_text)
    .attr('x', stage_settings.x + (stage_settings.w) / 2)
    .attr('y', stage_settings.y + (stage_settings.h) / 2 - 4)
    .attr('dx', 0)
    .attr('dy', 10)
    .attr('fill', 'rgba(255,255,255,1)')
    .attr('text-anchor', 'middle')
    .attr('font-size', '16');

  for (var i = 0; i < data.length; i++) {
    console.log(data.length)
    var s = data[i];
    var seat = root.append('g')
      .attr('class', 's')
      .attr('id', s.id)
      .attr('spk', s.section)
      .attr('n', s.sname)
      .attr('r', s.r)
      .attr('x', s.x)
      .attr('y', s.y)
      .attr('rt', s.rt)
      .attr('p', s.price)
      .attr('c', '#161718')
      .attr('i', invertColor(s.color))

    if (s.is_booked === false) {
      seat.attr('c', s.color)
        .on('click', selectDeselect)
        .on('dblclick', selectDeselect);
    } else {
      seat.classed('na', true);
    }

    seat.append('rect')
      .attr('class', 'sr')
      .attr('width', s.radius)
      .attr('height', s.radius)
      .attr('ry', 3)
      .attr('x', s.x)
      .attr('y', s.y)
      .attr("style", "cursor: pointer")
      .attr('fill', seat.attr('c'));

    if (s.rp != "none") {
      var rowtext = root.append('text').attr('class', 'rt').text(s.rt).attr('font-size', '12px').attr('fill', '#222f3e').attr('dominant-baseline', 'text-before-edge');
      if (s.rp == "top")
        rowtext.attr('x', s.x + 8).attr('y', s.y - 10).attr('text-anchor', 'middle');
      if (s.rp == "left")
        rowtext.attr('x', s.x - 15).attr('y', s.y * 1 + 3).attr('text-anchor', 'end');
      if (s.rp == "right")
        rowtext.attr('x', s.x * 1 + 35).attr('y', s.y * 1 + 3).attr('text-anchor', 'start');
      if (s.rp == "bottom")
        rowtext.attr('x', s.x + 8).attr('y', s.y + 26).attr('text-anchor', 'middle');
    }
  }

  function selectDeselect(d) {
    d3.event.stopPropagation();
    var seat = d3.select(this);
    if (seat.classed('selected') == false) {
      seat.style('opacity', '0.30')
      seat.classed('selected', true)
      // seat.style("stroke","#d63031")
    } else {
      seat.classed('selected', false);
      seat.style('opacity', null)
      // seat.style('stroke',null)
    }
    updatePurchase();
  }

  function numbers() {
    d3.selectAll('.s').each(function () {
      var seat = d3.select(this);
      seat.append('text')
        .text(seat.attr('n'))
        .attr('class', 'n')
        .attr('x', seat.attr('x') * 1 + 12)
        .attr('y', seat.attr('y') * 1 + 3)
        .attr('dx', 0)
        .attr('dy', 2)
        .attr("font-size", "10px")
        .attr('style', 'cursor: pointer')
        .attr('fill', '#ffffff')
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "text-before-edge")
    });
  }
  numbers();

  function get_s(s) {
    return s.attr('rt') + s.attr('n');
  }

  function get_ps(s) {
    var ps = root.select("[n='" + (+s.attr('n') - 1) + "'][r='" + s.attr('r') + "'][spk='" + s.attr('spk') + "']");
    if (ps.node() != null) {
      if (Math.abs(ps.attr('x') - s.attr('x')) < 35 && Math.abs(ps.attr('y') - s.attr('y') < 35)) {
        return ps
      }
    }
    return null;
  }
  
  function get_ns(s) {
    var ps = root.select("[n='" + (+s.attr('n') + 1) + "'][r='" + s.attr('r') + "'][spk='" + s.attr('spk') + "']");
    if (ps.node() != null) {
      if (Math.abs(ps.attr('x') - s.attr('x')) < 35 && Math.abs(ps.attr('y') - s.attr('y') < 35)) {
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
        var pk = s.attr('id'), c = s.attr('c'), i = s.attr('i'), rt = s.attr('rt'), n = s.attr('n'), p = s.attr('p'), sn = d3.select(s.node().parentNode).attr('n'), n = +s.attr('n'), p = s.attr('p'), r = +s.attr('r'), spk = s.attr('spk');

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

          $("#tickets").append(
            '<tr><td class="t_s_1" style="background:' + c + ';color:' + i + '">' + rt + '</td><td class="t_s_2" style="background:' + c + ';color:' + i + '">' + n + '</td><td class="t_s_3" style="background:' + c + ';color:' + i + '">' + p + ' KWD</td></tr>');
          // $("#tickets").append(
          // '<tr style="background:' + c + '"><td class="t2"><p> ' + rt + '</p></td><td class="t2"><p> ' + n + '</p></td><td class="t3"><p>' + p + ' KWD</p></td></tr>');
          total_price += +s.attr('p');
          seatId += (+s.attr('id') + ',');
          seatName += (s.attr('rt') + s.attr('n') + ',');
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
