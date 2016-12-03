var recent = [];
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
var Complex = algebra.Complex;
$(function() {
  "use strict";

  $(document).bind("keypress", function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $("#calc").trigger("click");
    }
  });
});

var parse = function(raw) {
  var parts = raw.match(/([0-9\.]+)([+\-\*\/\^])([0-9\.]+)/);
  return calc(parts[1], parts[2], parts[3]);
};

var calc = function(num1, op, num2) {
  num1 = new BigNumber(num1);
  num2 = new BigNumber(num2);

  if (op == "+") {
    return num1.plus(num2);
  } else if (op == "-") {
    return num1.minus(num2);
  } else if (op == "*") {
    return num1.times(num2);
  } else if (op == "/") {
    return num1.dividedBy(num2);
  } else if (op == "^") {
    return num1.toPower(num2);
  }
};

var calculate = function() {
  var raw = $("#equation").text().replace(/([a-z])([a-z])/g, '$1 * $2');
  var solveFor = $("#solve").val();

  if (solveFor) {
    var ans = recent.slice(-1)[0].solveFor(solveFor).toTex();
    katex.render(solveFor + "=" + ans, result);
    $("#solve").toggle();
    return;
  }

  if (raw.includes("=")) {

    vars = jQuery.unique(raw.replace(/[^a-zA-Z]/g, '').split(""));

    $.each(vars, function(key, value) {
      $('#solve')
        .append($('<option>', {
            value: value
          })
          .text(value));
    });

    $('#solve').toggle();
  }

  var expr = algebra.parse($("#equation").text());

  recent.push(expr);
  katex.render(algebra.toTex(expr), result);
  //katex.render(parse(raw).toString(), result)
  $("#equation").text("");
};

var add = function(text) {
  $("#equation").text(function(index, val) {
    return val + text;
  });
};

var backspace = function() {
  $("#equation").text(function(index, val) {
    return val.slice(0, -1);
  });
};

var clearText = function() {
  $("#equation").text("");
  $("#result").text("");
  $("#solve").hide();
};

var copyResult = function() {
  $("#equation").text(recent.slice(-1).toString());
  $("#result").text("");
};
