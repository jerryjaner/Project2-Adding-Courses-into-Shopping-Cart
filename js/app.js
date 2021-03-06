// Variable

const courses = document.querySelector('#courses-list');
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');

// Listeners

loadEventListeners();
       
 function loadEventListeners(){
 // when a new course is added
 courses.addEventListener('click',buyCourse);

 // when the removed button is clicked
 shoppingCartContent.addEventListener('click',removeCourse);

 // clear cart btn
 clearCartBtn.addEventListener('click', clearCart);

 // Document Ready
 document.addEventListener('DOMContentLoaded',getFromLocalStorage);



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
    // create an object with course object
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')  
    }
    // insert into the shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(course){
    // create  a <tr>
    const row = document.createElement('tr');

    // build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src = "${course.image}" width =100>
            </td>
            <td> ${course.title}</td>
            <td> ${course.price}</td>
            <td>
                <a href="#"class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into shopping Cart
    shoppingCartContent.appendChild(row);

    //Add course into storage
    saveIntoStorage(course);
}
// Add  the courses into local storage
function saveIntoStorage(course){

    let courses = getCoursesFromStorage();

    // Add course into the array
    courses.push(course);

    //since storage only saves strings. we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses) );
}

//get the content from storage
function getCoursesFromStorage(){

    let courses;

    //if something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null){
        courses = [];
    }
    else{
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}






//remove course from the DOM
function removeCourse(e){
    let course, courseId;
    //Remove from the DOM
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;  
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // remove from the Local Storage
    removeCourseLocalStorage(courseId);
}
// Remove from the storage
function removeCourseLocalStorage(id){
    // Get the Local Storage Data
    let coursesLS = getCoursesFromStorage();

    // loop through the array and find the index to remove
    coursesLS.forEach(function(courseLS,index){
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });
   
    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clear the Shopping cart
function clearCart(){

   // shoppingCartContent.innerHTML = '';
   while(shoppingCartContent.firstChild){
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);

   }

   // Clear from local storage
   clearLocalStorage();

}
// Clear the whole Local Storage
function clearLocalStorage(){
    localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart 
function getFromLocalStorage(){
    let coursesLS = getCoursesFromStorage();

    // Loop throught the courses and print into the cart
    coursesLS.forEach(function(course){

        // Create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
        <tr>
             <td>
                    <img src = "${course.image}" width =100>
                </td>
                <td> ${course.title}</td>
                <td> ${course.price}</td>
                <td>
                    <a href="#"class="remove" data-id="${course.id}">X</a>
             </td>
        </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}