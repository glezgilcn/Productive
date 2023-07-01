const button = document.getElementById("buttonAdd");
const weekDays = document.querySelector("#weekDays ul");
const momentsDay = document.querySelector("#momentsDay ul");
const buttonTodo = document.getElementById("todo");
const habitsContainer = document.getElementById("habitsContainer");

const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

const habits1 = ["Beber agua", "Leer"];
const habits2 = ["Ejercicio", "Agua", "Spf"];
const habits3 = ["Leer", "Comer", "Spf", "Agua"];
const habits4 = ["Agua", "Agua"];

const data = {
    lun:{
        mañana: habits1,
        tarde: habits2,
        noche: habits3
    },
    mar:{
        mañana: habits2,
        tarde: habits1,
        noche: habits4
    },
    mie:{
        mañana: habits2,
        tarde: habits4,
        noche: habits1
    },
    jue:{
        mañana: habits3,
        tarde: habits4,
        noche: habits2
    },
    vie:{
        mañana: habits2,
        tarde: habits3,
        noche: habits1
    },
    sab:{
        mañana: habits2,
        tarde: habits4,
        noche: habits3
    },
    dom:{
        mañana: habits4,
        tarde: habits2,
        noche: habits1
    }
};


/*Load main window */
window.onload = function () {
    let children = "";
    for(let i = -3; i < 4; i++){
        const date = new Date();
        date.toLocaleDateString("es-MX", {timeZone:"America/Mexico_City"});
        date.setDate(date.getDate() + i);
        const day = date.getDate();
        const weekday = date.getDay();
       children += `<li class="${i===0 ? 'activeDay':''}">${days[weekday]}<br>${day}</li>`;
    }
    weekDays.innerHTML = children;
    const today = new Date();
    today.toLocaleDateString("es-MX", {timeZone:"America/Mexico_City"});
    getMomentsDay(days[today.getDay()]);

    activateFunction(weekDays, "activeDay", (element) => {
        let selectDay = "dom";
        if (element.innerText.includes("Lun")){
            selectDay = "lun";
        }

        if (element.innerText.includes("Mar")){
            selectDay = "mar";
        }

        if (element.innerText.includes("Mie")){
            selectDay = "mie";
        }

        if (element.innerText.includes("Jue")){
            selectDay = "jue";
        }

        if (element.innerText.includes("Vie")){
            selectDay = "vie";
        }

        if (element.innerText.includes("Sab")){
            selectDay = "sab";
        }

        getMomentsDay(selectDay);
    });
}

function getHabits(moment, day) {
    if (moment === "todo"){
        const arrayMoments = [data[day].mañana, data[day].tarde, data[day].noche];
        let todoMoment = "";
        for(let i=0; i<3; i++){
            let habitElement = "";
            for(const habit of arrayMoments[i]) {
                habitElement += `<li>${habit}</li>`;
            }
            let momentName = "Noche";
            if (i === 0){
                momentName = "Mañana";
            } else if (i === 1){
                momentName = "Tarde";
            }
            todoMoment += `<div class = "habitsTime">${momentName}
            <ul>
            ${habitElement}
            </ul>
            </div>`
        }
        habitsContainer.innerHTML = todoMoment
       return 
    }

    let habits = data[day][moment];
    let habitElement = "";
    for(const habit of habits){
        habitElement += `<li>${habit}</li>`;
    }
    habitsContainer.innerHTML = `<div class = "habitsTime">
        <ul>
        ${habitElement}
        </ul>
    </div>`

}

function getMomentsDay(selectDay){
    console.log(selectDay)
    buttonTodo.classList.add("activeMoment");
    getHabits("todo", selectDay.toLowerCase());

    activateFunction(momentsDay, "activeMoment", (element) => {
        getHabits(element.innerText.toLowerCase(), selectDay.toLowerCase());
    });
}

/* Add habits */
button.onclick = function(){
    console.log("Click on button");
}

/* Change day or moment of the day */
function activateFunction(parent, className, callBack){
    for (const child of parent.children) {
        child.onclick = function(event) {
            for (const c of parent.children) {
                c.classList.remove(className);
            }
            event.target.classList.add(className);
            callBack(event.target);
        }
    }
}


/* Fill moment with habits */


