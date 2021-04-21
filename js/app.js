// Variable

const courses = document.querySelector('#courses-list');
      shoppingCartContent = document.querySelector('#cart-content tbody');

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
}