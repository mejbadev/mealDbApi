let showdata;
function myFunction() {
  showdata=setTimeout(showPage, 3000);
}
myFunction();
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

const searchFood = async () => {
    const mealField = document.getElementById('search-field');
    const searchText = mealField.value;
    mealField.value='';
  
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
        const data = await res.json();
        displaySearch(data.meals, searchText);
      
}
// const displayModal = async () =>{
//     const showModal = document.getElementById('show');
//     const div = document.createElement('div');
//     div.innerHTML =`<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div class="modal-dialog">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="staticBackdropLabel">Empty Search</h5>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div class="modal-body">
//           Oi Mia kisu ekta to lekhen.  
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         </div>
//       </div>
//     </div>
//   </div>`;
//   showModal.appendChild(div);
// }
const displaySearch =async(data, text) =>{
  console.log(text.length);
    const searchResultField = document.getElementById('search-result');
    searchResultField.textContent ='';
    if(data == null){
        const div = document.createElement('div');
        div.classList.add('w-50');
        div.classList.add('mx-auto');
        div.innerHTML=`
        <h3 class= "text-danger text-center w-50 mx-auto mt-5">Your Search item is not available</h3>
        `;
        searchResultField.appendChild(div);
    } else if(text.length ==0 ){
      const div = document.createElement('div');
        div.classList.add('w-50');
        div.classList.add('mx-auto');
        div.innerHTML=`
        <h3 class= "text-danger text-center w-50 mx-auto mt-5">You can not search for empty string</h3>
        `;
        searchResultField.appendChild(div);

    }else{
        data.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            // console.log(meal);
            div.innerHTML = `
                <div onclick = "loadMealDetail('${meal.idMeal}')" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0,150)}.</p>
                    </div>
                </div>
            `;
            searchResultField.appendChild(div);
        });
    }  
   
}

const loadMealDetail = async (mealId) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0]);

}

const displayMealDetails =(meal) =>{
    const detail = document.getElementById('detail'); 
    const div= document.createElement('div');
    console.log(meal);
    div.innerHTML =`
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,150)}.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Gradient: ${meal.strIngredient1}</li>
      <li class="list-group-item">Category: ${meal.strCategory}</li>
      <li class="list-group-item">Area: ${meal.strArea}</li>
      <li class="list-group-item">YouTube Link: <a href ="${meal.strYoutube}">${meal.strMeal}</a></li>
    </ul>
  </div>
    
    `;
  detail.appendChild(div);
}