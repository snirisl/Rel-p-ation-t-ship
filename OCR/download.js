let img = new Image()
img.src= "pic.jpeg"
img.onload =function(){ 

  Tesseract.recognize(img)
  .then(function(result){
    console.log('result is: ', result)
    $('#result').text(result.words.text);

    var myObj = {name: result.words[0].text, lastName: result.words[1].text, id: result.words[2].text};
    var myJSON = JSON.stringify(myObj);
    var paitentObject= JSON.parse(myJSON);
    console.log(paitentObject);
  })
}
