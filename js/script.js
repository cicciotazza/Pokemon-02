//add the item to the old list <li> of items
function newItem(){
    let list = $('#list');
    let li = $('<li></li>');
    let input = $('#input');
    let inputValue = $('#input').val();
    li.append(inputValue);
  
    if (inputValue === ''){
      alert ('Cannot be blank!');
    }else {
      $('#list').append(li);
      $('#input').val('');
    }
  
//using the tip in 1.9 get the cross function
  function crossOut(){
    li.toggleClass('strike');
  }
  li.on('dblclick', crossOut);
  
//Adding the delete button "X"
  let crossOutButton = $('<crossOutButton></crossOutButton>')
  crossOutButton.append(document.createTextNode('X'));
  li.append(crossOutButton);
  
  function deleteListItem(){
    li.addClass('delete');
  }//Add class delete display
  crossOutButton.on('click', deleteListItem);
  
  //Make them sortable among each others
    $('#list').sortable()
  }