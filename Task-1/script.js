/* =====================================
   Namoza Healthcare Booking Demo
   GTM + dataLayer Simulation
===================================== */

window.dataLayer = window.dataLayer || [];

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const success = document.getElementById("success");

const indicator1 = document.getElementById("indicator1");
const indicator2 = document.getElementById("indicator2");
const indicator3 = document.getElementById("indicator3");

const city = document.getElementById("city");
const clinic = document.getElementById("clinic");
const specialty = document.getElementById("specialty");

const patientName = document.getElementById("name");
const phone = document.getElementById("phone");
const date = document.getElementById("date");

const logs = document.getElementById("logs");

function showStep(step) {

    step1.classList.remove("active-page");
    step2.classList.remove("active-page");
    step3.classList.remove("active-page");
    success.classList.remove("active-page");

    indicator1.classList.remove("active");
    indicator2.classList.remove("active");
    indicator3.classList.remove("active");

    if(step === 1){

        step1.classList.add("active-page");
        indicator1.classList.add("active");

    }

    if(step === 2){

        step2.classList.add("active-page");
        indicator1.classList.add("active");
        indicator2.classList.add("active");

    }

    if(step === 3){

        step3.classList.add("active-page");
        indicator1.classList.add("active");
        indicator2.classList.add("active");
        indicator3.classList.add("active");

    }

}

function logEvent(event){

    console.log("dataLayer Push:", event);

    logs.innerHTML += `
        <p>
        <strong>${event.event}</strong><br>
        ${JSON.stringify(event,null,2)}
        </p>
        <hr>
    `;

}

/* =====================================
   Step 1
===================================== */

document.getElementById("next1").onclick = function(){

    if(
        city.value === "" ||
        clinic.value === "" ||
        specialty.value === ""
    ){

        alert("Please complete all fields.");

        return;
    }

    const event = {

        event: "booking_step_1_complete",

        step_number: 1,

        step_name: "location_specialty_selected",

        city: city.value,

        clinic_location: clinic.value,

        specialty: specialty.value

    };

    window.dataLayer.push(event);

    logEvent(event);

    showStep(2);

};

/* =====================================
   Back
===================================== */

document.getElementById("back1").onclick=function(){

    showStep(1);

};

/* =====================================
   Step 2
===================================== */

document.getElementById("next2").onclick=function(){

    if(
        patientName.value==="" ||
        phone.value==="" ||
        date.value===""

    ){

        alert("Please complete all fields.");

        return;

    }

    const event={

        event:"booking_step_2_complete",

        step_number:2,

        step_name:"patient_details_entered",

        has_phone:true,

        appointment_date:date.value

    };

    window.dataLayer.push(event);

    logEvent(event);

    document.getElementById("reviewCity").textContent=city.value;

    document.getElementById("reviewClinic").textContent=clinic.value;

    document.getElementById("reviewSpecialty").textContent=specialty.value;

    document.getElementById("reviewName").textContent=patientName.value;

    document.getElementById("reviewPhone").textContent=phone.value;

    document.getElementById("reviewDate").textContent=date.value;

    showStep(3);

};

/* =====================================
   Back
===================================== */

document.getElementById("back2").onclick=function(){

    showStep(2);

};

/* =====================================
   Final Booking
===================================== */

document.getElementById("confirmBtn").onclick=function(){

    const bookingId="NMZ-"+Date.now();

    const step3Event={

        event:"booking_step_3_complete",

        step_number:3,

        step_name:"booking_review_completed",

        booking_id:bookingId,

        clinic_location:clinic.value,

        specialty:specialty.value

    };

    window.dataLayer.push(step3Event);

    logEvent(step3Event);

    const bookingCompleted={

        event:"booking_completed",

        booking_id:bookingId,

        clinic_location:clinic.value,

        specialty:specialty.value,

        appointment_date:date.value

    };

    window.dataLayer.push(bookingCompleted);

    logEvent(bookingCompleted);

    step1.classList.remove("active-page");
    step2.classList.remove("active-page");
    step3.classList.remove("active-page");

    success.classList.add("active-page");

    document.getElementById("bookingId").textContent=bookingId;

};

/* =====================================
   Booking Started
===================================== */

window.addEventListener("load",function(){

    const started={

        event:"booking_started",

        page:"Appointment Booking Demo"

    };

    window.dataLayer.push(started);

    logEvent(started);

});
/* =====================================
   Call Now
===================================== */

document.getElementById("callNow").onclick=function(){

    const event={

        event:"call_now_click",

        clinic_location:clinic.value || "Not Selected",

        button_location:"Booking Page",

        page:"Appointment Demo"

    };

    window.dataLayer.push(event);

    logEvent(event);

};

/* =====================================
   WhatsApp
===================================== */

document.getElementById("whatsappBtn").onclick=function(){

    const event={

        event:"whatsapp_click",

        clinic_location:clinic.value || "Not Selected",

        page:"Appointment Demo",

        destination:"WhatsApp"

    };

    window.dataLayer.push(event);

    logEvent(event);

};

/* =====================================
   Patient Guide
===================================== */

document.getElementById("guideBtn").onclick=function(){

    const event={

        event:"patient_guide_download",

        guide_name:"Orthopaedic Patient Guide",

        download_type:"PDF",

        page:"Appointment Demo"

    };

    window.dataLayer.push(event);

    logEvent(event);

};