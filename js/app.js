// Variable

const courses = document.querySelector('#courses-list');

// Listeners

loadEventListeners();
       
 function loadEventListeners(){
 // when a new course is added
 courses.addEventListener('click',buyCourse);


}


// Function
function buyCourse(e){
    e.preventDefault();
    // use the delegation to find the  course that was added
    if(e.target.classList.contains('add-to-cart')){
        //read the course value
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}
// Reads the HTML information of the selected course
function getCourseInfo(course){
    console.log(course);
}