# Email Template for NSE Data Services Request

---

**To:** dataservices@nse.co.ke
**Subject:** Request for NSE Market Data API Access and Pricing - Investment Advisory Platform

---

Dear NSE Data Services Team,

I hope this email finds you well.

I am developing an AI-powered investment advisory platform that will provide retail investors with data-driven insights on both US and East African equity markets. I am writing to request information about accessing NSE market data for integration into our platform.

## Project Overview

**Platform Name:** AI Investment Advisor
**Target Users:** Retail investors in Kenya and East Africa
**Purpose:** Educational investment analysis and portfolio tracking
**Tech Stack:** AWS serverless architecture (Lambda, Aurora, Bedrock AI)
**Launch Timeline:** MVP in 4-6 weeks

## Data Requirements

We require the following NSE market data:

### **Primary Requirement: Equity Market Data**
- **Stocks of Interest:** SCOM.NB (Safaricom), EQTY.NB (Equity Group), KCB.NB (KCB Group), and other main market equities
- **Data Frequency:** Real-time or 15-minute delayed quotes (acceptable for MVP)
- **Data Points Needed:**
  - Current price
  - Daily open, high, low, close
  - Trading volume
  - Previous close and daily change
  - Market capitalization (if available)

### **Historical Data**
- End-of-day historical price data for the past 2 years
- Corporate actions (dividends, splits, rights issues)

### **Reference Data**
- Company profiles and descriptions
- Sector/industry classifications
- Trading status

## Technical Integration

Based on your [API Specification Documents](https://www.nse.co.ke/dataservices/api-specification-documents/), I would like to understand:

1. **MITS API for Bonds & Derivatives** - Is this API also available for equity data, or is it limited to fixed income?
2. **NSE Widgets** - Can we access the NSE Widgets Guide for embedding ticker data?
3. **MITCH Market Data Feed (UDP)** - What are the technical and pricing requirements for direct integration?
4. **End-of-Day Data** - Do you provide a REST API or FTP feed for daily closing prices?

## Questions

1. **Pricing Structure:**
   - What are your pricing tiers for real-time vs. delayed equity data?
   - Are there startup/MVP pricing options for platforms under development?
   - Do you offer academic or development licenses for initial testing?

2. **Access Methods:**
   - Which API would you recommend for a cloud-based serverless application (AWS Lambda)?
   - Do you support REST API access, or is it primarily FIX/UDP protocols?
   - What is the typical onboarding timeline for API access?

3. **Documentation:**
   - Can we access the NSE Widgets Guide and MITS API specification documents?
   - Are there sample API responses or sandbox environments for testing?

4. **Data Usage:**
   - Are there restrictions on displaying NSE data to retail users?
   - What are the attribution/licensing requirements for using NSE data?
   - Do you require us to become an authorized data vendor, or can we access data directly?

5. **Alternative Vendors:**
   - If direct API access is not suitable for our use case, can you recommend authorized data vendors who provide REST APIs for NSE equities?

## Use Case Context

Our platform will:
- Display NSE stock prices and charts to registered users
- Generate AI-powered investment analysis using Amazon Bedrock
- Provide portfolio tracking for Kenyan equities
- Show educational content about NSE-listed companies
- **NOT execute trades** (read-only data access)

We are committed to:
- Proper data attribution to NSE
- Compliance with NSE Market Data Policy
- Secure data handling (AWS infrastructure)
- Transparent disclaimers that this is not financial advice

## Next Steps

I would appreciate:
1. A pricing quote for the data services described above
2. Technical documentation for the recommended API integration method
3. Information on the account setup and onboarding process
4. Clarification on any licensing or vendor agreements required

I am available for a call at your convenience to discuss our requirements in more detail. Please let me know your availability.

Thank you for your time and assistance. I look forward to partnering with NSE to bring quality market data to our users.

Best regards,

**[Your Name]**
**[Your Title/Role]**
**[Your Company Name]** (if applicable)
**Email:** [your-email@domain.com]
**Phone:** [+254 XXX XXX XXX]
**Location:** [City, Kenya or location]

---

## Attachments to Consider
- Brief product overview/pitch deck (1-2 pages)
- Sample screenshots of your platform (optional)
- Technical architecture diagram showing data flow (optional)

---

## Follow-up Timeline
- If no response in 5 business days: Send polite follow-up email
- If no response in 10 business days: Call +254 202831000
- Parallel action: Contact ICE Data Services as backup option

---

## Notes
- Be professional and clear about your use case
- Emphasize educational/retail investor focus (not institutional trading)
- Mention AWS infrastructure to show technical credibility
- Ask about startup-friendly pricing
- Request specific API documentation (MITS, Widgets)
- Keep the door open for a phone call/meeting
