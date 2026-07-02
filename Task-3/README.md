# Task 3 – CRM Integration Architecture

## End-to-End Integration Architecture

### Workflow

```
User
   │
   ▼
Landing Page (HTML + JavaScript)
   │
   ▼
Backend API (Node.js + Express)
   │
   ├────────────► HubSpot CRM API
   │                 │
   │                 ▼
   │       Search Contact by Phone Number
   │                 │
   │        ┌────────┴────────┐
   │        │                 │
   │     Contact Exists   Contact Not Found
   │        │                 │
   │   Update Contact     Create Contact
   │
   ├────────────► Karix WhatsApp Business API
   │                 │
   │                 ▼
   │       Send Confirmation Message
   │
   └────────────► Google Ads Conversion Tracking
                     │
                     ▼
             consultation_form_submitted
```

## Architecture Explanation

When a visitor submits the consultation form, the landing page sends the data securely to a backend API built with Node.js and Express. The backend validates the request before communicating with HubSpot using its CRM API.

Since the landing page collects only the patient's name and phone number, I would not rely on HubSpot's default deduplication because it primarily uses email addresses. Instead, the backend would first search HubSpot for an existing contact using the submitted phone number. If a matching contact is found, the existing record is updated with the latest enquiry details. Otherwise, a new contact is created with the following properties:

- Name
- Phone
- Clinic Preference
- Source = Google Ads – Consultation Landing Page
- Lead Status = New Enquiry

After HubSpot successfully creates or updates the contact, the backend immediately calls the Karix WhatsApp Business API to send a confirmation message to the patient. Finally, the backend records the successful submission by triggering the **consultation_form_submitted** conversion event for Google Ads, allowing campaigns to optimize toward qualified consultation requests.

## Biggest Failure Point

The most critical failure point is communication with HubSpot. If HubSpot is unavailable or its API request fails, patient enquiries could be lost. To prevent this, I would temporarily store failed submissions in a retry queue (or database) with timestamps and automatically retry the API call using exponential backoff. Every failure would be logged and monitored so that no patient enquiry is permanently lost.

## WhatsApp SLA Monitoring

The WhatsApp confirmation must be delivered within two minutes. Possible delays include HubSpot API failures, backend errors, network latency, or Karix service outages. I would monitor request processing times, API response codes, and message delivery status using application logs and alerting dashboards. If a message is not successfully delivered within the SLA, the system should automatically retry the request and notify the operations team so that the patient still receives a confirmation as quickly as possible.