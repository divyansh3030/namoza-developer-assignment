# Task 3 – CRM Integration Architecture

## End-to-End Integration Architecture

### Workflow

```text
User
   │
   ▼
Landing Page (HTML + JavaScript)
   │
   ▼
Backend API (Node.js + Express)
   │
   ▼
Validate Request
   │
   ▼
Search HubSpot Contact by Phone Number
   │
   ├───────────────────────────┐
   │                           │
No Contact Found         Contact Found
   │                           │
   ▼                           ▼
Create Contact          Compare Submitted Name
                             │
                   ┌─────────┴─────────┐
                   │                   │
             Name Matches      Name Different
                   │                   │
                   ▼                   ▼
          Update Contact      Flag for Manual Review
                   │
                   ▼
Send WhatsApp via Karix API
                   │
                   ▼
Fire Google Ads Conversion
```

## Architecture Explanation

When a visitor submits the consultation form, the landing page securely sends the patient's details to a Node.js and Express backend API. I chose a custom backend instead of automation tools such as Zapier or Make because it provides better control over validation, logging, retry mechanisms, security, and future scalability, which is important for healthcare applications.

The backend validates the incoming data before communicating with HubSpot using its CRM API. Since the landing page only collects the patient's name and phone number, I would not rely on HubSpot's default deduplication because it primarily works with email addresses.

Instead, the backend first searches HubSpot using the submitted phone number.

- If no contact exists, a new contact is created.
- If a contact exists and the submitted name matches the existing record, the enquiry details are updated and the Lead Status is set to **New Enquiry**.
- If the phone number already exists but the submitted name is different, I would not overwrite the existing contact automatically. Instead, I would flag the submission for manual review because shared family phone numbers, typing mistakes, or incorrect submissions could otherwise corrupt patient data.

After the CRM record is successfully created or updated, the backend calls the Karix WhatsApp Business API to send a confirmation message to the patient. Finally, the **consultation_form_submitted** conversion event is sent to Google Ads so campaign optimization is based on successful consultation enquiries.

## Biggest Failure Point

The most critical failure point is the HubSpot API because every patient enquiry depends on a successful CRM update. If the API is unavailable, the enquiry could be lost before WhatsApp messaging and Google Ads conversion tracking are triggered.

To prevent this, every submission should first be stored in a persistent database or retry queue. If the HubSpot request fails, the system retries automatically using exponential backoff while recording detailed logs. If repeated retries fail, an alert should notify the operations team so the enquiry can be processed manually without losing patient information.

## WhatsApp SLA Monitoring

The confirmation message must be delivered within two minutes. Delays may occur because of backend failures, HubSpot API issues, network latency, queue processing delays, or Karix service outages.

To monitor this SLA, I would track API response times, queue processing time, Karix delivery status, and backend logs using a centralized monitoring dashboard. Automated alerts would notify the operations team whenever delivery approaches or exceeds the two-minute threshold, ensuring rapid investigation and maintaining a reliable patient communication experience.