# Guest House Showcase

Build a complete, single‑page HTML/CSS/JS website for “Aung Zeya Guest House” (အောင်ဇေယျ ဧည့်ရိပ်မွန်). The design must be fully mobile responsive (mobile‑first, flex/grid, breakpoints for tablet/desktop), use a clean, card‑based layout similar to a Google Maps business profile or a modern hotel listing.

Include ALL the following content and functionality:

HEADER / IDENTITY
- English name: Aung Zeya Guest House
- Burmese name: အောင်ဇေယျ ဧည့်ရိပ်မွန်
- Rating: 4.0 stars (use star icons) with “(117 reviews)” next to it
- Badge / type: “Guest house”

TABS / SECTIONS (clickable, but for this demo they can either show dummy content or scroll to the relevant section on the page – implement simple tab switching for Overview, Reviews, Directions, etc.)
- Overview
- Reviews
- Directions
- Save (button that shows an alert “Saved to your list”)
- Nearby (button with alert “Nearby places shown”)
- Send to phone (alert: “Link sent to your phone”)
- Share (alert: “Share this page”)

MAIN INFO (visible without tabs)
- Address: R5MF+CMR, Yangon (make it a link to Google Maps)
- Phone: 09 968 913363 (make it a click‑to‑call link)
- “Claim this business” link (alert: “Claim business flow”)
- “Your Maps history” (alert: “Maps history”)
- “Add a label” (alert: “Add a label feature”)
- “Suggest an edit” (alert: “Suggest edit”)
- “Add missing information” (alert: “Form would open”)
- “Add website” (alert: “Add website”)

UPDATES FROM CUSTOMERS
- Show one update: “Breakfast @room clean a year ago” (with a small icon)

PHOTOS & VIDEOS SECTION
- Category chips: All, Rooms, Videos, Exterior, Food & drink, From visitors
- Below them, a horizontal scrollable gallery (on mobile) or a grid of placeholder images (use Font Awesome or similar icons for videos). Include an “Add photos & videos” button (alert: “Add photos flow”).

REVIEW SUMMARY
- Show overall rating: 4.0 (117 reviews)
- Optional: display a simple distribution (e.g., 5 stars = 70%, 4 stars = 20%, etc.) but at least show the star average.
- Button: “Write a review” (alert: “Write a review form”).

REVIEWS (list at least three, exactly as provided)
1. waiwai soe – “6 reviews · 2 photos”, 5 stars, 11 months ago: “Nice place to stay with fare price. Good facilities. Easy for transportation. Near food restaurants.” Include Like and Share buttons (alerts).
2. min min – “Local Guide · 182 reviews · 1,612 photos”, 5 stars, Edited 3 years ago: “It is locate in main road and near the railway line. Good hotel, nice service and Clean.” +4 photos icon and 28 likes count.
3. Zaw Min Oo – “Local Guide · 199 reviews · 14 photos”, 5 stars, 5 years ago: “Good service 👍👍👍 Just need upgrade bathroom accessories. …” with 2 likes.
Also show “More reviews (114)” link that triggers an alert.

PEOPLE ALSO SEARCH FOR
- Card / list of three:
  - Aung Zay Ya – 2.0 (2) Apartment building
  - Motel Waizayantar – 3.5 (54) 3‑star hotel
  - Kan Yar Zar Guest House ကံရာဇာ ဧည့်ဂေဟာ – 3.0 (1) Guest house

ADDITIONAL FOOTER / WEB RESULTS (optional, but you can add a simple “Web results” placeholder or ignore – I will keep it as a small line at bottom).

TECHNICAL REQUIREMENTS
- Use HTML5, CSS3 (Flexbox/Grid), vanilla JavaScript (no external libraries except Font Awesome or Material Icons for icons – include via CDN).
- Responsive: on mobile (<640px) use single column, on tablet side‑by‑side for certain sections, on desktop max‑width 1280px and centered.
- Every button/link that expects an action (Save, Share, Write a review, Claim this business, Add photos, Like, etc.) must show an appropriate alert message – no actual backend needed.
- Include a static map placeholder (e.g., an iframe from OpenStreetMap or a grey box with “Map view” text and a directions link).
- Use real phone and address links (tel: and geo: or maps URL).
- The design must be accessible (touch targets large enough, proper contrast, focus states).
- Use Google Fonts (e.g., Inter or Roboto) for clean typography.

Deliver a self‑contained index.html with embedded style and JavaScript. Make it look professional, polished, and modern – similar to a high‑quality business profile page.

Aung Zeya Guest House
အောင်ဇေယျ ဧည့်ရိပ်မွန်
4.0
(117)
Guest house

Overview

Reviews


Directions


Save


Nearby


Send to phone


Share
 


R5MF+CMR, Yangon




09 968 913363




Claim this business


Your Maps history

Add a label
 


Suggest an edit
 
Add missing information


Add website
 
Updates from customers

Breakfast @room clean
a year ago
 
Photos & videos

All

Rooms

Videos

Exterior

Food & drink

From visitors
 


Add photos & videos
 
Review summary

5	
4	
3	
2	
1	
4.0

117 reviews
 


Write a review
 
Reviews




Sort


All

cleanliness
3

hotel
2


waiwai soe
6 reviews · 2 photos







11 months ago
Nice place to stay with fare price. Good facilities.  Easy for transportation.  Near food restaurants.


Like


Share
 
 


min min
Local Guide · 182 reviews · 1,612 photos







Edited 3 years ago
It is locate in main road and near the railway line. Good hotel,  nice service and Clean.
+4


28


Share
 
 


Zaw Min Oo
Local Guide · 199 reviews · 14 photos







5 years ago
Good service 👍👍👍
Just need upgrade bathroom accessories. …


2


Share
 

More reviews (114)
 
People also search for

Aung Zay Ya
2.0(2)
Apartment building

Motel Waizayantar
3.5(54)
3-star hotel

Kan Yar Zar Guest House ကံရာဇာ ဧည့်ဂေဟာ
3.0(1)
Guest house
 
Web results

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/24d8c5c0-f6a7-4ec1-93bd-0c3269133342).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
