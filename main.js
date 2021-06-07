//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.querySelector('.show-starred-button');
var addCommentButton = document.querySelector('.comment-button');
var deleteIdeaButton = document.querySelector('.img-button')
var ideaTitle = document.querySelector('.form-title');
var ideaBody = document.querySelector('.form-body');
var searchText = document.querySelector('.search-field');
var renderedIdeas = document.querySelector('.ideabox');

var savedIdeas = [];
console.log(savedIdeas);
//👇 eventListeners👇
saveButton.addEventListener('click', instantiateIdeaClass);

renderedIdeas.addEventListener('click', function(e) {
  if(e.target.className === 'delete') {
    deleteIdeaCard(e);
  };

  if(e.target.className === 'empty-star') {
    favoriteIdea(e);
  }

  if(e.target.className === 'star') {
    removeFavorite(e);
}
});


//👇 eventHandlers👇
//Save card + make new instance of Idea
function instantiateIdeaClass(event) {
  event.preventDefault();
  if (ideaBody.value === "" || ideaTitle.value === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
    var newIdeaObject = new Idea(ideaTitle.value, ideaBody.value);
    console.log(newIdeaObject);
    savedIdeas.push(newIdeaObject);
    renderIdeaCard(newIdeaObject);
    newIdeaObject.saveToStorage();
    // changeButton();
    // clearFields();
  }
};

function renderIdeaCard(newIdeaObject) {
  var objectId = newIdeaObject.id;
  renderedIdeas.innerHTML += `<article class="idea-card" id="${objectId}">
    <div class="idea-card-header">
      <button class="unsaved-star">
        <img class="empty-star" src="./assets/icons/star.svg" alt="empty star"/>
        <img class= "star hidden" src="./assets/icons/star-active.svg" alt="star"/>
      </button>
      <button class="img-button">
        <img class="delete" src="./assets/icons/delete.svg"/>
      </button>
    </div>
    <div class="idea-card-body">
      <h3>${ideaTitle.value}</h3>
      <p>${ideaBody.value}<p>
    </div>
    <div class="idea-card-footer">
      <button class ="comment-button">
        <img class="comment-image" src="./assets/icons/comment.svg" alt="comment image"/>
      </button>
      <label>Comment</label>
    </div>
  </article>`
}

function deleteIdeaCard(e) {
  var parent = e.target.parentElement.parentNode.parentNode;
    for (i = 0; i < savedIdeas.length; i++) {
      if (Number(parent.id) === savedIdeas[i].id) {
        savedIdeas[i].deleteFromStorage(savedIdeas[i].id);
        parent.remove();
        savedIdeas.splice(i, 1);

      }
    }
};

function favoriteIdea(e) {
  var emptyStarImage = e.target;
  var articleIdea = e.target.parentElement.parentNode.parentNode;
  var favoritedStarImage = e.target.nextElementSibling;

  for (var i = 0; i < savedIdeas.length; i++) {
   if (Number(articleIdea.id) === savedIdeas[i].id) {
     savedIdeas[i].star = true;
     favoritedStarImage.classList.remove('hidden');
     emptyStarImage.classList.add('hidden');
     savedIdeas[i].updateIdea(savedIdeas[i].id);
    }
  }
};

function removeFavorite(e) {
  var emptyStarImage = e.target.previousElementSibling;
  var articleIdea = e.target.parentElement.parentNode.parentNode;
  var favoritedStarImage = e.target;

  for (var i = 0; i < savedIdeas.length; i++) {
    if (Number(articleIdea.id) === savedIdeas[i].id && savedIdeas[i].star === true) {
      savedIdeas[i].star = false;
      favoritedStarImage.classList.add('hidden');
      emptyStarImage.classList.remove('hidden');
    }
  }
};

// function saveToStorage(newIdeaObject) {
//   var storageId = articleIdea.id;
//   console.log(storageId);
//   var stringifiedIdea = JSON.stringify(newIdeaObject);
//   localStorage.setItem(storageId, stringifiedIdea)
// };


// 👇 Unfinished Functions👇
// disableButton() {
//saveButton.disabled = true;
//}
//
// function showStarred() {
// }
//
// function changeButton() {
//   saveButton.classList.remove('disable-button')
//   saveButton.classList.add('save-btn');
// }
//
// function clearFields() {
//   ideaTitle.value = "";
//   ideaBody.value = "";
// }
