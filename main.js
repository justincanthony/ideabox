//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.getElementById('showFavoritesButton');
var displayAllIdeasButton = document.getElementById('showAllButton');
var addCommentButton = document.querySelector('.comment-button');
var deleteIdeaButton = document.querySelector('.img-button')
var ideaTitle = document.querySelector('.form-title');
var ideaBody = document.querySelector('.form-body');
var searchText = document.querySelector('.search-field');
var renderedIdeas = document.querySelector('.ideabox');

var savedIdeas = [];
var favoritedIdeas = [];
//👇 eventListeners👇
saveButton.addEventListener('click', instantiateIdeaClass);

displayStarredButton.addEventListener('click', showFavorites);

displayAllIdeasButton.addEventListener('click', showAll);

renderedIdeas.addEventListener('click', function(e) {
  console.log(e.target.className);
  if(e.target.className === 'delete') {
    deleteIdeaCard(e);
  };

  if(e.target.className.includes('empty-star')) {
    favoriteIdea(e);
  }

  if(e.target.className.includes('filled-star')) {
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
    savedIdeas.push(newIdeaObject);
    renderIdeaCard(newIdeaObject);
    newIdeaObject.saveToStorage();
    // changeButton();
    // clearFields();
  }
};

function renderIdeaCard(newIdeaObject) {
  console.log(newIdeaObject);
  //need to make img classes dynmaic based on newIdeaObject.star (t/f)
  renderedIdeas.innerHTML += `<article class="idea-card" id="${newIdeaObject.id}">
    <div class="idea-card-header">
      <button class="unsaved-star">
        <img class="empty-star ${newIdeaObject.star ? "hidden" : ""}" src="./assets/icons/star.svg" alt="empty star"/>
        <img class= "filled-star ${newIdeaObject.star ? "" : "hidden"}" src="./assets/icons/star-active.svg" alt="star"/>
      </button>
      <button class="img-button">
        <img class="delete" src="./assets/icons/delete.svg"/>
      </button>
    </div>
    <div class="idea-card-body">
      <h3>${newIdeaObject.title}</h3>
      <p>${newIdeaObject.body}<p>
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
  console.log(emptyStarImage, articleIdea, favoritedStarImage)
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

function showFavorites() {
  renderedIdeas.innerHTML = "";
  for (var i = 0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star === true) {
      favoritedIdeas.push(savedIdeas[i]);
      renderIdeaCard(savedIdeas[i]);
      displayStarredButton.classList.add("hidden");
      displayAllIdeasButton.classList.remove("hidden");
      // notFavorited.classList.add('hidden');
      // displayStarredButton.innerText = "Show All Ideas";
    }
  }
}

function showAll() {
  console.log(savedIdeas);
  renderIdeaCard(savedIdeas)
  displayAllIdeasButton.classList.add("hidden");
  displayStarredButton.classList.remove("hidden");
}

// Pseudocode Iteration 4:
//
// Goal: On show starred button click, show all of the favorited cards (this.star=true;)
// Input: Button, savedIdeas
// Output: Show only favorited cards in display section
// Steps:
// On button click,
  // Need to query select button (.show-starred-btn)
  // Need event listener for button (click)
// Access savedIdeas; Iterate through
  // For loop
// Look for this.star=true
  // If statement (conditional)
// If true, display those, hide non-favorited
  // add/remove classes?
  // Just add .hidden!
// Toggling remove hidden
// Button text changes (show all ideas)
  // 2 buttons or One and just change innerText?


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
