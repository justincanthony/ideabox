//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.querySelector('.show-starred-button');
var addCommentButton = document.querySelector('.comment-button');
// var deleteIdeaButton = document.querySelector('.')
var ideaTitle = document.querySelector('.form-title'); // title text input
var ideaBody = document.querySelector('.form-body'); // body text input
var searchText = document.querySelector('.search-field');
var renderedIdeas = document.querySelector('.ideabox');
var savedIdeas = [];
console.log(renderedIdeas);

//👇 eventListeners👇
//
saveButton.addEventListener('click', invokeIdeaClass);
// displayStarredButton.addEventListener('click', showStarred)
// addCommentButton.addEventListener('click', appendComment)


//👇 eventHandlers👇
//Save card + make new instance of Idea
function invokeIdeaClass(event) {
  event.preventDefault();
  if (ideaBody.value === "" || ideaTitle.value === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
    var newIdeaObject = new Idea(ideaTitle.value, ideaBody.value);
    savedIdeas.push(newIdeaObject);
    renderIdeaCard();
    clearFields();
  }
};

function clearFields() {
  ideaTitle.value = "";
  ideaBody.value = "";
}

// disableButton() {
//saveButton.disabled = true;


// function showStarred() {
// }
// render to
function renderIdeaCard() {
  for (var i = 0; i < savedIdeas.length; i++)
  renderedIdeas.innerHTML += `<article class="idea-card">
    <div class="idea-card-header">
      <button class="unsaved-star">
        <img class="star hidden" src="./assets/icons/star.svg" alt="empty star"/>
        <img class= "star" src="./assets/icons/star-active.svg" alt="star"/>
      </button>
      <button class="img-button">
        <img class="delete" src="./assets/icons/delete.svg"/>
      </button>
    </div>
    <div class="idea-card-body">
      <h3>${savedIdeas[i].title}</h3>
      <p>${savedIdeas[i].body}<p>
    </div>
    <div class="idea-card-footer">
      <button class ="comment-button">
        <img class="comment-image" src="./assets/icons/comment.svg" alt="comment image"/>
      </button>
      <label>Comment</label>
    </div>
  </article>`
}
