//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.querySelector('.show-starred-button');
var addCommentButton = document.querySelector('.comment-button')
// var deleteIdeaButton = document.querySelector('.')
var ideaTitle = document.querySelector('.form-title');
var ideaBody = document.querySelector('.form-body');
var searchText = document.querySelector('.search-field')
var savedIdeas = [];


//👇 eventListeners👇
//
saveButton.addEventListener('click', invokeIdeaClass);
// displayStarredButton.addEventListener('click', showStarred)
// addCommentButton.addEventListener('click', appendComment)


//👇 eventHandlers👇
function invokeIdeaClass(event) {
  event.preventDefault();
  var newIdeaObject = new Idea(ideaTitle.value, ideaBody.value);
  savedIdeas.push(newIdeaObject);
  console.log(newIdeaObject);
};

// function showStarred() {
// }
