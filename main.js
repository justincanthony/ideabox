//👇 querySelectors👇
var saveButton = document.querySelector('#saveBtn');
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
window.addEventListener('load', getFromStorage);

saveButton.addEventListener('click', instantiateIdeaClass);

ideaTitle.addEventListener('keydown', changeSaveButton);

ideaBody.addEventListener('keydown', changeSaveButton);

displayStarredButton.addEventListener('click', showFavorites);

displayAllIdeasButton.addEventListener('click', showAll);

renderedIdeas.addEventListener('click', function(e) {
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
function changeSaveButton() {
  if (ideaBody.value !== "" && ideaTitle.value !== "") {
    saveButton.classList.remove('disabled-save-btn');
    saveButton.classList.add('save-btn');
  }
  if (ideaBody.value === "" || ideaTitle.value === "") {
    saveButton.classList.remove('save-btn');
    saveButton.classList.add('disabled-save-btn');
  }
};

function instantiateIdeaClass(event) {
  event.preventDefault();
  if (ideaBody.value !== "" && ideaTitle.value !== "") {
    var newIdeaObject = new Idea(ideaTitle.value, ideaBody.value);
    savedIdeas.push(newIdeaObject)
    newIdeaObject.saveToStorage();
    renderIdeaCard(newIdeaObject);
    clearFields();
  }
};

function getFromStorage() {
  var itemsRetrieved = Object.keys(localStorage);
  for (var i=0; i < itemsRetrieved.length; i++) {
    var retrievedItem = JSON.parse(localStorage.getItem(itemsRetrieved[i]))

    var favoritedIdeaObject = new Idea(retrievedItem.title, retrievedItem.body, retrievedItem.id, retrievedItem.star);
    savedIdeas.push(favoritedIdeaObject)
    renderIdeaCard(favoritedIdeaObject)
  }
};

function renderIdeaCard(idea) {
  renderedIdeas.innerHTML +=
    `<article class="idea-card" id="${idea.id}">
      <div class="idea-card-header">
        <button class="unsaved-star">
          <img class="empty-star ${idea.star ? "hidden" : ""}" src="./assets/icons/star.svg" alt="empty star"/>
          <img class= "filled-star ${idea.star ? "" : "hidden"}" src="./assets/icons/star-active.svg" alt="star"/>
        </button>
        <button class="img-button">
          <img class="delete" src="./assets/icons/delete.svg"/>
        </button>
      </div>
      <div class="idea-card-body">
        <h3>${idea.title}</h3>
        <p>${idea.body}<p>
      </div>
      <div class="idea-card-footer">
        <button class ="comment-button">
          <img class="comment-image" src="./assets/icons/comment.svg" alt="comment image"/>
        </button>
        <label>Comment</label>
      </div>
    </article>`
};

function deleteIdeaCard(e) {
  e.preventDefault();
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
    var idea = savedIdeas[i];
   if (Number(articleIdea.id) === idea.id) {
     favoritedIdeas.push(idea);
     idea.star = true;
     favoritedStarImage.classList.remove('hidden')
     emptyStarImage.classList.add('hidden');
     idea.updateIdea();
    }
  }
};

function removeFavorite(e) {
  var emptyStarImage = e.target.previousElementSibling;
  var articleIdea = e.target.parentElement.parentNode.parentNode;
  var favoritedStarImage = e.target;

  for (var i = 0; i < savedIdeas.length; i++) {
    var idea = savedIdeas[i];
    if (Number(articleIdea.id) === idea.id && idea.star === true) {
      idea.star = false;
      favoritedIdeas.splice(i, 1);
      favoritedStarImage.classList.add('hidden');
      emptyStarImage.classList.remove('hidden');
      idea.updateIdea();
    }
  }
};

function showFavorites() {
  renderedIdeas.innerHTML = "";
  for (var i = 0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star === true) {
      renderIdeaCard(savedIdeas[i]);
      displayStarredButton.classList.add("hidden");
      displayAllIdeasButton.classList.remove("hidden");
      displayStarredButton.innerText = "Show All Ideas";
    }
  }
}

function showAll() {
  renderedIdeas.innerHTML = "";
  for (var i = 0; i < savedIdeas.length; i++) {
    renderIdeaCard(savedIdeas[i]);
  }
  displayAllIdeasButton.classList.add("hidden");
  displayStarredButton.classList.remove("hidden");
}

function clearFields() {
  ideaTitle.value = "";
  ideaBody.value = "";
};
