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
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();

    }
    
}
// Clear the Shopping cart
function clearCart(){

   // shoppingCartContent.innerHTML = '';
   while(shoppingCartContent.firstChild){
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);

   }
}