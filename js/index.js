$(document).ready(function () {
  d3.json('data/data.json', function(data) {
	//console.log(data)
	//console.log(data['friends'])
    var bubbleChart = new d3.svg.BubbleChart({
      supportResponsive: true,
      //container: => use @default
      size: 600,
      //viewBoxSize: => use @default
      innerRadius: 600 / 3.5,
      //outerRadius: => use @default
      radiusMin: 15,
      //radiusMax: use @default
      //intersectDelta: use @default
      //intersectInc: use @default
      //circleColor: use @default
      data: {
		items: data['friends'].slice(0, 100),
        eval: function (item) {return item.count;},
        classed: function (item) {return item.text.split(" ").join("");},
		img: function(item) {return 'img/' + item.id;}
      },
      plugins: [
		/*
        {
          name: "central-click",
          options: {
            text: "(See more detail)",
            style: {
              "font-size": "10px",
              "font-style": "italic",
              "font-family": "Source Sans Pro, sans-serif",
              //"font-weight": "700",
              "text-anchor": "middle",
              "fill": "white"
            },
            attr: {dy: "65px"},
            centralClick: function() {
              alert("Here is more details!!");
            }
          }
        },
		*/
        {
          name: "lines",
          options: {
            format: [
              {// Line #0
                textField: "count",
                classed: {count: true},
                style: {
                  "font-size": "14px",
                  "font-family": "Source Sans Pro, sans-serif",
                  "text-anchor": "middle",
                  fill: "white"
                },
                attr: {
                  dy: "0px",
                  x: function (d) {return d.cx;},
                  y: function (d) {return d.cy;}
                }
              },
              {// Line #1
                textField: "text",
                classed: {text: true},
                style: {
                  "font-size": "8px",
                  "font-family": "Source Sans Pro, sans-serif",
                  "text-anchor": "middle",
                  fill: "white"
                },
                attr: {
                  dy: "8px",
                  x: function (d) {return d.cx;},
                  y: function (d) {return d.cy;}
                }
              }
            ],
            centralFormat: [
              {// Line #0
                style: {"font-size": "23px"},
                attr: {dy: "90px"}
              },
              {// Line #1
                style: {"font-size": "18px"},
                attr: {dy: "120px"}
              }
            ]
          }
        }]
    });
  });
});
