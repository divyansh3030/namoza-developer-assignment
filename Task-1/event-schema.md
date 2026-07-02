# Task 1 – GTM Event Tracking Schema

## Objective

The objective of this implementation is to design a Google Tag Manager (GTM) and Google Analytics 4 (GA4) event tracking strategy for a healthcare appointment booking flow. The tracking captures user interactions throughout the booking journey, enabling funnel analysis, conversion tracking, and campaign optimization.

---

## User Journey

```
Homepage
        │
        ▼
Book Appointment
        │
        ▼
Step 1 – Select Clinic
        │
        ▼
Step 2 – Enter Patient Details
        │
        ▼
Step 3 – Review Booking
        │
        ▼
Booking Confirmed
```

---

# Event Tracking Schema

| Event Name | Trigger | Parameters | Purpose |
|------------|----------|------------|---------|
| booking_started | Appointment page loads | page | Indicates booking intent |
| booking_step_1_complete | Clinic details submitted | city, clinic_location, specialty | Tracks clinic and specialty selection |
| booking_step_2_complete | Patient details submitted | has_phone, appointment_date | Tracks patient information step completion |
| booking_step_3_complete | Review completed | booking_id, clinic_location, specialty | Tracks final review before booking |
| booking_completed | Booking confirmed | booking_id, appointment_date, specialty | Primary conversion event |
| call_now_click | User clicks "Call Clinic" | clinic_location, button_location | Tracks phone enquiry |
| whatsapp_click | User clicks WhatsApp button | clinic_location, destination | Tracks WhatsApp engagement |
| patient_guide_download | User clicks "Download Patient Guide" | guide_name, download_type | Tracks educational resource downloads |

---

# Sample dataLayer Implementation

## Booking Started

```javascript
window.dataLayer.push({
    event: "booking_started",
    page: "Appointment Booking Demo"
});
```

---

## Step 1 Completed

```javascript
window.dataLayer.push({
    event: "booking_step_1_complete",
    step_number: 1,
    city: "Bengaluru",
    clinic_location: "Whitefield",
    specialty: "Orthopaedics"
});
```

---

## Step 2 Completed

```javascript
window.dataLayer.push({
    event: "booking_step_2_complete",
    step_number: 2,
    has_phone: true,
    appointment_date: "2026-07-06"
});
```

---

## Booking Completed

```javascript
window.dataLayer.push({
    event: "booking_completed",
    booking_id: "NMZ-1783023453051",
    appointment_date: "2026-07-06",
    specialty: "Orthopaedics"
});
```

---

# GA4 Funnel

```
booking_started
        ↓
booking_step_1_complete
        ↓
booking_step_2_complete
        ↓
booking_step_3_complete
        ↓
booking_completed
```

This funnel allows analysts to identify user drop-off at each booking stage and optimize the appointment booking experience.

---

# Google Ads Conversion Recommendation

The recommended primary conversion event is:

**booking_completed**

### Reason

A successful appointment booking represents the primary business objective. Importing this event into Google Ads allows optimization for completed bookings instead of intermediate interactions such as button clicks or form starts.