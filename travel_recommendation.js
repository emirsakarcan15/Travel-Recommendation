let search_button = document.getElementById("search-button");
let reset_button = document.getElementById("reset-button");
let input_tag = document.getElementById("search-input");
let alert = document.getElementById("alert");
let data_wrapper = document.getElementById("data-wrapper");

events();

function events(){
    search_button.addEventListener("click", search);
    reset_button.addEventListener("click", reset)
}


async function search(e){
    deleteUX()
    window.scrollTo(200, 0);

    e.preventDefault();

    input = input_tag.value.trim()
    input = input.toLowerCase()
    if (input === ""){
        attention();
        setTimeout(()=> {
            clear_attention()
        }, 3000)
    }
    
    else {
        if (check_countries(input)){
            input = "countries";
        }

        if (check_temples(input)){
            input = "temples";
        }

        if (check_beaches(input)){
            input = "beaches";
        }

        if (check_beaches(input) === false && check_countries(input) === false && check_temples(input) === false){
            input_unavailable();
            setTimeout(()=> {
                clear_attention()
            }, 3000)
        }
    }


    let response = await fetch("travel_recommendation.json")
    let data = await response.json()
    addUX(data, input);
}

function check_countries(input){
    if (input === "country" || input === "countries"){
        return true;
    }
    else {
        return false;
    }
}

function check_temples(input){
    if (input === "temple" || input === "temples"){
        return true;
    }
    else {
        return false
    }
}

function check_beaches(input){
    if (input === "beach" || input === "beaches"){
        return true;
    }
    else {
        return false
    }
}

function attention(){
    let div = document.createElement("div");
    div.className = "alert alert-warning";
    div.role = "alert";
    div.textContent = "Please Enter The Destination You Want To Search !"

    alert.appendChild(div)   
}

function clear_attention(){
    alert.removeChild(alert.children[0])
}

function reset(e){
    input_tag.value = "";
    e.preventDefault();
    deleteUX();
}

function input_unavailable(){
    let div = document.createElement("div");
    div.className = "alert alert-info";
    div.role = "alert";
    div.textContent = "Destination You Searched For Is Unavailable At The Moment"

    alert.appendChild(div)
}

function addUX(data, input){
    scroll_attention();
    setTimeout(()=> {
        clear_attention()
    }, 3000)

    
    
    if (input === "countries"){

       

        for (let destination = 0; destination < data[input][Math.floor(Math.random() * 3)].cities.length; destination++){
            
            let city_index = Math.floor(Math.random() * 3)

            let div_cardmb3 = document.createElement("div");
            div_cardmb3.id = "data";
            div_cardmb3.className = "card mb-3";

            let div_carouselslide = document.createElement("div");
            div_carouselslide.id = "carouselExampleIndicators";
            div_carouselslide.className = "carousel slide";

            let div_carouselindicators = document.createElement("div");
            div_carouselindicators.className = "carousel-indicators";

            let button_1 = document.createElement("button");
            button_1.type = "button";
            button_1.dataset.bsTarget = "#carouselExampleIndicators";
            button_1.className = "active";

            let button_2 = document.createElement("button");
            button_2.type = "button";
            button_2.dataset.bsTarget = "#carouselExampleIndicators";

            let div_carouselinner = document.createElement("div");
            div_carouselinner.classname = "carousel-inner";

            let div_carouselitemactive = document.createElement("div");
            div_carouselitemactive.className = "carousel-item active";

            let img_1 = document.createElement("img");
            img_1.src = data[input][city_index].cities[destination].imageUrl;
            img_1.className = "d-block w-100";

            let div_carouseliteminactive = document.createElement("div");
            div_carouseliteminactive.className = "carousel-item";

            let img_2 = document.createElement("img");
            img_2.src = data[input][destination].imageUrl2;
            img_2.className = "d-block w-100";

            let button_3 = document.createElement("button");
            button_3.className = "carousel-control-prev";
            button_3.type = "button";
            button_3.dataset.bsTarget = "#carouselExampleIndicators";

            let span_1 = document.createElement("span");
            span_1.className = "carousel-control-next-icon" 

            let span_2 = document.createElement("span");
            span_2.className = "visually-hidden";
            span_2.textContent = "Previous";

            let button_4 = document.createElement("button");
            button_4.className="carousel-control-next";
            button_4.type="button";
            button_4.dataset.bsTtarget="#carouselExampleIndicators"; 

            let span_3 = document.createElement("span");
            span_3.className="carousel-control-next-icon" 

            let span_4 = document.createElement("span");
            span_4.className="visually-hidden";
            span_4.textContent = "Next";

            let div_cardbody = document.createElement("div");
            div_cardbody.className = "card-body";

            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.textContent = data[input][city_index].cities[destination].name;

            let p = document.createElement("p")
            p.className = "card-text";
            p.textContent = data[input][city_index].cities[destination].description;

            div_carouselitemactive.appendChild(img_1);
            div_carouseliteminactive.appendChild(img_2);

            div_carouselinner.appendChild(div_carouselitemactive);
            div_carouselinner.appendChild(div_carouseliteminactive);

            div_carouselslide.appendChild(div_carouselindicators);
            div_carouselslide.appendChild(div_carouselinner);
            
            div_cardbody.appendChild(h5);
            div_cardbody.appendChild(p);

            div_cardmb3.appendChild(div_carouselslide);
            div_cardmb3.appendChild(div_cardbody);
            
            data_wrapper.appendChild(div_cardmb3);
        }
    }

    else {
        for (let destination = 0; destination < data[input].length; destination++){
            let div_cardmb3 = document.createElement("div");
            div_cardmb3.id = "data";
            div_cardmb3.className = "card mb-3";

            let div_carouselslide = document.createElement("div");
            div_carouselslide.id = "carouselExampleIndicators";
            div_carouselslide.className = "carousel slide";

            let div_carouselindicators = document.createElement("div");
            div_carouselindicators.className = "carousel-indicators";

            let button_1 = document.createElement("button");
            button_1.type = "button";
            button_1.dataset.bsTarget = "#carouselExampleIndicators";
            button_1.className = "active";

            let button_2 = document.createElement("button");
            button_2.type = "button";
            button_2.dataset.bsTarget = "#carouselExampleIndicators";

            let div_carouselinner = document.createElement("div");
            div_carouselinner.classname = "carousel-inner";

            let div_carouselitemactive = document.createElement("div");
            div_carouselitemactive.className = "carousel-item active";

            let img_1 = document.createElement("img");
            img_1.src = data[input][destination].imageUrl;
            img_1.className = "d-block w-100";

            let div_carouseliteminactive = document.createElement("div");
            div_carouseliteminactive.className = "carousel-item";

            let img_2 = document.createElement("img");
            img_2.src = data[input][destination].imageUrl2;
            img_2.className = "d-block w-100";

            let button_3 = document.createElement("button");
            button_3.className = "carousel-control-prev";
            button_3.type = "button";
            button_3.dataset.bsTarget = "#carouselExampleIndicators";

            let span_1 = document.createElement("span");
            span_1.className = "carousel-control-next-icon" 

            let span_2 = document.createElement("span");
            span_2.className = "visually-hidden";
            span_2.textContent = "Previous";

            let button_4 = document.createElement("button");
            button_4.className="carousel-control-next";
            button_4.type="button";
            button_4.dataset.bsTtarget="#carouselExampleIndicators"; 

            let span_3 = document.createElement("span");
            span_3.className="carousel-control-next-icon" 

            let span_4 = document.createElement("span");
            span_4.className="visually-hidden";
            span_4.textContent = "Next";

            let div_cardbody = document.createElement("div");
            div_cardbody.className = "card-body";

            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.textContent = data[input][destination].name;

            let p = document.createElement("p")
            p.className = "card-text";
            p.textContent = data[input][destination].description;

            div_carouselitemactive.appendChild(img_1);

            div_carouseliteminactive.appendChild(img_2);


            

            div_carouselinner.appendChild(div_carouselitemactive);
            div_carouselinner.appendChild(div_carouseliteminactive);

            


            div_carouselslide.appendChild(div_carouselindicators);
            div_carouselslide.appendChild(div_carouselinner);
            

            div_cardbody.appendChild(h5);
            div_cardbody.appendChild(p);


            div_cardmb3.appendChild(div_carouselslide);
            div_cardmb3.appendChild(div_cardbody);
            
            data_wrapper.appendChild(div_cardmb3);
        }
    }

}

function scroll_attention(){
    let div = document.createElement("div");
    div.className = "alert alert-success";
    div.role = "alert";
    div.textContent = "Scroll Down To See The Results!";

    alert.appendChild(div)
}

function deleteUX(){
    let n = data_wrapper.children.length;

    while (n > 0){
        n = n - 1;
        data_wrapper.children[n].remove();
    }
}