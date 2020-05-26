$(document).ready(function () {


  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення

}
  function decimalAdjust(type, value, exp) {
    // Якщо exp невизначений або дорівнює нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Якщо value не є числом, або ж степінь exp не являється цілим...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Зсув
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Зворотній зсув
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

  // Десяткове округлення
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  let array_mult = [1, 10, 100, 0.1]
  const array = [10, 100, 1000];
  const first_number = Math.round10(getRandomInt(10, 350) + Math.random(), -1*getRandomInt(3, 5));
  const second_number = array[getRandomInt(0, 3)]
  const result = Math.round10(first_number * second_number, -5);
  const text = `${first_number} × ${second_number} = ?`;

  //console.log(`${first_number}, ${second_number},  ${result}`);

  $('#text').text(text);
  let new_array = shuffle(array_mult);
  //console.log(new_array);
  $('#1_text').text(Math.round10(result * new_array[0], -5))
  $('#2_text').text(Math.round10(result * new_array[1], -5))
  $('#3_text').text(Math.round10(result * new_array[2], -5))
  $('#4_text').text(Math.round10(result * new_array[3], -5))

  $('#1').attr({value: Math.round10(result * new_array[0], -5)})
  $('#2').attr({value: Math.round10(result * new_array[1], -5)})
  $('#3').attr({value: Math.round10(result * new_array[2], -5)})
  $('#4').attr({value: Math.round10(result * new_array[3], -5)})

  $('#form').submit(function(e) {
    e.preventDefault()
    $(".radio").attr("disabled", true);
    //  $("#form").fadeIn();
    //console.log(this.choice.value);
    if (this.choice.value == result){
      $("#result").addClass('alert-success');
      $("#answer").text("Вірно");
      $("#resultSubmit").addClass('btn-outline-success');
      $("#result").css({"left": "0" })
    }
    else {
      $("#result").addClass('alert-danger');
      $("#answer").text("Невірно");
      $("#info").text("Правильна відповідь: " + result);
      $("#resultSubmit").addClass('btn-outline-danger');
      $("#result").css({"left": "0" })
    }
  })

});
