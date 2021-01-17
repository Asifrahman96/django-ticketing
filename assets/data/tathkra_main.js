//d3.json("https://www.tathkra.com/froggy/api/ticketissue/42B027529236D4E9BA7F548CC86201952/139/186/5").then(function(data) {
    d3.json(document.getElementById('hdLink').value).then(function (data) {
        //  console.log(data);
           
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
        
          var legend = root.append("g").attr("class","legend");
        
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
        
          
        
            stage
                .append("rect")
                .attr("x", 380.0)
                .attr("y", 0.0)
                .attr("width", 1000.5)
                .attr("height", 40.0)
                .attr("fill", "#2c3e50");
        
            stage
                .append("text")
                .text("STAGE")
                .attr("x", 350.0 + 1000.5 / 2)
                .attr("y", -15.0 + 60.0 / 2)
                .attr("dx", 0)
                .attr("dy", 10)
                .attr("fill", "rgba(255,255,255,1)")
                .attr("text-anchor", "middle")
                .attr("font-size", "20px");
            /////////////////////////////////////////////This is seat///////////////////////////////////////////////////
            var seat = root
                .selectAll("g.dot")
                .data(data)
                .enter()
                .append("g")
                .attr("id", function (data) {
                    return data.seatkey;
                })
                .attr("class", "seat")
                .style("fill", function (data) {
                    if (data.ishdr === 'Y') {
                        return '#787a7a';
                    }
                    else {
                        if (data.stat === 'B') {
                            return '#17202A';
                        } else if (data.stat === 'R') {
                            return '#17202A';
                        } else if (data.stat === 'N') {
                            return data.chairclr;
                        } else {
                            return '#17202A';
                        }
                    }
                })
                .on("click", function (data) {
                    var currentBgColor = document.getElementById(data.seatkey).style.fill;  ///rgb(23, 32, 42)
                    if (currentBgColor == 'rgb(23, 32, 42)') {
                        console.log('clicked on booked seat');
                        return;
                    }
                    // sValidation(data);
                    document.getElementById("btnPurchase").disabled = false;

                    if (data.stat === 'N' && data.ishdr === 'N') {
                        if (seatTwoValidation(data)) {
                            if (validatehdr(data) && validateSeatNo(data)) {
                                d3.select(this).classed("selected", d3.select(this).classed("selected") ? false : true)
                                if (d3.select(this).classed("selected")) {
                                    d3.select(this)
                                        .style('fill', '#27ae60')
                                        .classed("selected", true)
                                    chooseSeat(data);
                                } else {
                                    d3.select(this)
                                        .style('fill', data.chairclr)
                                        .classed("selected", false)
                                    removeBtn(this);
                                    if (lsSeatKey == data.seatkey) {
                                        document.getElementById("btnPurchase").disabled = true
                                    }
                                }
                            }
                        }
                    }
                });
          ///////////////////////////////////this is circle//////////////////////////////////////////////////////
          seat
            .append("circle")
            .attr("class", "dot")
            .attr("style", "cursor: pointer")
            .attr("r", 9)     
            .attr("cx", function(data) {
              return data.locX;
            })
            .attr("cy", function(data) {
              return data.locY;
            })
        
    
            //hover effects
            .on("mouseover", function(d, i) {
              d3.select(this)
                .transition()
                .duration("50")
                .attr("opacity", ".65");
            })
        
            .on("mouseout", function(d, i) {
              d3.select(this)
                .transition()
                .duration("50")
                .attr("opacity", "1");
            });
          //////////////////////////////this is text////////////////////////////////////////////////////
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
              .attr("id", function (data) {
                  return data.seatkey;
              })
            
             
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("font-size", "8px")
            .attr("style", "cursor: pointer")
            .attr("fill", "white");
            
        });
        
        
        
        var lsSeatKey = "";
        var ls_leftKey = "";
        
        function chooseSeat(data) {
            var table = document.getElementById("seatList");
            var row = table.insertRow(0);
           // var cell1 = row.insertCell(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
        
            var cell5 = row.insertCell(4);
            
            //var button = document.createElement('input');
            //button.setAttribute('type', 'button');
            //button.setAttribute('value', 'X');
            //button.setAttribute('class', 'btn btn-danger btn-sm');  
            //button.setAttribute('onclick', 'removeBtn(this)');
            //cell1.appendChild(button); 
        
            var span = document.createElement('span');
            span.setAttribute('class', 'badge');
            span.innerHTML = data.classname;
            cell1.appendChild(span);
        
            var span1 = document.createElement('span');
            span1.setAttribute('class', 'badge');
            span1.innerHTML = data.seattext + '-' + data.hdrname;
            cell2.appendChild(span1);
        
            var h5 = document.createElement('h5');
            h5.setAttribute('class', 'price');
            h5.innerHTML = data.seatprice;
            cell3.appendChild(h5);
        
        
            var seatId = document.createElement('h5');
            seatId.setAttribute('class', 'price');
            seatId.innerHTML =  data.seatname;
            cell4.appendChild(seatId);
            cell4.style.display = 'none';
        
            var seatNo = document.createElement('h5');
            seatNo.setAttribute('class', 'price');
            seatNo.innerHTML = data.seattext;
            cell5.appendChild(seatNo);
            cell5.style.display = 'none';
            calculateValue();
            
        
        }
        function removeBtn(obj) {   
            var empTab = document.getElementById('seatList');
            empTab.deleteRow(obj.parentNode.parentNode.rowIndex);
            calculateValue();
        }
        function calculateValue() {
            document.getElementById('hdSeatId').value = '';
            document.getElementById('hdSeatno').value = '';
            var sum = 0;
            var tottkt = 0;
            var reviewTotal = document.getElementById('seatList');
            for (var i = 0; i < reviewTotal.rows.length; i++) {
                if (reviewTotal.rows[i].cells.length > 1) {
                    wlpTotal = (reviewTotal.rows[i].cells[2].innerText);
                    sum = parseFloat(sum) + parseFloat(wlpTotal);
                    tottkt = parseFloat(tottkt) + 1;
                    // alert(wlpTotal);
                    document.getElementById('hdSeatId').value = document.getElementById('hdSeatId').value + (reviewTotal.rows[i].cells[3].innerText) + ',';
                    document.getElementById('hdSeatno').value = document.getElementById('hdSeatno').value + (reviewTotal.rows[i].cells[1].innerText) + ',';
                }
            }
            document.getElementById('btnPurchase').value = 'Total Purchase Of   ' + tottkt + ' Tickets in ' + sum;
            document.getElementById('hdNotkt').value = sum;
               
            i = reviewTotal.rows.length;
            if (i === 0) {
                firstClickHdr = '';
                exSeatno = 0;
                document.getElementById('emptyrow').style.display = 'block';
                document.getElementById('btnPurchase').value = 'Purchase';
               // document.getElementById("btnPurchase").disabled = true;
              
            } else if (i > 0) {
                document.getElementById('emptyrow').style.display = 'none';
              //  document.getElementById("btnPurchase").disabled = false;
            }
        }
        var firstClickHdr = '';
        function validatehdr(data) {
            return true;
        }
        var exSeatno = 0;
        var currentSeatno = 0;
        function validateSeatNo(data) {
            if (exSeatno === 0) {
                exSeatno = data.seattext;
                return true;
            } else {
                currentSeatno = data.seattext;
                
                var diival = differnce(currentSeatno, exSeatno);
                return true;
               
            }
        }
        function differnce(num1, num2) {
            return Math.abs(num1 - num2);
        }
        
        function  successalert(val) {
            //var SesVar = '<%= Session("TOKENID").ToString() %>';
            swal({
                title: 'Tathkra',
                text: val,
                type: 'error',
                icon: "error"
            });
        }

        function seatTwoValidation(data) {    
            if (data.seattext === '2') {
                if (checkTableval()) {
                    return true;
                } else {
                    successalert('Please choose seat no 1');
                    return false;
                }
            } else {
                return true;
            }
        }

        function checkTableval() { 
            var reviewTotal = document.getElementById('seatList');
            console.log('test');
            for (var i = 0; i < reviewTotal.rows.length; i++) {
                if (reviewTotal.rows[i].cells.length > 1) {          
                    wlpTotal = (reviewTotal.rows[i].cells[4].innerText);   
                    if (wlpTotal === '1') {
                        console.log(wlpTotal);
                        return true;
                    }   
                    return true;
                }
            }
            return false;
        }

        var isFirstActionDisabled;
        function sValidation(data) {

            console.log(data.validationon);

            if (data.validationon === 'R') {
                console.log('Right Validation Start 0');
                lsSeatKey = data.seatkey - 1;
                var bgColor = document.getElementById(data.seatkey - 1).style.fill;
                if (bgColor === 'rgb(39, 174, 96)') {   ////check green color seat before the clicked seat
                    //var bgColor1 = document.getElementById(data.seatkey - 1).style.fill;
                    document.getElementById("btnPurchase").disabled = false;
                    console.log('B is Green');
                    return;          
                } else {
                    var currentSeatBgColor = document.getElementById(data.seatkey).style.fill;
                    if (currentSeatBgColor === 'rgb(39, 174, 96)') {
                        console.log('current seat not green 1');
                        document.getElementById("btnPurchase").disabled = false;
                        return;   
                    } else {
                        console.log('current seat not green 2');
                        document.getElementById("btnPurchase").disabled = true;
                        return;   
                    }                                
                }
                // successalert(li_val);             
            } else if (data.validationon === 'L') {
                console.log('Left Validation Start');
                ls_leftKey = parseInt(data.seatkey) + parseInt(1);
                console.log(ls_leftKey);
                var left_bgColor = document.getElementById(ls_leftKey).style.fill;
                if (left_bgColor === 'rgb(39, 174, 96)') {   ////check green color seat before the clicked seat
                    //var bgColor1 = document.getElementById(data.seatkey - 1).style.fill;
                    document.getElementById("btnPurchase").disabled = false;
                    console.log('B is Green');
                    return;
                } else {
                    var currentLeftSeatBgColor = document.getElementById(data.seatkey).style.fill;
                    if (currentLeftSeatBgColor === 'rgb(39, 174, 96)') {
                        console.log('current seat not green');
                        document.getElementById("btnPurchase").disabled = false;
                        return;
                    } else {
                        console.log('current seat not green');
                        isFirstActionDisabled = true;
                        document.getElementById("btnPurchase").disabled = true;
                        return;
                    }
                }           
            } else {
                //console.log('No Validation');
        
                //if (isFirstActionDisabled === true) {
                //    document.getElementById("btnPurchase").disabled = true;
                //} else {
                //    document.getElementById("btnPurchase").disabled = false;
                //}
               
                //return;
            }  
        
            //console.log('Left' + ls_leftKey + ':' + data.seatkey);
            console.log(ls_leftKey);
            console.log(data.seatkey);
           
            if (ls_leftKey == data.seatkey) {
                console.log(ls_leftKey);
                var lastleftSeatBgColor = document.getElementById(ls_leftKey).style.fill;
                console.log(lastleftSeatBgColor);
        
                if (document.getElementById("btnPurchase").disabled === true) {
                    console.log('enabled');
                    document.getElementById("btnPurchase").disabled = false;
                } else {
                    console.log('disbaled');
                    document.getElementById("btnPurchase").disabled = true;
                }      
            }
        
            console.log('Right' + lsSeatKey + ':' + data.seatkey);
            if (lsSeatKey == data.seatkey) {
                //var lastSeatBgColor = document.getElementById(lsSeatKey).style.fill;
                //if (lastSeatBgColor === 'rgb(39, 174, 96)') {
                //    console.log('3');
                //    document.getElementById("btnPurchase").disabled = false;
                //    return;
                //} 
        
                if (document.getElementById("btnPurchase").disabled === true) {
                    console.log('enabled');
                    document.getElementById("btnPurchase").disabled = false;
                } else {
                    console.log('disbaled');
                    document.getElementById("btnPurchase").disabled = true;
                }      
                //console.log('3');
                //document.getElementById("btnPurchase").disabled = false;
                //return;
            }
            /****
        * seat validation End
        * **/
        }