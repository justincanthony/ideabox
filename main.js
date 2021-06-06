//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.querySelector('.show-starred-button');
var addCommentButton = document.querySelector('.comment-button');
var deleteIdeaButton = document.querySelector('.img-button')
var ideaTitle = document.querySelector('.form-title'); // title text input
var ideaBody = document.querySelector('.form-body'); // body text input
var searchText = document.querySelector('.search-field');
var renderedIdeas = document.querySelector('.ideabox');
var savedIdeas = [];

//👇 eventListeners👇
saveButton.addEventListener('click', instantiateIdeaClass);
renderedIdeas.addEventListener('click', function(e) {
  if(e.target.className === 'delete'){
    var parent = e.target.parentElement;
    parent.parentNode.parentNode.remove();
    console.log(parent.parentNode.parentNode);
  }
  if(e.target.className === "empty-star") {
    //new variable for article id
    var ideaArticle = e.target.parentElement.parentNode.parentNode;

    console.log("works");
    // idea article is equal to button
    for(var i = 0; i < savedIdeas.length; i++) {
      console.log("still works");
      console.log(ideaArticle.id);
      console.log(savedIdeas[i].id);
      //if article id matches id in savedIdeas
      if(Number(ideaArticle.id) === savedIdeas[i].id) {
        console.log("still works again")
        //grab idea instance and update star property
        savedIdeas[i].star = true;
        // element we are updating.classList.add("hidden")
        e.target.classList.add("hidden")
        e.target.nextElementSibling.classList.remove("hidden")
        //remove sibling of target
        // value of starProperty === false
        console.log("working still!")
        // updating starValue to true
        console.log("final works");

      }
    }
  }
  console.log(savedIdeas[0]);
})

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
};

function changeButton() {
  saveButton.classList.remove('disable-button')
  saveButton.classList.add('save-btn');
};

function clearFields() {
  ideaTitle.value = "";
  ideaBody.value = "";
};
