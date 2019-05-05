let img = new Image()
img.src= "pic.jpg"
img.onload =function(){ 

  Tesseract.recognize(img)
  .then(function(result){
    console.log('result is: ', result)
    $('#result').text(result.words.text);

    var myObj = {name: result.words[1].text, lastName: result.words[0].text, birthDate: result.words[2].text, id: result.words[3].text};
    var myJSON = JSON.stringify(myObj);
    var paitentObject= JSON.parse(myJSON);
    console.log(paitentObject);
  })
}
